<script setup lang="ts">
import OrdersDataView from '@/entities/orders/ui/OrdersDataView.vue'
import AddItemToOrder from '@/features/items/AddItemToOrder.vue'
</script>

<template>
  <div>
    <AddItemToOrder />
    <orders-data-view />
  </div>
</template>