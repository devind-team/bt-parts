import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '@auth/auth.guard'
import { CurrentUser } from '@auth/auth.decorators'
import { OrdersService } from '@orders/orders.service'
import { CreateOrderInput } from '@orders/dto/create-order.input'
import { CreateOrderType } from '@orders/dto/create-order.type'
import { OrderConnectionType } from '@orders/dto/order-connection.type'
import { OrderConnectionArgs } from '@orders/dto/order-connection.args'
import { DeleteOrderType } from '@orders/dto/delete-order.type'
import { AddProductInput } from '@orders/dto/add-product.input'
import { User } from '@generated/user'
import { Order } from '@generated/order'
import { Status } from '@generated/status'
import { OrderStatus } from '@generated/prisma'
import { AddNewProductInput } from '@orders/dto/add-new-product.input'
import { FileUploadOutput } from '@files/dto/file-upload.output'

@UseGuards(GqlAuthGuard)
@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => Order)
  async order(
    @CurrentUser() user: User,
    @Args({ name: 'orderId', type: () => String }) orderId: string,
  ): Promise<Order> {
    return this.ordersService.getOrder(orderId)
  }

  @Query(() => OrderConnectionType)
  async orders(@CurrentUser() user: User, @Args() params: OrderConnectionArgs): Promise<OrderConnectionType> {
    return this.ordersService.getOrderConnection(user, params)
  }
  /**
   * Мутация для создания заказа
   * @param user: пользователь
   * @param order: данные заказа
   */
  @Mutation(() => CreateOrderType)
  async createOrder(
    @CurrentUser() user: User,
    @Args({
      name: 'order',
      type: () => CreateOrderInput,
    })
    order: CreateOrderInput,
  ): Promise<CreateOrderType> {
    return this.ordersService.createOrder(user, order)
  }
  /**
   * Мутация для добавления заказа из файла
   * @param user: пользователь
   * @param fileId: айди загруженного файла с заказом
   */
  @Mutation(() => CreateOrderType)
  async createOrderFromExcel(
    @CurrentUser() user: User,
    @Args({ type: () => String, name: 'fileId', description: 'Идентификатор файла' }) fileId: string,
  ): Promise<CreateOrderType> {
    return this.ordersService.createOrderFromExcel(user, fileId)
  }

  /**
   * Мутация для добавления заказа из файла
   * @param user: пользователь
   * @param fileId: айди загруженного файла с заказом
   */
  @Mutation(() => CreateOrderType)
  async checkOrderUpload(
    @CurrentUser() user: User,
    @Args({ type: () => String, name: 'fileId', description: 'Идентификатор файла' }) fileId: string,
  ): Promise<CreateOrderType> {
    return this.ordersService.orderUploadCheck(user, fileId)
  }

  /**
   *
   * @param user пользователь
   * @param product добавляемая запчасть
   */
  @Mutation(() => CreateOrderType)
  async addProductToOrder(
    @CurrentUser() user: User,
    @Args({
      name: 'product',
      type: () => AddProductInput,
    })
    product: AddProductInput,
  ): Promise<CreateOrderType> {
    return this.ordersService.addProduct(user, product)
  }
  /**
   *
   * @param user пользователь
   * @param product добавляемая запчасть
   */
  @Mutation(() => CreateOrderType)
  async addNewProductToOrder(
    @CurrentUser() user: User,
    @Args({
      name: 'product',
      type: () => AddNewProductInput,
    })
    product: AddNewProductInput,
    @Args({ type: () => Int, name: 'quantity', description: 'Количество запчастей' }) quantity: number,
  ): Promise<CreateOrderType> {
    return this.ordersService.addNewProduct(user, product, quantity)
  }
  /**
   * Мутация для удаления заказа
   * @param user: пользователь
   * @param orderId: идентификатор заказа
   */
  @Mutation(() => DeleteOrderType)
  async deleteOrder(
    @CurrentUser() user: User,
    @Args({ type: () => String, name: 'orderId', description: 'Идентификатор заказа' }) orderId: string,
  ): Promise<DeleteOrderType> {
    return { id: await this.ordersService.deleteOrder(user, orderId) }
  }

  /**
   * Добавление статуса к заказу
   * @param user
   * @param orderId
   * @param status
   */
  @Mutation(() => Status)
  async addStatusOrder(
    @CurrentUser() user: User,
    @Args({ type: () => String, name: 'orderId', description: 'Идентификатор заказа' }) orderId: string,
    @Args({ type: () => OrderStatus, name: 'status', description: 'Статус заказа' }) status: OrderStatus,
  ): Promise<Status> {
    return this.ordersService.addStatus(user, orderId, status)
  }
  /**
   * Выгрузка заказа
   * @param user
   * @param orderId
   */
  @Mutation(() => FileUploadOutput)
  async unloadOrder(
    @CurrentUser() user: User,
    @Args({ type: () => String, name: 'orderId', description: 'Идентификатор заказа' }) orderId: string,
  ): Promise<FileUploadOutput> {
    return this.ordersService.unloadOrder(user, orderId)
  }
  /**
   * Выгрузка заказа для проценки ( с пустыми слотами для цен )
   * @param user
   * @param orderId
   */
  @Mutation(() => FileUploadOutput)
  async unloadOrderForAppraise(
    @CurrentUser() user: User,
    @Args({ type: () => String, name: 'orderId', description: 'Идентификатор заказа' }) orderId: string,
  ): Promise<FileUploadOutput> {
    return this.ordersService.unloadOrderForAppraise(user, orderId)
  }
}
