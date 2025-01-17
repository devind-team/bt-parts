<script setup lang="ts">
import { useChangeQuantityItemMutation, useChangeSellingPriceItemMutation, useDeleteOrderItemsMutation, type Item } from '@repo/queries/composables/graphql.js'
const { t } = useI18n();
const { date } = useFilters();

// Определение пропсов компонента
const props = defineProps<{
  currentStatus: string | null,
  items: Item[],
  orderId: string,
  refetch: () => void
}>();

// Использование хранилища авторизации
const authStore = useAuthStore();
console.log (props.items)

// Мутации для изменения количества, удаления и изменения цены продажи
const { mutate } = useChangeQuantityItemMutation();
const { mutate: deleteMutate, onDone } = useDeleteOrderItemsMutation();
const { mutate: changeSellingPriceMutate, onDone: changeSellingPriceDone } = useChangeSellingPriceItemMutation();

// Использование уведомлений и подтверждений
const toast = useToast();
const confirm = useConfirm();

// Объект для хранения значений полей ввода
const inputValues = ref<Record<string, string>>({});

// Заполнение начальных значений при монтировании компонента
onMounted(() => {
  props.items.forEach((item) => {
    inputValues.value[item.id] = String(item.salePrice || 0);
  });
});

// Обработчик потери фокуса поля ввода цены
const onPriceBlur = (item: Item) => {
  const newPrice = Number(inputValues.value[item.id]);
  if (newPrice > 0) {
    if (newPrice != item.salePrice) {
      changeSellingPriceMutate({
        itemId: item.id,
        price: newPrice
      });
    }
  } else {
    toast.add({ severity: 'error', summary: t('price.invalid'), life: 3000 });
    inputValues.value[item.id] = String(item.salePrice);
  }
};

// Уведомление об успешном изменении цены
changeSellingPriceDone(() => {
  toast.add({ severity: 'success', summary: t('prices.changeSuccess'), life: 3000 });
});

// Увеличение количества товара
const increaseQuantity = (item: Item) => {
  mutate({
    itemId: item.id,
    quantity: item.quantity + 1
  });
};

// Уменьшение количества товара или запрос на удаление
const decreaseQuantity = (item: Item) => {
  if (item.quantity > 1) {
    mutate({
      itemId: item.id,
      quantity: item.quantity - 1
    });
  } else {
    confirmDeletion(item);
  }
};

// Подтверждение удаления товара
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
      label: 'Delete',
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
      });
      toast.add({ severity: 'success', summary: t('delete.success'), life: 3000 });
      confirm.close();
    },
    reject: () => {
      confirm.close();
    }
  });
};

// Обработка завершения операции удаления
onDone(async ({ data }) => {
  if (data) {
    await props.refetch();
  }
});

// Удаление товара
const deleteItem = (item: Item) => {
  confirmDeletion(item);
};
</script>
<template>
  <Toast />
  <ConfirmDialog />
  
  <!-- Таблица данных с продуктами -->
  <DataTable :value="items">
    <!-- Столбец с артикулом -->
    <Column :header="t('products.part')">
      <template #body="{ data }">
        {{ data.product.vendorCode }}
      </template>
    </Column>
    
    <!-- Столбец с брендом -->
    <Column :header="t('products.brand')">
      <template #body="{ data }">
        <div class="flex flex-wrap gap-2">
          {{ data.product.manufacturer.name }}
        </div>
      </template>
    </Column>
    
    <!-- Столбец с количеством -->
    <Column :header="t('products.quantity')">
      <template #body="{ data }">
        <div class="flex items-center gap-3">
          <button
            v-if="authStore.hasPermission('edit_quantity')"
            icon="pi pi-minus"
            class=""
            @click="decreaseQuantity(data)"
          >
            -
          </button>
          <span class="">{{ data.quantity }}</span>
          <button
            v-if="authStore.hasPermission('edit_quantity')"
            icon="pi pi-plus"
            class="btn btn-sm"
            @click="increaseQuantity(data)"
          >
            +
          </button>
        </div>
      </template>
    </Column>
    
    <!-- Столбец со статусом -->
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
    
    <!-- Столбец с именем пользователя, если есть соответствующее разрешение -->
    <Column
      v-if="authStore.hasPermission('view_name')"
      :header="t('users.name')"
      field="user"
    >
      <template #body="{ data }">
        {{ `${data.user.lastName} ${data.user.firstName} ${data.user.patronymic}` }}
      </template>
    </Column>
    
    <!-- Столбец с псевдонимом пользователя, если есть соответствующее разрешение -->
    <Column
      v-if="authStore.hasPermission('view_psevdonim')"
      :header="t('users.name')"
      field="user"
    >
      <template #body="{ data }">
        {{ `${data.user.firstName}` }}
      </template>
    </Column>
    
    <!-- Столбец с ценой покупки, если есть соответствующее разрешение -->
    <Column
      v-if="authStore.hasPermission('appraise')"
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
    
    <!-- Столбец с ценой продажи, если есть соответствующее разрешение и текущий статус "ADOPTED" -->
    <Column
      v-if="authStore.hasPermission('order_manipulation') && currentStatus == 'ADOPTED'"
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
                <Tag icon="pi pi-euro" />
              </InputText>
            </div>
          </span>
        </div>
      </template>
    </Column>
    
    <!-- Столбец с текущей ценой продажи -->
    <Column
      v-else-if="authStore.hasPermission('view_price')"
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
    
    <!-- Столбец с кнопкой удаления -->
    <Column
      v-if="authStore.hasPermission('can_delete_item')"
    >
      <template #body="{ data }">
        <Button
          severity="danger"
          icon="pi pi-trash"
          @click="deleteItem(data)"
        />
      </template>
    </Column>
  </DataTable>
</template>