<script setup lang="ts">
import type { Item, OrderQuery, OrderQueryVariables, OrderStatus } from '@repo/queries/composables/graphql.js'
import { useAddStatusOrderMutation, useRecountPricesMutation } from '@repo/queries/composables/graphql.js'
import ItemsDataView from '@/entities/items/ui/ItemsDataView.vue'
import orderQuery from '@repo/queries/graphql/orders/queries/order.graphql'

const { dateTimeHM } = useFilters()
const { t } = useI18n()
const authStore = useAuthStore()

const props = defineProps<{
  orderId: string
  
}>()
const { mutate } = useAddStatusOrderMutation()
const { mutate: recountPricesMutate } = useRecountPricesMutation()
const { data: order, loading, refetch  } = useCommonQuery<OrderQuery, OrderQueryVariables>({
  document: orderQuery,
  variables: {
    orderId: props.orderId
  }
})
const statusEdit = async (newStatus: OrderStatus) => {
  const orderId = props.orderId 
  const status = newStatus
  await mutate({ orderId, status })
  await refetch()
}
const recountPrices = async () => {
  const orderId = props.orderId 
  const itemIds = order.value?.items?.map(item => item.id) || []
  await recountPricesMutate({ orderId, itemIds })
  await refetch()
}


const isCreatedStatus = computed(() => {
  return order.value?.statuses?.length === 1 && order.value.statuses[0].status === 'CREATED'
})
const isRequestStatus = computed(() => {
  return order.value?.statuses?.length === 2 && order.value.statuses[1].status === 'REQUEST'
})
const isAdoptedStatus = computed(() => {
  return order.value?.statuses?.length === 3 && order.value.statuses[2].status === 'ADOPTED'
})
const isPricedStatus = computed(() => {
  return order.value?.statuses?.length === 4 && order.value.statuses[3].status === 'PRICED'
})
</script>

<template>
  <div>
    <ProgressSpinner v-if="loading" />
    <div
      v-else
      class="flex flex-column gap-2"
    >
      <div class="flex flex-wrap">
        <div class="flex flex-wrap gap-2">
          <Tag
            v-for="status in order!.statuses"
            :key="status.id"
            v-tooltip="dateTimeHM(status.createdAt)"
            :value="t(`orderStatuses.${status.status}`)"
          />
        </div>
      </div>
      <items-data-view
        :is-adopted-status="isAdoptedStatus"
        :is-priced-status="isPricedStatus"
        :items="(order!.items || []) as Item[]"
        :order-id="order!.id"
        :refetch="refetch"
      />
      <div v-if="isCreatedStatus">
        <Button
          label="Отправить на проценку"
          @click="statusEdit('REQUEST')"
        />
      </div>
      <div v-if="authStore.userRole == 'ADMIN'">
        <div
          v-if="isRequestStatus"
        >
          <Button
            label="Принять"
            @click="statusEdit('ADOPTED')"
          />
        </div>
        <div
          v-if="isAdoptedStatus"
        >
          <Button
            label="Проценить"
            @click="recountPrices"
          />
          <Button
            class="ml-2 gap-2"
            label="Утвердить цены"
            @click="statusEdit('PRICED')"
          />
        </div>
      </div>
    </div>
  </div>
</template>