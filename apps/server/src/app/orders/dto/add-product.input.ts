import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class AddProductInput {
  @Field(() => String, { nullable: false })
  productId!: string

  @Field(() => Number, { nullable: false })
  quantity!: number
}
