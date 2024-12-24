import { Injectable } from '@nestjs/common'
import { PrismaService } from '@common/services/prisma.service'
import { findManyCursorConnection } from '@common/relay/find-many-cursor-connection'
import { Decimal } from '@prisma/client/runtime/library'
import { PriceConnectionArgs } from '@prices/dto/price-connection.args'
import { PriceConnectionType } from '@prices/dto/price-connection.type'
import { CreateUploadPricesType } from '@prices/dto/create-upload-prices.type'
import { CreateUploadPriceRowType } from '@prices/dto/create-upload-price-row.type'
import { CreatePriceInput } from '@prices/dto/create-price.input'
import { Price, PriceCreateManyInput } from '@generated/price'
import { User } from '@generated/user'
import { ProductsService } from '@products/products.service'
import { priceValidator } from '@prices/validators'
import { date } from 'zod'

@Injectable()
export class PricesService {
  constructor(private readonly prismaService: PrismaService, private readonly productsService: ProductsService) {}

  /**
   * Получение relay запросов для пагинации
   * @param user: пользователь
   * @param params: парметры фильтрации
   */
  async getPriceConnection(user: User, params: PriceConnectionArgs): Promise<PriceConnectionType> {
    return findManyCursorConnection(
      (args) =>
        this.prismaService.price.findMany({
          where: params.where,
          orderBy: params.orderBy,
          ...args,
        }),
      () => this.prismaService.price.count({ where: params.where }),
      params,
    )
  }

  /**
   * Сервис для добавления цены
   * @param price
   */
  async createPrice(price: CreatePriceInput): Promise<Price> {
    return this.prismaService.price.create({
      data: price,
    })
  }
  /**
   * Создание цен из значений
   * @param headers: передаваемый список заголовков, первые символы обязятельные
   * @param values: массив значений
   */
  async addPricesFromValues(headers: string[], values: Map<string, unknown>[]): Promise<CreateUploadPricesType> {
    const { products, createdProducts } = await this.productsService.getOrCreateProducts(values)
    const { data, rows } = await this.#makePricesForWrite(values, products, createdProducts)
    // Загрузка цен по частям (батчами)
    const BATCH_SIZE = 5000 // Размер батча
    let batchCount = 0

    // Разбиение на батчи и запись в базу данных
    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE)
      await this.prismaService.price.createMany({
        data: batch.map((item) => ({
          productId: item.productId,
          validAt: item.validAt,
          price: item.price,
          supplierId: item.supplierId,
        })),
      })
      batchCount += batch.length
      console.log(`Загружено ${batchCount} цен из ${data.length}`)
    }
    return { headers, rows }
  }

  /**
   * Подготовка цен для зависи в БД
   * @param values: значения цен
   * @param productsIndex: найденные индексы продуктов
   * @param createdProductIndex: созданные индексы продуктов
   */
  async #makePricesForWrite(
    values: Map<string, unknown>[],
    productsIndex: Map<string, string>,
    createdProductIndex: Map<string, string>,
  ): Promise<{ rows: CreateUploadPriceRowType[]; data: PriceCreateManyInput[] }> {
    const rows: CreateUploadPriceRowType[] = []
    const data: PriceCreateManyInput[] = []

    // Получение всех имен поставщиков
    const supplierNames = values
      .map((v) => v.get('supplierName'))
      .filter(Boolean)
      .map(String)
    // Создаем или получаем поставщиков
    await this.prismaService.supplier.createMany({
      data: supplierNames.map((name) => ({ name })),
      skipDuplicates: true,
    })

    const allSuppliers = await this.prismaService.supplier.findMany({
      where: { name: { in: supplierNames } },
    })
    const suppliersMap = new Map(allSuppliers.map((supplier) => [supplier.name, supplier.id]))
    // Формирование данных для записи
    for (const value of values) {
      const vendorCode = value.get('vendorCode')
      const productId = productsIndex.get(String(vendorCode)) || createdProductIndex.get(String(vendorCode))
      const supplierName = String(value.get('supplierName') || '')
      const validAt = value.get('validAt')
      const price = Number(value.get('price'))

      if (productId) {
        const validatedPrice = await priceValidator.safeParseAsync({
          ...Object.fromEntries(value),
          price,
          productId,
          validAt,
        })
        if (validatedPrice.success) {
          const { price, ...validateData } = validatedPrice.data

          const supplierId = suppliersMap.get(supplierName) // Получаем ID поставщика
          if (supplierId) {
            data.push({
              ...(validateData as Omit<PriceCreateManyInput, 'price'>),
              price: new Decimal(price),
              supplierId, // Связываем с поставщиком
            })
          }
        }

        rows.push({
          success: validatedPrice.success,
          productCreate: createdProductIndex.has(String(vendorCode)),
          data: Object.fromEntries(value),
          error: validatedPrice.success ? null : validatedPrice.error.issues,
        })
      }
    }

    return { rows, data }
  }
}
