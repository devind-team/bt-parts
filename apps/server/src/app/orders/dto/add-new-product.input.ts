import { ProductCreateInput } from '@generated/product'
import { InputType, Field, PickType } from '@nestjs/graphql'

@InputType()
export class AddNewProductInput extends PickType(ProductCreateInput, ['vendorCode'] as const) {
  @Field(() => String, { nullable: true })
  manufacturer?: string
}
