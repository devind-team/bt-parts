import { join } from 'node:path'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs'
// import GraphQLJSON from 'graphql-type-json'

import { PrismaService } from '@common/services/prisma.service'
import { AuthModule } from '@auth/auth.module'
import { ItemsModule } from '@items/items.module'
import { ProductsModule } from '@products/products.module'
import { OrdersModule } from '@orders/orders.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: join(process.cwd(), 'packages/queries/schema.graphql'),
      useGlobalPrefix: true,
      // resolvers: { Upload: GraphQLUpload, JSON: GraphQLJSON },
    }),
    AuthModule,
    ItemsModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*')
  }
}
