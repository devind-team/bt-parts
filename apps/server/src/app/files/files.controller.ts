import 'multer'
import { Express, Response } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
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

  @Get(':fileId')
  async getFile(@Res() res: Response, @Param('fileId') fileId: string) {
    const fileStream = await this.filesService.getFileStreamById(fileId)
    fileStream.pipe(res)
  }

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
  async uploadFile(@CurrentRestUser() user: User, @UploadedFile() file: Express.Multer.File): Promise<FileType> {
    return this.filesService.add(file, user)
  }
}
