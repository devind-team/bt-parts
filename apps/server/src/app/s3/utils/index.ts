import { S3Client, S3ModuleOptions } from '../s3.interfaces'
import * as MinioJS from 'minio'

export function createS3Connection(config: S3ModuleOptions): S3Client {
  return new MinioJS.Client(config)
}
