<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import FileChoiceUpload from '@/shared/common/ui/FileChoiceUpload.vue';

const visible = ref(false);
const toast = useToast();
const { t } = useI18n();


const onHandleFileUpload = async (fileId: string | null) => {
  if (fileId) {
  console.log(fileId)
  } else {
    toast.add({ severity: 'error', summary: t('profile.avatar'), detail: t('profile.avatarError'), life: 3000 })
  }
  visible.value = false
}
</script>

<template>
  <div>
    <Button
      :label="t('file.upload')"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      modal
      :header="t('file.upload')"
    >
      <FileChoiceUpload
        accept=".xlsx"
        @uploader="onHandleFileUpload"
      />
    </Dialog>
  </div>
</template>
