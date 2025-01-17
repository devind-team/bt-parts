<script setup lang="ts">
import type { Item, OrderQuery, OrderQueryVariables, OrderStatus } from '@repo/queries/composables/graphql.js'
import { useAddStatusOrderMutation, useRecountPricesMutation, useUnloadOrderForAppraiseMutation } from '@repo/queries/composables/graphql.js'
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
const { mutate: unloadOrderMutate } = useUnloadOrderForAppraiseMutation()
const { data: order, loading, refetch } = useCommonQuery<OrderQuery, OrderQueryVariables>({
  document: orderQuery,
  variables: {
    orderId: props.orderId
  }
})
const unloadOrder = async () => {
  const orderId = props.orderId
  const data  = await unloadOrderMutate({ orderId })
  console.log(data)
  const newFile = data?.data?.unloadOrderForAppraise.newFile
  const serverUrl = data?.data?.unloadOrderForAppraise.serverUrl
  const url = new URL(`${newFile?.bucket}/${newFile?.key}`, serverUrl)
  window.location.href = url.href
}
const uploadOrderPrices = async () =>{
  
}
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

const currentStatus = computed(() => {
  if (!order.value?.statuses || order.value.statuses.length === 0) {
    return null
  }
  const lastStatus = order.value.statuses[order.value.statuses.length - 1]
  return String(lastStatus.status)
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
        :current-status="currentStatus"
        :items="(order!.items || []) as Item[]"
        :order-id="order!.id"
        :refetch="refetch"
      />
      <div v-if="currentStatus == 'CREATED'">
        <Button
          :label="t('order.SendForPercentage')"
          @click="statusEdit('REQUEST')"
        />
      </div>
      <div v-if="authStore.hasPermission('order_manipulation')">
        <div
          v-if="currentStatus == 'REQUEST'"
        >
          <Button
            :label="t('order.Accept')"
            @click="statusEdit('ADOPTED')"
          />
        </div>
      </div>
      <div v-if="authStore.hasPermission('appraise')">
        <div
          v-if="currentStatus == 'ADOPTED'"
          class="flex gap-2"
        >
          <Button
            :label="t('order.RecountPrices')"
            @click="recountPrices"
          />
          <Button
            class="gap-2"
            :label="t('orders.unload')"
            @click="unloadOrder"
          />
          <div class="ml-auto">
            <Button
              class="gap-2"
              :label="t('orders.priceUpload')"
              @click="uploadOrderPrices"
            />
            <Button
              v-if="authStore.hasPermission('change_status')"
              class="gap-2"
              :label="t('order.ApprovePrices')"
              @click="statusEdit('PRICED')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
