import { Module } from '@nestjs/common'
import { PrismaService } from '@common/services/prisma.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { FilesModule } from '@files/files.module'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { JwtModule } from '@nestjs/jwt'
import { bcryptServiceProvider } from '@auth/providers'

@Module({
  imports: [
    ConfigModule,
    FilesModule,
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
  ],
  providers: [PrismaService, UsersService, UsersResolver, bcryptServiceProvider],
  exports: [UsersService],
})
export class UsersModule {}
