import { ModuleMetadata, Type } from '@nestjs/common/interfaces'
import { Client, ClientOptions } from 'minio'
export { BucketItemStat, ItemBucketMetadata } from 'minio'

export type S3Client = Client
export type S3ModuleOptions = ClientOptions

export interface S3ModuleOptionsFactory {
  createS3ModuleOptions(): Promise<ClientOptions> | ClientOptions
}

export interface S3ModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[]
  useClass?: Type<S3ModuleOptionsFactory>
  useExisting?: Type<S3ModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<ClientOptions> | ClientOptions
}
