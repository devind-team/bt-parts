<script setup lang="ts">
import type { Product } from '@repo/queries/composables/graphql.js'
import DataView from 'primevue/dataview'

const { date } = useFilters()

const props = defineProps<{
  products: Product[]
}>()

</script>
<template>
  <DataView :value="props.products">
    <template #list="{ items }">
      <div class="flex flex-column">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          :class="{ 'border-top-1': index !== 0 }"
          class="flex flex-column py-3 gap-4"
        >
          <div class="flex align-content-center justify-content-between">
            <div class="flex align-content-center align-items-center">
              <div class="font-bold">
                {{ item.vendorCode }}
              </div>
              <i
                v-if="item.original"
                v-tooltip="'Оригинал'"
                class="pi pi-check-circle text-primary-600 ml-2"
              />
            </div>
            <div>
              <Button
                label="Добавить в заказ"
                icon="pi pi-cart-plus"
              />
            </div>
          </div>
          <div class="flex align-content-center justify-content-between text-xs">
            <div class="flex flex-wrap gap-2">
              <Chip :label="`Производитель: ${item.manufacturer.name}`" />
              <Chip
                v-if="item.aliases"
                :label="`Псевдоним: ${item.aliases}`"
              />
              <Chip :label="`На складе: ${item.stock}`" />
            </div>
            <div class="flex gap-2">
              <Tag
                v-for="price in item.prices"
                :key="price.id"
                v-tooltip="date(price.validAt)"
                :value="price.price * 2"
                icon="pi pi-euro"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>