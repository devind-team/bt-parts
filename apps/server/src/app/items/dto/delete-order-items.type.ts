import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DeleteOrderItemsType {
  @Field(() => [String], { description: 'Идентификаторы удаленных записей', nullable: false })
  deleteIds!: string[]
}
