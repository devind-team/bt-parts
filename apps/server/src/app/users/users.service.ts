import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '@common/services/prisma.service'
import { User } from '@generated/user'
import { FilesService } from '@files/files.service'
import { UpdateUserInput } from './dto/update-user.input'
import type { Bcrypt } from '@auth/providers'
import { BCRYPT } from '@auth/providers'
import { GraphQLError } from 'graphql'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from '@auth/strategies'

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly fileService: FilesService,
    @Inject(BCRYPT) private readonly bcryptService: Bcrypt,
  ) {}

  async findOne(username: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { username },
    })
  }

  async updateUser(userDto: UpdateUserInput): Promise<User> {
    const id = userDto.id
    const userFirst = await this.prismaService.user.findUnique({
      where: { id },
    })
    if (!userFirst) {
      throw new GraphQLError('Неверный id', {
        extensions: { code: 'FORBIDDEN' },
      })
    }
    return this.prismaService.user.update({
      where: { id },
      data: {
        ...userDto,
      },
    })
  }

  async updateAvatar(fileId: string, user: User): Promise<User> {
    const file = await this.prismaService.file.findUnique({
      where: { id: fileId },
    })
    if (!file) {
      throw new GraphQLError('Файл не найден', {
        extensions: { code: 'NOT_FOUND' },
      })
    }
    return this.prismaService.user.update({
      where: { id: user.id },
      data: { avatar: file.id },
    })
  }

  async createJwtToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
    }
    return this.jwtService.signAsync(payload)
  }
}
