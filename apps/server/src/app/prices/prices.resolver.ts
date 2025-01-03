import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '@auth/auth.guard'
import { CurrentUser } from '@auth/auth.decorators'
import { FilesService } from '@files/files.service'
import { PricesService } from '@prices/prices.service'
import { CreatePriceType } from '@prices/dto/create-price.type'
import { PriceConnectionType } from '@prices/dto/price-connection.type'
import { PriceConnectionArgs } from '@prices/dto/price-connection.args'
import { CreatePriceInput } from '@prices/dto/create-price.input'
import { CreateUploadPricesType } from '@prices/dto/create-upload-prices.type'
import { User } from '@generated/user'

@UseGuards(GqlAuthGuard)
@Resolver()
export class PricesResolver {
  constructor(private readonly pricesService: PricesService, private readonly fileService: FilesService) {}

  @Query(() => PriceConnectionType)
  async prices(@CurrentUser() user: User, @Args() params: PriceConnectionArgs): Promise<PriceConnectionType> {
    return await this.pricesService.getPriceConnection(user, params)
  }

  @Mutation(() => CreatePriceType)
  async createPrice(
    @Args({ name: 'price', type: () => CreatePriceInput, nullable: false }) price: CreatePriceInput,
  ): Promise<CreatePriceType> {
    return { price: await this.pricesService.createPrice(price) }
  }

  /**
   * Мутация для загрузки цен из xlsx файла.
   * Пользователь загружает xlsx файл со следующими полями:
   * Относится к Price:
   *    - price - цена в евро
   *    - duration? - срок поставки
   *    - supplierName? - название поставщика
   *    - country? - страна постащика
   *    - site? - сайт
   *    - comment? - комментарий
   *    - validAt? - дата запроса цены
   * Относится к Product:
   *    - vendorCode - артикул
   *    - nameEn? - название
   *    - manufacturer? - производитель
   * @param user: пользователь
   * @param fileId: файл для загрузки
   */
  @Mutation(() => CreateUploadPricesType)
  async uploadPricesFromExcel(
    @CurrentUser() user: User,
    @Args({ type: () => String, name: 'fileId', description: 'Идентификатор файла' }) fileId: string,
  ): Promise<CreateUploadPricesType> {
    const { headers, values } = await this.fileService.getExcelValuesById(fileId)
    return await this.pricesService.addPricesFromValues(headers.filter(Boolean), values)
  }
}
