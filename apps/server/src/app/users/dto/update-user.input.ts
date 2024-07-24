import { Field, InputType, PickType } from '@nestjs/graphql'
import { UserCreateInput } from '@generated/user'

@InputType()
export class UpdateUserInput extends PickType(UserCreateInput, [
  'id',
  'email',
  'lastName',
  'firstName',
  'patronymic',
] as const) {
  @Field(() => Date, { nullable: true, description: 'Date of birthday ' })
  birthday?: Date | string
}
