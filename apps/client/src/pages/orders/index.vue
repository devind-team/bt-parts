<script setup lang="ts">
import type { BreadCrumbsItem } from '@/shared/layout/types'
import OrdersView from '@/widgets/orders/ui/OrdersView.vue'
import BreadCrumbs from '@/shared/layout/ui/BreadCrumbs.vue'

const { t } = useI18n()

const props = defineProps<{
  links: BreadCrumbsItem[]
}>()

useHead({ title: t('orders.title') })
</script>

<template>
  <bread-crumbs :items="props.links">
    <div class="title">
      {{ t('orders.title') }}
    </div>
    <OrdersView />
  </bread-crumbs>
</template>