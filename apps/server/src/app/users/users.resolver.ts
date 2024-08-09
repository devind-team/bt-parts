import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@generated/user'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '@auth/auth.guard'
import { CurrentUser } from '@auth/auth.decorators'
import { UsersService } from '@users/users.service'
import { UpdateUserInput } from './dto/update-user.input'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async me(@CurrentUser() user: User): Promise<User> {
    return user
  }

  /**
   * Update avatar for current user.
   * @param user Current user
   * @param file Upload file avatar
   * @returns User with updated avatar
   */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async uploadAvatar(
    @CurrentUser() user: User,
    @Args({ name: 'fileId', type: () => String }) fileId: string,
  ): Promise<User> {
    return this.usersService.updateAvatar(fileId, user)
    return user
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args({ name: 'updateUserInput', type: () => UpdateUserInput }) updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(updateUserInput)
  }
}
