<script setup lang="ts">
import type { BreadCrumbsItem } from '@/shared/layout/types'
import { PrimeIcons } from '@primevue/core/api'
import BreadCrumbs from '@/shared/layout/ui/BreadCrumbs.vue'
import ProductsSearch from '@/features/products/ui/ProductsSearch.vue'

const { t } = useI18n()

useHead({ title: t('products.title') })

const links = ref<BreadCrumbsItem[]>([
  { label: t('products.title'), icon: PrimeIcons.SEARCH, name: 'products' }
])

</script>
<template>
  <bread-crumbs :items="links">
    <div class="title">
      {{ t('products.title') }}
    </div>
    <ProductsSearch />
  </bread-crumbs>
</template>