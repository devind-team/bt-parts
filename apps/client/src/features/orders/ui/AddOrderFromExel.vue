<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import FileChoiceUpload from '@/shared/common/ui/FileChoiceUpload.vue';
import { useCreateOrderFromExcelMutation, useCheckOrderUploadMutation } from '@repo/queries/composables/graphql';

const visible = ref(false);
const toast = useToast();
const { t } = useI18n();
const { mutate, onDone } = useCreateOrderFromExcelMutation()
const { mutate: check } = useCheckOrderUploadMutation()

const onHandleFileUpload = async (fileId: string | null) => {
  if (fileId) {
    await mutate({ fileId })
    const check_return = await check({ fileId })
    onDone(()=>{toast.add({ severity: 'success', summary: t('file.success_upload'), detail: t('file.success_upload_detail'), life: 3000 })})
    console.log(check_return)
  } else {
    toast.add({ severity: 'error', summary: t('file.error_upload'), detail: t('file.error_upload_detail'), life: 3000 })
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
