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
    command: () => router.push(localePath({ name: 'profile-me' })),
  },
  {
    label: t('orders.title'),
    icon: 'pi pi-shopping-cart',
    command: () => router.push(localePath({ name: 'orders' })),
  },
  {
    label: t('auth.logout'),
    icon: 'pi pi-sign-out',
    command: () => router.push(localePath({ name: 'auth-logout' })),
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
          width="32"
        />
        <span class="text-xl ml-3 font-medium">
          {{ t('name') }}
        </span>
      </NuxtLink>
    </template>
    <template #end>
      <div class="flex flex-row gap-2">
        <ToggleTheme />
        <template v-if="authStore.loginIn">
          <Avatar
            :label="authStore.avatarUrl ? undefined : authStore.initials"
            :image="authStore.avatarUrl"
            class="my-auto"
            shape="circle"
            aria-haspopup="true"
            aria-controls="overlay_menu_profile"
            style="width: 40px; height: 40px; cursor: pointer;"
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
            :to="localePath({ name: 'auth-login' })"
            as="router-link"
            size="small"
            text
            plain
          >
            {{ t('auth.login') }}
          </Button>
        </template>
      </div>
    </template>
  </Toolbar>
</template>

<style lang="scss">
.p-toolbar {
  height: var(--p-toolbar-height);
  position: fixed;
  border: none !important;
  border-bottom: 1px solid var(--p-toolbar-border-color) !important;
  top: 0;
  width: 100%;
  z-index: 1;
}
</style>