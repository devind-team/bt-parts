<script setup lang="ts">
import { useChangeQuantityItemMutation, useDeleteOrderItemsMutation, type Item } from '@repo/queries/composables/graphql.js'

const { t } = useI18n()
const props = defineProps<{
  items: Item[],
  orderId: string,
  refetch: () => void
}>()


const { mutate } = useChangeQuantityItemMutation()
const { mutate: deleteMutate, onDone } = useDeleteOrderItemsMutation()

const toast = useToast();
const confirm = useConfirm();

const increaseQuantity = (item: Item) => {
  mutate({
    itemId: item.id,
    quantity: item.quantity + 1 
  })
}

const decreaseQuantity = (item: Item) => {
  if (item.quantity > 1) {
    mutate({
      itemId: item.id,
      quantity: item.quantity - 1 
    })
  } else {
    confirmDeletion(item)
  }
}
const confirmDeletion = (item: Item) => {
  confirm.require({
        message: t('delete.confirm'),
        header: t('delete.item'),
        icon: 'pi pi-info-circle',
        rejectLabel: t('cancel'),
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: t('delete.delete'),
            severity: 'danger'
        },
        accept: () => {
          deleteMutate({
          orderId: props.orderId,
          where: {
            id: {
              in: [item.id],
            },
          }
          })
          toast.add({ severity: 'success', summary: t('delete.success'), life: 3000 });
          confirm.close()
        },
        reject: () => {
          confirm.close()
        }
    });
}
onDone(async ({ data }) => {
  if (data) {
    await props.refetch()
  }
});
const deleteItem = (item: Item) => {
    confirmDeletion(item)
}
</script>

<template>
  <Toast />
  <ConfirmDialog />
  <DataTable :value="items">
    <Column :header="t('products.part')">
      <template #body="{ data }">
        {{ data.product.vendorCode }}
      </template>
    </Column>
    <Column :header="t('products.quantity')">
      <template #body="{ data }">
        <div class="flex items-center gap-3">
          <button
            icon="pi pi-minus"
            class=""
            @click="decreaseQuantity(data)"
          >
            -
          </button>
          <span class="">{{ data.quantity }}</span>
          <button
            icon="pi pi-plus"
            class="btn btn-sm"
            @click="increaseQuantity(data)"
          >
            +
          </button>
        </div>
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
    <Column>
      <template #body="{ data }">
        <Button
          severity="danger"
          icon=" pi pi-trash"
          @click="deleteItem(data)"
        />
      </template>
    </Column>
  </DataTable>
</template>
