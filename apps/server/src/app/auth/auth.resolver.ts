import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { User } from '@generated/user'
import { AuthService } from '@auth/auth.service'
import { LocalAuthGuard } from '@auth/auth.guard'
import { UserLoginInput, UserLoginType, UserRegisterInput } from '@auth/dto'
import { CurrentUser } from '@auth/auth.decorators'
import { CompanyInput } from '@company/dto'

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserLoginType)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('userLoginInput') userLoginInput: UserLoginInput,
    @CurrentUser() user: User,
  ): Promise<UserLoginType> {
    return {
      accessToken: await this.authService.createJwtToken(user),
      user,
    }
  }

  @Mutation(() => UserLoginType, { nullable: true })
  async register(
    @Args('userRegisterInput') userRegisterInput: UserRegisterInput,
    @Args('companyInput', { nullable: true }) companyInput?: CompanyInput,
  ): Promise<UserLoginType> {
    return await this.authService.register(userRegisterInput, companyInput)
  }
}
