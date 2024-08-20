import { Module } from '@nestjs/common'
import { PrismaService } from '@common/services/prisma.service'
import { CompanyService } from './company.service'

@Module({
  providers: [PrismaService, CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
