import { Inject } from '@nestjs/common'
import { S3_CONNECTION } from '@s3/s3.constants'

/**
 * Inject minio client
 * @constructor
 */
export const InjectS3Client = () => {
  return Inject(S3_CONNECTION)
}
