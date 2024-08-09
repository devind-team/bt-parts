/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { graphqlUploadExpress } from 'graphql-upload-ts'

import { AppModule } from './app/app.module'
import { PrismaService } from '@common/services/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() })
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
    credentials: true,
  })

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: true,
    }),
  )

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  const port = process.env.PORT || 4200
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
