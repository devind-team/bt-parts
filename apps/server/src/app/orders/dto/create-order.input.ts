import { OrderCreateInput } from '@generated/order'
import { InputType, Field, PickType } from '@nestjs/graphql'

@InputType()
export class CreateOrderInput extends PickType(OrderCreateInput, ['address'] as const) {
  @Field(() => String, { nullable: false })
  fileId!: string
}
