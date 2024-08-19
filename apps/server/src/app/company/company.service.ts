import { CompanyInput } from '@company/dto'
import { PrismaService } from '@common/services/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCompany(companyDto: CompanyInput): Promise<string> {
    const company = await this.prismaService.companies.findUnique({
      where: {
        name: companyDto.name,
      },
    })
    if (!company) {
      const newCompany = await this.prismaService.companies.create({
        data: {
          ...companyDto,
        },
      })
      return newCompany.id
    }
    return company.id
  }
}
