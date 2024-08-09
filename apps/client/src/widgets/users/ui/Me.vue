<script setup lang="ts">
import AvatarView from '@/features/users/ui/AvatarView.vue'
import BasicInformation from '@/features/users/ui/BasicInformation.vue'
import type { MeQuery, MeQueryVariables } from '@repo/queries/composables/graphql'
import meQuery from '@repo/queries/graphql/auth/queries/me.graphql'

const authStore = useAuthStore()
const { dateTimeHM } = useFilters()

const { data: user, changeUpdate, loading } = useCommonQuery<MeQuery, MeQueryVariables>({ document: meQuery })
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
      <ProgressSpinner v-if="loading" />
      <template v-else>
        <avatar-view
          :user="user!"
          :change-update="changeUpdate"
        />
        <basic-information
          :user="user!"
          :change-update="changeUpdate"
        />
      </template>
    </template>
  </Card>
</template>
