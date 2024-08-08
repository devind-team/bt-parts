<script setup lang="ts">
const authStore = useAuthStore()
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
      <Button :label="$t('profile.changeAvatar')" />
    </div>
  </div>
</template>