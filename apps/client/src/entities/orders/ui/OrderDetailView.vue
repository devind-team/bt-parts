<script setup lang="ts">
import type { Item, OrderQuery, OrderQueryVariables } from '@repo/queries/composables/graphql.js'
import ItemsDataView from '@/entities/items/ui/ItemsDataView.vue'
import orderQuery from '@repo/queries/graphql/orders/queries/order.graphql'

const { dateTimeHM } = useFilters()
const { t } = useI18n()

const props = defineProps<{
  orderId: String
}>()

const { data: order, loading, refetch  } = useCommonQuery<OrderQuery, OrderQueryVariables>({
  document: orderQuery,
  variables: {
    orderId: props.orderId
  }
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
        :items="(order!.items || []) as Item[]"
        :order-id="order!.id"
        :refetch="refetch"
      />
    </div>
  </div>
</template>