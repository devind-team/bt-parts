import { join } from 'node:path'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs'
import { GraphQLUpload } from 'graphql-upload-ts'
// import GraphQLJSON from 'graphql-type-json'

import { PrismaService } from '@common/services/prisma.service'
import { AuthModule } from '@auth/auth.module'
import { ItemsModule } from '@items/items.module'
import { ProductsModule } from '@products/products.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: join(process.cwd(), 'packages/queries/schema.graphql'),
      useGlobalPrefix: true,
      resolvers: { Upload: GraphQLUpload },
    }),
    AuthModule,
    ItemsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*')
  }
}
