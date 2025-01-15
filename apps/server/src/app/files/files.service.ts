import * as ExcelJS from 'exceljs'
import { z } from 'zod'
import { Readable as ReadableStream } from 'stream'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@common/services/prisma.service'
import { S3Service } from '@s3/s3.service'
import { ExcelReader } from '@common/utils/readers/excel.reader'
import { File as FileType } from '@generated/file'
import { User } from '@generated/user'
import { FileInputType } from '@s3/s3.interfaces'
import { FileUploadOutput } from './dto/file-upload.output'

@Injectable()
export class FilesService {
  constructor(private readonly prismaService: PrismaService, private readonly s3Service: S3Service) {}

  /**
   * Получаем информацию о нахождении сервера файлов.
   */
  storageInfo(): { serverUrl: string; bucket: string } {
    return {
      serverUrl: this.s3Service.getServerUrl(),
      bucket: this.s3Service.getBucket(),
    }
  }
  /**
   * Функция для добавления файла
   * @param uploadFile Загруженный с помощью S3 файл
   * @param user Пользователь
   */
  async add(uploadFile: FileInputType, user: User): Promise<FileType> {
    const key = await this.s3Service.uploadObject(uploadFile, user.id)
    const name = Buffer.from(uploadFile.originalname, 'ascii').toString('utf-8')
    const newFile = await this.prismaService.file.create({
      data: {
        name,
        key,
        bucket: this.s3Service.getBucket(),
        userId: user.id,
      },
    })
    const { serverUrl, bucket } = await this.storageInfo()
    const url = new URL(`${bucket}/${key}`, serverUrl)
    console.log(url)
    return newFile
  }

  async getFileStreamById(fileId: string): Promise<ReadableStream> {
    const file = await this.prismaService.file.findUnique({
      where: { id: fileId },
    })
    return this.getFileStream(file)
  }

  /**
   * Получение файла для чтения
   * @param file
   */
  async getFileStream(file: FileType): Promise<ReadableStream> {
    return this.s3Service.getFileObject(file.key)
  }
  /**
   * Проверка правильности файлового имени
   * @param name
   */
  async checkFileName(name: string): Promise<boolean> {
    const nameSchema = z.string().trim().min(3)
    try {
      await nameSchema.parseAsync(name)
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * Получаем значения из первого листа Excel файла.
   * Первая строка является заголовочной, остальные строки представляют из себя набор данных.
   * @param file
   */
  async getExcelValues(file: FileType): Promise<{ headers: string[]; values: Map<string, unknown>[] }> {
    const stream = await this.getFileStream(file)
    const excelReader = new ExcelReader()
    await excelReader.load(stream)
    return ExcelReader.getValues(excelReader.workSheet)
  }
  /**
   * Получаем значения из первого листа Excel файла.
   * Первая строка является заголовочной, остальные строки представляют из себя набор данных.
   * @param file
   */
  async getExcelValuesById(fileId: string): Promise<{ headers: string[]; values: Map<string, unknown>[] }> {
    const stream = await this.getFileStreamById(fileId)
    const excelReader = new ExcelReader()
    await excelReader.load(stream)
    return ExcelReader.getValues(excelReader.workSheet)
  }

  /**
   * Записываем значения из заказа в Excel файл.
   * @param sheetName: string
   * @param headers: название заголовоков
   * @param values: Array<{}> - [{id: 1, name: 1, 'status.id': 1, 'status.name': 1}, {}]
   * @param user: Пользователь
   */
  async getExcelFile(
    sheetName: string,
    headers: Record<string, string>,
    values: Array<Record<string, unknown>>,
    user: User,
  ): Promise<FileUploadOutput> {
    const workbook = await this.createAndFillWorkbook(sheetName, headers, values)
    const fileName = `UnloadOrder_${new Date().toJSON().slice(0, 10)}.xlsx`
    const buffer = await workbook.xlsx.writeBuffer()
    const { serverUrl } = await this.storageInfo()
    const newFile = await this.add(
      {
        originalname: fileName,
        mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        buffer: buffer as Buffer,
        size: buffer.byteLength,
      },
      user,
    )
    return { newFile, serverUrl }
  }

  async createAndFillWorkbook(
    sheetName: string,
    headers: Record<string, string>,
    values: Array<Record<string, unknown>>,
  ): Promise<ExcelJS.Workbook> {
    const data = values
    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet(sheetName)
    ws.columns = Object.entries(headers).map(([key, header]) => ({ header, key }))
    ws.addRows(data)
    return wb
  }
}
