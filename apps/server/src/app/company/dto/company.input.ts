import { CompaniesCreateInput } from '@generated/companies'
import { InputType, PickType } from '@nestjs/graphql'

@InputType()
export class CompanyInput extends PickType(CompaniesCreateInput, ['name', 'address', 'location'] as const) {}
