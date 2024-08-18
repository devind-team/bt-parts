import { CompanyInput } from '@company/dto'
import { PrismaService } from '@common/services/prisma.service'

export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCompany(companyDto: CompanyInput): Promise<string> {
    console.log(companyDto)
    const company = await this.prismaService.companies.findUnique({
      where: {
        name: companyDto.name,
      },
    })
    console.log(company)
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
