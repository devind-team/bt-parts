<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useAuthStore } from '@/stores/auth-store';
import FileUpload from 'primevue/fileupload';
import { useMeQuery } from '@repo/queries/composables/graphql';
import type { UserFieldsFragment } from '@repo/queries/composables/graphql';
import { useToast } from 'primevue/usetoast';

const { result, loading, error } = useMeQuery();
const toast = useToast();
const user = ref<UserFieldsFragment | null>(null);

watch(result, (newResult) => {
  if (newResult?.me) {
    user.value = newResult.me;
  }
}, { immediate: true });

const userAvatar = computed(() => user.value?.avatar || '');

const displayConfirmDialog = ref(false);
const displayFileUploadDialog = ref(false);
const password = ref<string>('');

const saveChanges = () => {
  displayConfirmDialog.value = true;
};

const onUpload = (event: any) => {
  return
};


</script>

<template>
  <div class="profile-page surface-card p-4 shadow-2 border-round w-full">
    <h2>{{ $t('profile') }}, {{ user?.username }}</h2>
    <div
      v-if="user"
      class="avatar-section"
    >
      <img
        :src="userAvatar"
        alt="Avatar"
        class="avatar"
      >
      <Button
        label="Изменить аватар"
        icon="pi pi-pencil"
        class="p-button-secondary"
        @click="displayFileUploadDialog = true"
      />
    </div>
    <div
      v-if="user"
      class="user-details"
    >
      <div class="p-field p-fluid">
        <label for="username">{{ $t('auth.username') }}</label>
        <InputText 
          id="username"
          v-model="user.username"
          class="w-full mb-3"
        />
      </div>
      <div class="p-field p-fluid">
        <label for="firstname">{{ $t('auth.firstName') }}</label>
        <InputText
          id="firstname"
          v-model="user.firstName"
          class="w-full mb-3"
        />
      </div>
      <div class="p-field p-fluid">
        <label for="lastname">{{ $t('auth.lastName') }}</label>
        <InputText
          id="lastname"
          v-model="user.lastName"
          class="w-full mb-3"
        />
      </div>
      <div class="p-field p-fluid">
        <label for="patronymic">{{ $t('auth.patronymic') }}</label>
        <InputText
          id="patronymic"
          v-model="user.patronymic"
          class="w-full mb-3"
        />
      </div>
      <div class="p-field p-fluid">
        <label for="email">{{ $t('auth.email') }}</label>
        <InputText
          id="email"
          v-model="user.email"
          class="w-full mb-3"
        />
      </div>
    </div>
    <Button
      label="Сохранить"
      icon="pi pi-check"
      class="p-button-success"
      @click="saveChanges"
    />

    <Dialog
      v-model:visible="displayConfirmDialog"
      header="Подтверждение изменений"
      modal
    >
      <p>Для подтверждения изменений введите пароль:</p>
      <InputText
        v-model="password"
        type="password"
        placeholder="Пароль"
      />
      <div class="dialog-footer">
        <Button
          label="Подтвердить"
          icon="pi pi-check"
          class="p-button-success"
        />
        <Button
          label="Отмена"
          icon="pi pi-times"
          class="p-button-secondary"
          @click="() => displayConfirmDialog = false"
        />
      </div>
    </Dialog>

    <Dialog
      v-model:visible="displayFileUploadDialog"
      header="Выберите новый аватар"
      modal
    >
      <FileUpload
        mode="basic"
        name="avatar"
        accept="image/*"
        custom-upload
        :upload-handler="onUpload"
        auto
        choose-label="Выбрать файл"
      />
    </Dialog>

    <Toast />
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}

.avatar-section {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.user-details .p-field {
  margin-bottom: 1rem;
}

.user-details .p-field label {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
