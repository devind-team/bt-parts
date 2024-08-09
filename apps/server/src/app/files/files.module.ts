import { Module } from '@nestjs/common'
import { S3Module } from '@s3/s3.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PrismaService } from '@common/services/prisma.service'

import { FilesResolver } from './files.resolver'
import { FilesService } from './files.service'
import { FilesController } from './files.controller'

@Module({
  imports: [
    S3Module.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        accessKey: config.get<string>('S3_ROOT_USER'),
        secretKey: config.get<string>('S3_ROOT_PASSWORD'),
        endPoint: config.get<string>('S3_END_POINT'),
        port: Number(config.get<number>('S3_PORT', 9000)),
        useSSL: config.get<string>('S3_USE_SSL', 'false') === 'true',
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [FilesController],
  providers: [FilesResolver, FilesService, PrismaService],
  exports: [FilesResolver, FilesService],
})
export class FilesModule {}
