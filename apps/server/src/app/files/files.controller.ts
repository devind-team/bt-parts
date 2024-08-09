import 'multer'
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger'
import { File as FileType } from '@generated/file'

import { FilesService } from './files.service'
import { AuthGuard } from '@nestjs/passport'
import { User } from '@generated/user'
import { CurrentRestUser } from '@auth/auth.decorators'

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async getData(@CurrentRestUser() user: User, @UploadedFile() file: Express.Multer.File): Promise<FileType> {
    return this.filesService.add(file, user)
  }
}
