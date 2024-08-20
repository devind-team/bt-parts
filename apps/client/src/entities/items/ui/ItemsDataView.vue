<script setup lang="ts">
import type { Item } from '@repo/queries/composables/graphql.js'

const { t } = useI18n()
const props = defineProps<{
  items: Item[]
}>()
</script>
<template>
  <DataTable :value="props.items">
    <Column :header="t('products.part')">
      <template #body="{ data }">
        {{ data.product.vendorCode }}
      </template>
    </Column>
    <Column :header="t('products.quantity')">
      <template #body="{ data }">
        {{ data.quantity }}
      </template>
    </Column>
    <Column :header="t('status')">
      <template #body="{ data }">
        <div class="flex flex-wrap gap-2">
          <Tag
            v-for="status in data.statuses"
            :key="status.id"
            :value="t(`itemStatuses.${status.status}`)"
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
    <Column
      :header="t('prices.name')"
      field="price"
    >
      <template #body>
        {{ t('prices.none') }}
      </template>
    </Column>
  </DataTable>
</template>