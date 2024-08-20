<script lang="ts" setup>
import type { BreadCrumbsItem } from '@/shared/layout/types'
import BreadCrumbs from '@/shared/layout/ui/BreadCrumbs.vue'
import OrderDetailView from '@/entities/orders/ui/OrderDetailView.vue'

const route = useRoute()
const { t } = useI18n()

const props = defineProps<{
  links: BreadCrumbsItem[]
}>()

useHead({ title: t('orders.detail', { orderId: route.params.orderId }) })
</script>

<template>
  <bread-crumbs :items="props.links">
    <div class="title">
      {{ t('orders.detail', { orderId: route.params.orderId }) }}
    </div>
    <order-detail-view :order-id="String(route.params.orderId)" />
  </bread-crumbs>
</template>