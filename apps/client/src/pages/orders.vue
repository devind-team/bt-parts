<script lang="ts" setup>
import type { BreadCrumbsItem } from '@/shared/layout/types'
import { PrimeIcons } from '@primevue/core/api'

const { t } = useI18n()
definePageMeta({ middleware: 'auth' })

const links = ref<BreadCrumbsItem[]>([
  { label: t('orders.title'), icon: PrimeIcons.SHOPPING_CART, name: 'orders' }
])
</script>

<template>
  <nuxt-page :links="links" />
</template>