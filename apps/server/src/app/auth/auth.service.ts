import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '@common/services/prisma.service'
import { GraphQLError } from 'graphql'
import { JwtService } from '@nestjs/jwt'
import { UserLoginInput, UserLoginType, UserRegisterInput } from '@auth/dto'
import { User } from '@generated/user'
import type { Bcrypt } from '@auth/providers'
import { BCRYPT } from '@auth/providers'
import { JwtPayload } from '@auth/strategies'
import { CompanyService } from '@company/company.service'
import { CompanyInput } from '@company/dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly companyService: CompanyService,
    private readonly jwtService: JwtService,
    @Inject(BCRYPT) private readonly bcryptService: Bcrypt,
  ) {}

  async login({ username, password }: UserLoginInput): Promise<UserLoginType> {
    const user = await this.validateUser(username, password)
    if (!user) {
      throw new GraphQLError('Неверный логин или пароль', {
        extensions: { code: 'FORBIDDEN' },
      })
    }
    const accessToken = await this.createJwtToken(user)
    return { accessToken, user }
  }

  async register(userDto: UserRegisterInput, companyDto: CompanyInput): Promise<UserLoginType> {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: userDto.username }, { email: userDto.email }, { phone: userDto.phone }],
      },
    })

    if (existingUser) {
      if (existingUser.username === userDto.username) {
        throw new Error('username')
      } else if (existingUser.email === userDto.email) {
        throw new Error('email')
      } else if (existingUser.phone === userDto.phone) {
        throw new Error('phone')
      }
    }

    const saltRounds = 10
    const password = await this.bcryptService.hash(userDto.password, saltRounds)
    const companyName = companyDto.name
    const user = await this.prismaService.user.create({
      data: {
        ...userDto,
        password,
        companyName,
      },
    })

    const accessToken = await this.createJwtToken(user)
    return { accessToken, user }
  }

  async createJwtToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
    }
    return await this.jwtService.signAsync(payload)
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    })
    if (!user) {
      return null
    }
    const valid = await this.bcryptService.compare(password, user.password)
    return valid ? user : null
  }
}
