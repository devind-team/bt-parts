import * as crypto from 'crypto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectS3Client } from '@s3/s3.decorators'
import { S3Client, BucketItemStat, FileInputType } from '@s3/s3.interfaces'
import { ConfigService } from '@nestjs/config'
import { GraphQLError } from 'graphql'
import { Readable as ReadableStream } from 'stream'

@Injectable()
export class S3Service {
  private readonly serverUrl: string
  private readonly endPoint: string
  private readonly bucket: string

  constructor(private readonly configService: ConfigService, @InjectS3Client() private readonly s3Client: S3Client) {
    this.serverUrl = this.configService.get<string>('S3_SERVER_URL')
    this.endPoint = this.configService.get<string>('S3_END_POINT')
    this.bucket = configService.get<string>('S3_BUCKET', 'bucket')
  }

  /**
   * Server url S3.
   */
  getServerUrl(): string {
    return this.serverUrl
  }
  /**
   * Bucket s3.
   */
  getBucket(): string {
    return this.bucket
  }

  /**
   * End point s3.
   */
  getEndPoint(): string {
    return this.configService.get<string>('S3_END_POINT')
  }

  async listBuckets() {
    return await this.s3Client.listBuckets()
  }

  /**
   * Получение потока на чтение файла.
   * @param objectName - имя объекта
   */
  async getFileObject(objectName: string): Promise<ReadableStream> {
    return await this.s3Client.getObject(this.getBucket(), objectName)
  }

  /**
   * Загружаем файл в S3
   * @param file
   * @return objectName
   */
  async uploadObject(file: FileInputType, prefix: string): Promise<string> {
    const [hashedFileName, ext] = this.hashedName(file.originalname)

    const objectName = `${prefix}/${hashedFileName}${ext}`
    const metaData = {
      'Content-Type': file.mimetype,
    }
    try {
      await this.s3Client.putObject(this.bucket, objectName, file.buffer, file.size, metaData)
    } catch (e) {
      throw new HttpException(`Error put object to s3: ${e}`, HttpStatus.BAD_REQUEST)
    }
    return objectName
  }

  /**
   * Получение хешированного имени файла
   * @param name
   */
  hashedName(name: string): string[] {
    const hashedFileName = crypto.createHash('md5').update(Date.now().toString()).digest('hex')
    const ext = name.substring(name.lastIndexOf('.'), name.length)
    return [hashedFileName, ext]
  }

  /**
   * Получение ссылки для загрузки файла в s3
   * @param fileName
   */
  async getPresignedPutUrl(fileName: string): Promise<[string, string, string]> {
    const [hashedFileName, ext] = this.hashedName(fileName)
    try {
      const fileName = `${hashedFileName}${ext}`
      const presignedUrl = await this.s3Client.presignedPutObject(this.bucket, fileName)
      return [this.bucket, fileName, presignedUrl]
    } catch (e) {
      throw new GraphQLError(`Error create presigned url: ${e}`)
    }
  }

  /**
   * Проверяем, если ли объект в s3
   * @param name
   * @return информацию или false - если файла нет
   */
  async existsObject(name: string): Promise<BucketItemStat | boolean> {
    try {
      return await this.s3Client.statObject(this.bucket, name)
    } catch {
      return false
    }
  }
}
