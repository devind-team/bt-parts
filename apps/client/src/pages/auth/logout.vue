<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'

import { useRouter } from '#app'

definePageMeta({ middleware: 'auth' })

const { onLogout } = useApollo()
const authStore = useAuthStore()
const router = useRouter()
const localePath = useLocalePath()

onUnmounted(async () => {
  await onLogout()
  authStore.user = null
})

router.push(localePath({ name: 'index' }))
</script>

<template>
  <div>Logout.</div>
</template>