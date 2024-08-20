import { Field, InputType, PickType } from '@nestjs/graphql'
import { UserCreateInput } from '@generated/user'
import * as Validator from 'class-validator'

@InputType()
export class UserRegisterInput extends PickType(UserCreateInput, [
  'username',
  'email',
  'lastName',
  'firstName',
  'patronymic',
  'password',
] as const) {
  @Field(() => Date, { nullable: true, description: 'Date of birthday ' })
  birthday?: Date | string

  @Field(() => String, { nullable: false, description: 'Phone number ' })
  @Validator.MinLength(3)
  @Validator.MaxLength(20)
  phone!: string
}
