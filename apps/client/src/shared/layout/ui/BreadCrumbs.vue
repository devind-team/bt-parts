<script lang="ts" setup>
import { type BreadCrumbsItem } from '@/shared/layout/types'
import type { MenuItem } from 'primevue/menuitem'
import { useLocalePath } from '#imports'
import PvContainer from '@/widgets/layout/ui/PvContainer.vue'

const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()

const home = ref<MenuItem>({
  icon: 'pi pi-home',
  label: t('home'),
  url: localePath({ name: 'index' }),
  command: ({ originalEvent }) => {
    originalEvent.preventDefault()
    router.push(localePath({ name: 'index' }))
  },
})

const props = withDefaults(defineProps<{ items?: BreadCrumbsItem[] }>(), {
  items: undefined
})

const modelItems = computed<MenuItem[]>(() => {
  if (!props.items) {
    return []
  }
  return props.items.map<MenuItem>((item) => {
    return {
      command: ({ originalEvent }) => {
        originalEvent.preventDefault()
        router.push(localePath({ name: item.name }))
      },
      ...item
    }
  })
})
</script>
<template>
  <pv-container v-bind="$attrs">
    <Breadcrumb
      :home="home"
      :model="modelItems"
      class="pb-4"
    />
    <slot />
  </pv-container>
</template>