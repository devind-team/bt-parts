<script setup lang="ts">
import type { FileUploadUploaderEvent } from 'primevue/fileupload'
import FileChoiceUpload from '@/shared/common/ui/FileChoiceUpload.vue'

const authStore = useAuthStore()

const visible = ref(false)

const onHandleFileUpload = (event: FileUploadUploaderEvent) => {
  console.log(event.files)
  visible.value = false
}
</script>
<template>
  <div class="flex flex-wrap">
    <div class="w-12 md:w-3 text-500">
      {{ $t('profile.avatar') }}
    </div>
    <div class="w-12 md:w-9 flex flex-column align-content-center align-items-center gap-4">
      <Avatar
        :label="authStore.initials"
        class="w-10rem h-10rem"
        size="xlarge"
        shape="circle"
      />
      <Button
        :label="$t('profile.changeAvatar')"
        @click="visible = true"
      />
      <Dialog
        v-model:visible="visible"
        modal
        :header="$t('profile.changeAvatar')"
      >
        <FileChoiceUpload
          accept="image/*"
          @uploader="onHandleFileUpload"
        />
      </Dialog>
    </div>
  </div>
</template>