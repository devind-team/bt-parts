import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DeleteOrderType {
  @Field(() => String, { description: 'Идентификатор удаленного заказа', nullable: false })
  id!: string
}
