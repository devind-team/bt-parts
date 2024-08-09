<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import type { LinksType } from '@/shared/layout/types'

const route = useRoute()
const localePath = useLocalePath()

const props = defineProps<{ items: LinksType[] }>()

const items = computed<MenuItem[]>(() => {
  return props.items.map<MenuItem>((item) => ({
    url: localePath({ name: item.name }),
    ...item,
  }))
})
</script>
<template>
  <div class="flex flex-wrap">
    <div class="w-12 md:w-3 p-2">
      <Menu :model="items">
        <template #item="{ item }">
          <nuxt-link
            v-ripple
            class="p-menu-item-link"
            :class="{ 'p-menu-item-active': route.fullPath == item.url }"
            :to="item.url"
            style="overflow: hidden; position: relative;"
          >
            <span :class="item.icon" />
            <span class="p-menu-item-label">{{ item.label }}</span>
          </nuxt-link>
        </template>
      </Menu>
    </div>
    <div class="w-12 md:w-9 p-2">
      <slot />
    </div>
  </div>
</template>
<style lang="scss">
.p-menu-item-active {
  background-color: var(--p-surface-200);
  color: var(--p-surface-700) !important;
}
</style>