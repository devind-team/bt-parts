import { Field, InputType, Int, PickType } from '@nestjs/graphql'
import { PriceCreateInput } from '@generated/price'

@InputType()
export class CreatePriceInput extends PickType(PriceCreateInput, [
  'price',
  'duration',
  'site',
  'comment',
  'validAt',
] as const) {
  @Field(() => Int, { nullable: false })
  productId!: string
}
