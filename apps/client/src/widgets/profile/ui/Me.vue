<script setup lang="ts">
import ProfileAvatar from '@/features/profile/ui/ProfileAvatar.vue'
import MeInformationEntities from '@/entities/profile/MeInformationEntities.vue'
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
      <profile-avatar />
      <MeInformationEntities />
    </template>
  </Card>
</template>
