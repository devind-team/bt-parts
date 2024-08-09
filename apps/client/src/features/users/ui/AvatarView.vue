<script setup lang="ts">
import type { FetchResult } from '@apollo/client/link/core'
import type { File as FileType } from '@repo/queries/composables/graphql.ts'
import { ApolloCache } from '@apollo/client/core'
import FileChoiceUpload from '@/shared/common/ui/FileChoiceUpload.vue'
import { useUploadAvatarMutation, type UploadAvatarMutation, type MeQuery, type User } from '@repo/queries/composables/graphql.js'

const authStore = useAuthStore()
const toast = useToast()
const { t } = useI18n()

const props = defineProps<{
  user: User
  changeUpdate: (cache: ApolloCache<MeQuery>, result: Omit<FetchResult<UploadAvatarMutation>, 'context'>) => void
}>()

const visible = ref(false)

const { mutate: uploadAvatarMutation, onDone } = useUploadAvatarMutation({
  update: (cache, result) => props.changeUpdate(cache, result),
})

onDone(({ data }) => {
  const { avatar } = data!.uploadAvatar
  authStore.setAvatar(avatar || null)
  toast.add({ severity: 'success', summary: t('profile.avatar'), detail: t('profile.successUpdate'), life: 3000 })
})

const onHandleFileUpload = async (fileId: string | null) => {
  console.log(fileId)
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