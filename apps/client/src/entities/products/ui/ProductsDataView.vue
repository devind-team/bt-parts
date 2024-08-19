<script setup lang="ts">
import type { Product } from '@repo/queries/composables/graphql.js'
import DataView from 'primevue/dataview'
import AddProductToOrder from '@/features/orders/ui/AddProductToOrder.vue'

const authStore = useAuthStore()
const localePath = useLocalePath()

const { date } = useFilters()

const selectProduct = ref<Product>()

const props = defineProps<{
  products: Product[]
}>()

</script>
<template>
  <DataView :value="props.products">
    <template #list="{ items }">
      <AddProductToOrder v-model="selectProduct" />
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
                v-tooltip="$t('products.original')"
                class="pi pi-check-circle text-primary-600 ml-2"
              />
            </div>
            <div>
              <Button
                v-if="authStore.loginIn"
                @click="selectProduct = item"
              >
                {{ $t('products.add') }}
              </Button>
              <nuxt-link
                v-else
                :to="localePath({ name: 'auth-login' })"
              >
                {{ $t('products.doOrder') }}
              </nuxt-link>
            </div>
          </div>
          <div class="flex align-content-center justify-content-between text-xs">
            <div class="flex flex-wrap gap-2">
              <Chip :label="`${$t('products.manufacturer')}: ${item.manufacturer.name}`" />
              <Chip
                v-if="item.aliases"
                :label="`${$t('products.aliases')}: ${item.aliases}`"
              />
              <Chip :label="`${$t('products.inStock')}: ${item.stock}`" />
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