import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '@common/services/prisma.service'
import { User } from '@generated/user'
import { FilesService } from '@files/files.service'
import { FileUploadInput } from '@files/dto/file-upload.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UserLoginType } from '@auth/dto'
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

  async updateUser(userDto: UpdateUserInput): Promise<UserLoginType> {
    const id = userDto.id
    const user = await this.prismaService.user.findUnique({
      where: { id },
    })
    if (!user) {
      throw new GraphQLError('Неверный id', {
        extensions: { code: 'FORBIDDEN' },
      })
    }
    const saltRounds = 10
    const password = await this.bcryptService.hash(userDto.password, saltRounds)
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        ...userDto,
        password,
      },
    })
    const accessToken = await this.createJwtToken(updatedUser)
    return { accessToken, updatedUser }
  }

  async updateAvatar(uploadFile: FileUploadInput, user: User): Promise<User> {
    const file = await this.fileService.add(uploadFile, user)
    const { bucket, serverUrl } = this.fileService.storageInfo()
    const avatar = new URL(`/${bucket}/${file.key}`, serverUrl).toString()
    return this.prismaService.user.update({
      where: { id: user.id },
      data: { avatar },
    })
  }

  async createJwtToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
    }
    return await this.jwtService.signAsync(payload)
  }
}
