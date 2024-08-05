<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'

const { t } = useI18n()
const authStore = useAuthStore()
const localePath = useLocalePath()
const router = useRouter()
const items = ref([
  {
    label: t('profile.user'),
    icon: 'pi pi-user',
    command: () => {
      router.push(localePath({ name: 'profile-me' }))
    }
  },
  {
    label: t('auth.logout'),
    icon: 'pi pi-sign-out',
    command: () => {
      router.push(localePath({ name: 'auth-logout' }))
    }
  }
])
2

</script>

<template>
  <Toolbar>
    <template #start>
      <NuxtLink
        :to="localePath({ name: 'index' })"
        class="flex"
      >
        <NuxtImg
          src="/icon.svg"
          width="32"
        />
        <span class="text-3xl ml-3 font-medium">
          {{ $t('name') }}
        </span>
      </NuxtLink>
    </template>
    <template #end>
      <template v-if="authStore.loginIn">
        <SplitButton
          label="Профиль"
          icon="pi pi-user"
          :model="items"
        />
      </template>
      <template v-else>
        <Button
          as="router-link"
          :to="localePath({ name: 'auth-login' })"
        >
          <span class="font-medium">
            {{ $t('auth.login') }}
          </span>
        </Button>
      </template>
    </template>
  </Toolbar>
</template>
