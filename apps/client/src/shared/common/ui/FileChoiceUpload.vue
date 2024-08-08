<script setup lang="ts">
import type { FileUploadUploaderEvent } from 'primevue/fileupload'

const props = withDefaults(defineProps<{
  accept?: string
  name?: string
  multiple?: boolean
  fileLimit?: number
}>(), {
  accept: undefined,
  name: 'file[]',
  multiple: false,
  fileLimit: 1,
})

const emit = defineEmits<{
  (e: 'uploader', event: FileUploadUploaderEvent): void
}>()
</script>

<template>
  <FileUpload
    :choose-label="$t('chose')"
    :upload-label="$t('upload')"
    :cancel-label="$t('cancel')"
    :max-file-size="1000000"
    :file-limit="props.fileLimit"
    :name="props.name"
    :multiple="props.multiple"
    :accept="props.accept"
    custom-upload
    @uploader="emit('uploader', $event)"
  >
    <template #empty>
      <span>{{ $t('emptyFile') }}</span>
    </template>
  </FileUpload>
</template>