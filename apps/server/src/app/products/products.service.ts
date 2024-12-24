import { Injectable } from '@nestjs/common'
import { ProductConnectionArgs } from './dto/product-connection.args'
import { ProductConnectionType } from './dto/product-connection.type'
import { findManyCursorConnection } from '@common/relay/find-many-cursor-connection'
import { PrismaService } from '@common/services/prisma.service'
import { productValidator } from './validators'
import { ProductCreateManyInput } from '@generated/product'
import { AddNewProductInput } from '@orders/dto/add-new-product.input'

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Поиск продуктов
   * @param params
   */
  async getProductsConnection(params: ProductConnectionArgs): Promise<ProductConnectionType> {
    return await findManyCursorConnection(
      (args) =>
        this.prismaService.product.findMany({
          include: { prices: { orderBy: { updatedAt: 'desc' } }, manufacturer: true },
          where: params.where,
          orderBy: params.orderBy,
          ...args,
        }),
      () => this.prismaService.product.count({ where: params.where }),
      params,
    )
  }

  /**
   * Поиск идентификаторов продуктов по из артикулам
   * @param vendorCodes
   */
  async findIdsByVendorCodes(vendorCodes: string[]): Promise<Map<string, string>> {
    const findProducts = await this.prismaService.product.findMany({
      select: { id: true, vendorCode: true },
      where: { vendorCode: { in: vendorCodes } },
    })
    return new Map<string, string>(findProducts.map((product) => [product.vendorCode, product.id]))
  }

  /**
   * Поиск идентификаторов продуктов по из артикулам
   * @param vendorCodes
   */
  async findIdByVendorCode(vendorCode: string): Promise<string> {
    const findProduct = await this.prismaService.product.findFirst({
      select: { id: true },
      where: { vendorCode },
    })
    return findProduct ? findProduct.id : null
  }
  async findManufacturerIdByName(name: string): Promise<string> {
    const findManufacturer = await this.prismaService.manufacturer.findFirst({
      select: { id: true },
      where: { name },
    })
    return findManufacturer ? findManufacturer.id : null
  }
  /**
   * Функция для выборки и создания продуктов по артиклу.
   * vendorCode - обазательное поле
   * @param values
   */
  async getOrCreateProducts(
    values: Map<string, unknown>[],
  ): Promise<{ products: Map<string, string>; createdProducts: Map<string, string> }> {
    const vendorCodes = values
      .map((v) => v.get('vendorCode'))
      .filter(Boolean)
      .map(String)
    const products = await this.findIdsByVendorCodes(vendorCodes)
    const makeProductsForWrite = async () => {
      for (const v of values) {
        const manufacturerName = v.get('manufacturer') as string
        if (manufacturerName) {
          const manufacturer = await this.prismaService.manufacturer.findFirst({ where: { name: manufacturerName } })
          if (!manufacturer) {
            await this.prismaService.manufacturer.create({ data: { name: manufacturerName } })
          }
        }
      }

      const rez = await Promise.all(
        values.map(async (v) => {
          const manufacturerId = v.get('manufacturer')
            ? await this.findManufacturerIdByName(v.get('manufacturer') as string)
            : undefined

          const validationResult = productValidator.safeParse({
            ...Object.fromEntries(v),
            vendorCode: String(v.get('vendorCode')),
            manufacturerId,
          })

          if (!validationResult.success) {
            console.error('Validation Error:', validationResult.error)
            return null
          }

          return validationResult.data
        }),
      )

      const filteredRez = rez
        .filter(Boolean)
        .filter((createProductData) => !products.has(createProductData.vendorCode)) as ProductCreateManyInput[]
      return filteredRez
    }

    const createProductsData = await makeProductsForWrite()
    if (createProductsData.length) {
      await this.prismaService.product.createMany({ data: createProductsData, skipDuplicates: true })
    }

    const createdProducts = await this.findIdsByVendorCodes(
      createProductsData.map((createProductData) => createProductData.vendorCode),
    )

    return { products, createdProducts }
  }

  /**
   * Функция для выборки, или создания продуктов по артиклу.
   * vendorCode - обазательное поле
   * @param product: addNewProductInput
   */
  async getOrCreateProduct(product: AddNewProductInput): Promise<string> {
    const oldProductId = await this.findIdByVendorCode(product.vendorCode)
    console.log(oldProductId)
    if (oldProductId) {
      return oldProductId
    }
    const manufacturerInput = product.manufacturer
      ? await this.prismaService.manufacturer
          .findFirst({
            where: { name: product.manufacturer },
          })
          .then((manufacturer) =>
            manufacturer ? { connect: { id: manufacturer.id } } : { create: { name: product.manufacturer } },
          )
      : undefined
    const productId = await this.prismaService.product.create({
      select: { id: true },
      data: {
        vendorCode: product.vendorCode,
        manufacturer: manufacturerInput,
      },
    })
    return productId.id
  }
}
