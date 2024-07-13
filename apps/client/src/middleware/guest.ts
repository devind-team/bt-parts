import { useAuthStore } from '@/stores/auth-store'
import { useLocalePath } from '#imports'

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  const localePath = useLocalePath()

  if (authStore.loginIn) {
    return navigateTo(localePath({ name: 'index' }))
  }
})
