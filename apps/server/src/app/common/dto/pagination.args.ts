import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  skip?: number
  @Field(() => String, { nullable: true })
  after?: string
  @Field(() => String, { nullable: true })
  before?: string
  @Field(() => Int, { nullable: true })
  first?: number
  @Field(() => Int, { nullable: true })
  last?: number
}
