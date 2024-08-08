<script setup lang="ts">
import AvatarView from '~/features/profile/ui/AvatarView.vue'
import BasicInformation from '~/features/profile/ui/BasicInformation.vue'

const authStore = useAuthStore()
const { dateTimeHM } = useFilters()
</script>

<template>
  <Card>
    <template #title>
      {{ `${$t('profile.name')} ` }}{{ authStore.fullName }}
    </template>
    <template #subtitle>
      {{ $t('profile.createdAt') }}: {{ dateTimeHM(authStore.user?.createdAt) }}
    </template>
    <template #content>
      <avatar-view />
      <basic-information />
    </template>
  </Card>
</template>
