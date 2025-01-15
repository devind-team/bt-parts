<script setup lang="ts">
import OrdersDataView from '@/entities/orders/ui/OrdersDataView.vue'
import AddItemToOrder from '@/features/items/AddItemToOrder.vue'
import AddOrderFromExel from '@/features/orders/ui/AddOrderFromExel.vue';
import AddPricesFromExel from '~/features/orders/ui/AddPricesFromExel.vue';
const authStore = useAuthStore()
</script>

<template>
  <div>
    <div class="flex ">
      <AddItemToOrder />
      <div class="flex ml-3">
        <AddOrderFromExel />
      </div>
      <div
        v-if="authStore.hasPermission('appraise')"
        class="flex ml-3"
      >
        <AddPricesFromExel />
      </div>
    </div>
    <orders-data-view />
  </div>
</template>