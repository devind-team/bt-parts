<script setup lang="ts">
import type { BreadCrumbsItem } from '@/shared/layout/types'
import { PrimeIcons } from '@primevue/core/api'
import BreadCrumbs from '@/shared/layout/ui/BreadCrumbs.vue'
const { t } = useI18n()

const links = ref<BreadCrumbsItem[]>([
  { label: t('products.title'), icon: PrimeIcons.SEARCH, name: 'products' }
])

</script>
<template>
  <bread-crumbs :items="links">
    <div>Поиск</div>
  </bread-crumbs>
</template>