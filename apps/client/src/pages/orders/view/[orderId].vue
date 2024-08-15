<script lang="ts" setup>
const route = useRoute()
const { t } = useI18n()

useHead({ title: t('orders.detail', { orderId: route.params.orderId }) })
</script>

<template>
  <div>Просмотр заказа: {{ route.params }}</div>
</template>