<script setup lang="ts">
import OrdersDataView from '@/entities/orders/ui/OrdersDataView.vue'
import AddItemToOrder from '@/features/items/AddItemToOrder.vue'
import AddOrderFromExel from '@/features/orders/ui/AddOrderFromExel.vue';
</script>

<template>
  <div>
    <div class="flex ">
      <AddItemToOrder />
      <div class="flex ml-3">
        <AddOrderFromExel />
        <Button
          class="ml-3"
          label="Просто кнопка"
        />
      </div>
    </div>
    <orders-data-view />
  </div>
</template>