<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import FileChoiceUpload from '@/shared/common/ui/FileChoiceUpload.vue';
import { useUploadPricesFromExcelMutation } from '@repo/queries/composables/graphql';

const visible = ref(false);
const toast = useToast();
const { t } = useI18n();
const { mutate, onDone } = useUploadPricesFromExcelMutation()

const onHandleFileUpload = async (fileId: string | null) => {
  if (fileId) {
    const res = await mutate({ fileId })
    console.log(res)
    onDone(()=>{toast.add({ severity: 'success', summary: t('file.success_upload'), detail: t('file.success_upload_detail'), life: 3000 })})
  } else {
    toast.add({ severity: 'error', summary: t('file.error_upload'), detail: t('file.error_upload_detail'), life: 3000 })
  }
  visible.value = false
}
</script>

<template>
  <div>
    <Button
      :label="t('file.priceUpload')"
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
