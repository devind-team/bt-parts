<script setup lang="ts">
const { getToken } = useApollo()
const { t } = useI18n()
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
  (e: 'uploader', fileId: string | null): void
}>()

const onHandleUpload = async (event: { files: File | File[] }) => {
  const file = Array.isArray(event.files) ? event.files[0] : event.files
  const formData = new FormData()
  formData.append('file', file)
  try {
    const data: { id: string | null } = await $fetch('/api/files/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${await getToken()}`
      }
    })
    emit('uploader', data.id ?? null)
  } catch (error) {
    console.error('Error uploading file:', error)
    emit('uploader', null)
  }
}
</script>

<template>
  <FileUpload
    :choose-label="t('chose')" 
    :upload-label="t('upload')"
    :cancel-label="t('cancel')"
    :max-file-size="15000000"
    :file-limit="props.fileLimit"
    :name="props.name"
    :multiple="props.multiple"
    :accept="props.accept"
    custom-upload
    @uploader="onHandleUpload"
  >
    <template #empty>
      <span>{{ t('emptyFile') }}</span>
    </template>
  </FileUpload>
</template>