import { Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { FilesService } from '@files/files.service'
import { GqlAuthGuard } from '@auth/auth.guard'

@UseGuards(GqlAuthGuard)
@Resolver()
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}
}
