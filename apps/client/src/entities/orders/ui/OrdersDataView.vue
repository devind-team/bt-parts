<script setup lang="ts">
import ordersQuery from '@repo/queries/graphql/orders/queries/orders.graphql'
const { dateTimeHM } = useFilters()
const localePath = useLocalePath()
const { t } = useI18n()
const { data: orders, loading } = useQueryRelay({
  document: ordersQuery,
})
</script>

<template>
  <DataTable
    :value="orders"
    :loading="loading"
  >
    <Column
      :header="t('orders.name')"
      field="createdAt"
    >
      <template #body="{ data }">
        <nuxt-link :to="localePath({ name: 'orders-view-orderId', params: { orderId: data.id } })">
          {{ t('orders.from', { dateTime: dateTimeHM(data.createdAt) }) }}
        </nuxt-link>
      </template>
    </Column>
    <Column
      :header="t('status')"
      field="statuses"
    >
      <template #body="{ data }">
        <div class="flex flex-wrap gap-2">
          <Tag
            v-for="status in data.statuses"
            :key="status.id"
            v-tooltip="dateTimeHM(status.createdAt)"
            :value="t(`orderStatuses.${status.status}`)"
          />
        </div>
      </template>
    </Column>
    <Column
      :header="t('users.name')"
      field="user"
    >
      <template #body="{ data }">
        {{ `${data.user.lastName} ${data.user.firstName} ${data.user.patronymic}` }}
      </template>
    </Column>
  </DataTable>
</template>