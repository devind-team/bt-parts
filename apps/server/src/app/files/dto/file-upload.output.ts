import { Field, ObjectType } from '@nestjs/graphql'
import { File as FileType } from '@generated/file'
@ObjectType()
export class FileUploadOutput {
  @Field()
  newFile!: FileType

  @Field()
  serverUrl!: string
}
