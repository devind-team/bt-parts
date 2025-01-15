import { Injectable } from '@nestjs/common'
import { Prisma, OrderStatus as OrderStatusEnum } from '@prisma/client'
import { CreateOrderInput } from '@orders/dto/create-order.input'
import { PrismaService } from '@common/services/prisma.service'
import { FilesService } from '@files/files.service'
import { CreateOrderType } from '@orders/dto/create-order.type'
import { OrderConnectionArgs } from '@orders/dto/order-connection.args'
import { OrderConnectionType } from '@orders/dto/order-connection.type'
import { findManyCursorConnection } from '@common/relay/find-many-cursor-connection'
import { ProductsService } from '@products/products.service'
import { AddProductInput } from '@orders/dto/add-product.input'
import { orderItemValidator } from '@items/validators'
import { Order } from '@generated/order'
import { ItemStatus, OrderStatus, Role } from '@generated/prisma'
import { User } from '@generated/user'
import { Status } from '@generated/status'
import { ItemsService } from '@items/items.service'
import { AddNewProductInput } from '@orders/dto/add-new-product.input'
import { FileUploadOutput } from '@files/dto/file-upload.output'

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productsService: ProductsService,
    private readonly itemsService: ItemsService,
    private readonly fileService: FilesService,
  ) {}

  /**
   * Выбираем заказ по идентификатору
   * @param orderId
   */
  async getOrder(orderId: string): Promise<Order> {
    return this.prismaService.order.findUnique({
      include: {
        statuses: {
          include: { user: true },
          orderBy: { createdAt: 'asc' },
        },
        comments: true,
        items: {
          include: {
            user: true,
            product: {
              include: {
                manufacturer: true,
              },
            },
            price: true,
            statuses: {
              include: { user: true },
              orderBy: { createdAt: 'asc' },
            },
          },
        },
        manager: true,
        user: true,
      },
      where: { id: orderId },
    })
  }

  /**
   * Получение relay запросов для пагинации
   * Если роль админ, получаем всех, если роль пользователь, то только свое.
   * @param user: пользователь
   * @param params: параметры фильтрации
   */
  async getOrderConnection(user: User, params: OrderConnectionArgs): Promise<OrderConnectionType> {
    const where = (
      user.role === Role.USER ? { ...params.where, userId: user.id } : params.where
    ) as Prisma.OrderWhereInput
    return await findManyCursorConnection(
      (args) =>
        this.prismaService.order.findMany({
          include: { statuses: { include: { user: true }, orderBy: { createdAt: 'asc' } }, user: true, manager: true },
          where,
          orderBy: params.orderBy,
          ...args,
        }),
      () => this.prismaService.order.count({ where }),
      params,
    )
  }

  async createOrder(user: User, orderInput: CreateOrderInput): Promise<CreateOrderType> {
    const file = await this.prismaService.file.findUnique({ where: { id: orderInput.fileId } })
    const { values } = await this.fileService.getExcelValues(file)
    const { products, createdProducts } = await this.productsService.getOrCreateProducts(values)
    const order = await this.prismaService.order.create({
      data: {
        address: orderInput.address,
        userId: user.id,
        statuses: {
          create: {
            userId: user.id,
          },
        },
      },
    })
    const makeOrderItemsForWrite = async () => {
      return values
        .map((value) =>
          orderItemValidator.safeParse({
            ...Object.fromEntries(value),
            orderId: order.id,
            userId: user.id,
            productId:
              products.get(String(value.get('vendorCode'))) || createdProducts.get(String(value.get('vendorCode'))),
          }),
        )
        .filter((validationResult) => validationResult.success)
        .map((validationResult) => validationResult['data'])
    }
    const orderItemForWrite = await makeOrderItemsForWrite()
    const createdItems = await this.prismaService.item.createManyAndReturn({
      select: { id: true },
      data: orderItemForWrite as Prisma.ItemCreateManyInput[],
    })
    await this.prismaService.statusItem.createMany({
      data: createdItems.map((createdItem) => ({
        itemId: createdItem.id,
        userId: user.id,
      })),
    })
    return { order }
  }
  /**
   * Добавляем новый товар в заказ со статусом CREATED
   * @param user пользователь
   * @param product новый продукт
   */
  async addNewProduct(user: User, product: AddNewProductInput, quantity: number): Promise<CreateOrderType> {
    const productId = await this.productsService.getOrCreateProduct(product)
    return await this.addProduct(user, { productId, quantity })
  }
  /**
   * Добавляем товар в заказ со статусом CREATED
   * @param user пользовательв
   * @param product выбранный продукт
   */
  async addProduct(user: User, product: AddProductInput): Promise<CreateOrderType> {
    const order = await this.getOrCreateOrder(user)
    await this.prismaService.item.upsert({
      where: {
        orderId_productId_userId: {
          userId: user.id,
          productId: product.productId,
          orderId: order.id,
        },
      },
      update: {
        quantity: {
          increment: product.quantity,
        },
      },
      create: {
        userId: user.id,
        productId: product.productId,
        orderId: order.id,
        quantity: product.quantity,
        statuses: {
          create: {
            status: ItemStatus.CREATED,
            userId: user.id,
          },
        },
      },
    })
    return { order }
  }
  /**
   * Получаем последний заказ пользователя со статусом CREATED или создаем новый
   * @param user пользователь
   * @returns заказ
   */
  async getOrCreateOrder(user: User): Promise<Order> {
    const existsOrder = await this.prismaService.order.findFirst({
      where: {
        userId: user.id,
        statuses: {
          every: {
            status: OrderStatusEnum.CREATED,
          },
        },
      },
      include: {
        statuses: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    if (existsOrder) {
      return existsOrder
    }
    return this.prismaService.order.create({
      data: {
        userId: user.id,
        statuses: {
          create: {
            userId: user.id,
          },
        },
      },
    })
  }

  /**
   * Удаление заказа
   * Удаляем заказ если пользователь сам его создал или пользователь админ
   * @param user: пользователь
   * @param orderId: идентификатор заказа
   */
  async deleteOrder(user: User, orderId: string): Promise<string> {
    const order = await this.prismaService.order.findUnique({
      select: { id: true, userId: true },
      where: { id: orderId },
    })
    if (order.userId === user.id || user.role === 'ADMIN') {
      await this.prismaService.order.delete({ where: { id: orderId } })
    }
    return orderId
  }

  /**
   * Добавляем статус к заказу.
   * В случае, если добавляем к заказу согласован, то все позиции получают такой же статус
   * @param user: пользователь
   * @param orderId: идентификатор заказа
   * @param status: статус заказа
   */
  async addStatus(user: User, orderId: string, status: OrderStatus): Promise<Status> {
    if (status === 'APPROVED') {
      const itemIds = await this.prismaService.item.findMany({ select: { id: true }, where: { orderId } })
      await this.itemsService.addStatuses(
        user,
        itemIds.map((item) => item.id),
        ItemStatus.APPROVED,
      )
    }
    return this.prismaService.status.create({
      include: { user: true },
      data: {
        orderId,
        status,
        userId: user.id,
      },
    })
  }
  /**
   * Выгрузка заказа
   * @param user
   * @param orderId
   */
  async unloadOrder(user: User, orderId: string): Promise<FileUploadOutput> {
    const headers: Record<string, string> = {
      id: '#',
      vendorCode: 'vendorCode',
      manufacturer: 'Brand',
      quantity: 'Количество',
      price: 'price euro',
      bill: 'Sum price',
    }
    const orderItems = await this.prismaService.item.findMany({
      select: {
        quantity: true,
        price: true,
        product: {
          select: { vendorCode: true, manufacturer: { select: { name: true } } },
        },
      },
      where: { orderId },
    })
    return await this.fileService.getExcelFile(
      `order#${orderId}`,
      headers,
      orderItems.map((item, index) => ({
        ...item,
        manufacturer: item.product.manufacturer.name,
        vendorCode: item.product.vendorCode,
        price: Number(item.price.price),
        bill: Number(item.price.price) * item.quantity,
        id: index + 1,
      })),
      user,
    )
  }
  /**
   * Выгрузка заказа
   * @param user
   * @param orderId
   */
  async unloadOrderForAppraise(user: User, orderId: string): Promise<FileUploadOutput> {
    const headers: Record<string, string> = {
      id: '#',
      vendorCode: 'vendorCode',
      manufacturer: 'Brand',
      quantity: 'quantity',
      price: 'price euro',
      bill: 'Sum price',
    }
    const orderItems = await this.prismaService.item.findMany({
      select: {
        quantity: true,
        product: {
          select: { vendorCode: true, manufacturer: { select: { name: true } } },
        },
      },
      where: { orderId },
    })
    return await this.fileService.getExcelFile(
      `order#${orderId}`,
      headers,
      orderItems.map((item, index) => ({
        ...item,
        manufacturer: item.product.manufacturer.name,
        vendorCode: item.product.vendorCode,
        id: index + 1,
      })),
      user,
    )
  }
  /**
   * /**
   * Мутация для добавления заказа из файла
   * @param user: пользователь
   * @param fileId: айди загруженного файла с заказом
   */
  async createOrderFromExcel(user: User, fileId: string): Promise<CreateOrderType> {
    const order = await this.getOrCreateOrder(user)
    const file = await this.fileService.getExcelValuesById(fileId)
    console.log(file.values)

    for (const value of file.values) {
      const vendorCode = value.get('VendorCode')
      const manufacturer = value.get('Brand')
      const quantity = value.get('Quantity')
      console.log(vendorCode)

      if (!vendorCode || !quantity || !manufacturer) {
        console.error('Неполные данные в строке:', value)
        continue
      }

      const product: AddNewProductInput = {
        vendorCode: String(vendorCode),
        manufacturer: manufacturer ? String(manufacturer) : undefined,
      }
      await this.addNewProduct(user, product, Number(quantity))
    }
    return { order }
  }

  async orderUploadCheck(user: User, fileId: string): Promise<CreateOrderType> {
    console.log('Заказ загружен', fileId)
    const order = await this.getOrCreateOrder(user)
    return { order }
  }
}
