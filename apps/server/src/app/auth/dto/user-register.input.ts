import { Field, InputType, PickType } from '@nestjs/graphql'
import { UserCreateInput } from '@generated/user'

@InputType()
export class UserRegisterInput extends PickType(UserCreateInput, [
  'username',
  'phone',
  'email',
  'lastName',
  'firstName',
  'patronymic',
  'password',
] as const) {
  @Field(() => Date, { nullable: true, description: 'Date of birthday ' })
  birthday?: Date | string

  @Field(() => String, { nullable: true })
  companyName?: string
}
