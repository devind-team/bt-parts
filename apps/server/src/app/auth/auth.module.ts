import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '@users/users.module'
import { PrismaService } from '@common/services/prisma.service'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy, LocalStrategy } from './strategies'
import { bcryptServiceProvider } from './providers'
import { CompanyService } from '@company/company.service'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      // property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('SECRET_KEY'),
        signOptions: {
          expiresIn: '24h',
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [
    bcryptServiceProvider,
    PrismaService,
    AuthService,
    AuthResolver,
    JwtStrategy,
    LocalStrategy,
    CompanyService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
