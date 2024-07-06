import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs'
// import GraphQLJSON from 'graphql-type-json'

import { PrismaService } from '@common/services/prisma.service'
import { AuthModule } from '@auth/auth.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: join(process.cwd(), 'apps/client/schema.graphql'),
      // resolvers: { JSON: GraphQLJSON },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
