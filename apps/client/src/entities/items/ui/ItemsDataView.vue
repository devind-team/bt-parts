<script setup lang="ts">
import { useChangeQuantityItemMutation, useChangeSellingPriceItemMutation, useDeleteOrderItemsMutation, type Item } from '@repo/queries/composables/graphql.js'
const { t } = useI18n()
const { date } = useFilters()
const props = defineProps<{
  currentStatus: string | null,
  items: Item[],
  orderId: string,
  refetch: () => void
}>()
const authStore = useAuthStore()

const { mutate } = useChangeQuantityItemMutation()
const { mutate: deleteMutate, onDone } = useDeleteOrderItemsMutation()
const { mutate: changeSellingPriceMutate, onDone: changeSellingPriceDone} = useChangeSellingPriceItemMutation();

const toast = useToast();
const confirm = useConfirm();
const inputValues = ref<Record<string, string>>({})

onMounted(() => {
  props.items.forEach((item) => {
    inputValues.value[item.id] = String(item.salePrice || 0);
  });
});

const onPriceBlur = (item: Item) => {
  const newPrice = Number(inputValues.value[item.id]);
  if(newPrice > 0){
    if ((newPrice != item.salePrice)) {
      changeSellingPriceMutate({
        itemId: item.id,
        price: newPrice
      })
  }}else{
    toast.add({ severity: 'error', summary: t('price.invalid'), life: 3000 });
    inputValues.value[item.id] = String(item.salePrice)
  }
}
changeSellingPriceDone(() =>{
  toast.add({ severity: 'success', summary: t('price.changeSuccess'), life: 3000 });
})
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
      v-if="authStore.userRole == 'ADMIN'"
      :header="t('purchasePrices.name')"
      field="price"
    >
      <template #body="{ data }">
        <div>
          <span v-if="data.price">
            <div class="flex gap-2">
              <Tag
                v-tooltip="date(data.price.validAt)"
                :value="data.price.price * 1"
                icon="pi pi-euro"
              />
            </div>
          </span>
          <span v-else>
            {{ t('prices.none') }}
          </span>
        </div>
      </template>
    </Column>
    <Column
      v-if="authStore.userRole == 'ADMIN' && currentStatus =='ADOPTED'"
      :header="t('pricesSells.name')"
    >
      <template #body="{ data }">
        <div>
          <span>
            <div class="flex gap-2">
              <InputText
                v-model="inputValues[data.id]"
                type="string"
                placeholder="Enter sale price"
                class="input input-sm"
                @blur="onPriceBlur(data)"
              >
                <Tag
                  icon="pi pi-euro"
                />
              </inputtext></div>
          </span>
        </div>
      </template>
    </Column>
    <Column
      v-else
      :header="t('prices.name')"
    >
      <template #body="{ data }">
        <div>
          <span v-if="currentStatus == 'PRICED'">
            <div class="flex gap-2">
              <Tag
                :value="data.salePrice * 1"
                icon="pi pi-euro"
              />
            </div>
          </span>
          <span v-else>
            {{ t('prices.none') }}
          </span>
        </div>
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
