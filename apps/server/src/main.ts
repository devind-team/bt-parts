/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

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

  const config = new DocumentBuilder()
    .setTitle('bt-parts')
    .setDescription('Best trans parts api description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = process.env.PORT || 4200
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
