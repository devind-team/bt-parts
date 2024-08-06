<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
import ToggleTheme from '@/features/common/ui/ToggleTheme.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const localePath = useLocalePath()
const router = useRouter()
const profileMenu = ref()

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

const toggleProfileMenu = (event: PointerEvent) => {
  profileMenu.value.toggle(event)
}
</script>

<template>
  <Toolbar>
    <template #start>
      <NuxtLink
        :to="localePath({ name: 'index' })"
        class="flex flex-row align-content-center"
      >
        <NuxtImg
          src="/icon.svg"
          width="28"
        />
        <span class="text-xl ml-3 font-medium">
          {{ $t('name') }}
        </span>
      </NuxtLink>
    </template>
    <template #end>
      <div class="flex flex-row gap-2">
        <ToggleTheme />
        <template v-if="authStore.loginIn">
          <Avatar
            icon="pi pi-user"
            shape="circle"
            aria-haspopup="true"
            aria-controls="overlay_menu_profile"
            @click="toggleProfileMenu"
          />
          <Menu
            id="overlay_menu_profile"
            ref="profileMenu"
            :model="items"
            :popup="true"
          />
        </template>
        <template v-else>
          <Button
            as="router-link"
            :to="localePath({ name: 'auth-login' })"
          >
            {{ $t('auth.login') }}
          </Button>
        </template>
      </div>
    </template>
  </Toolbar>
</template>
