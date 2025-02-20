<script setup lang="ts">
import { type GetItemPricesQueryVariables, useChangeQuantityItemMutation, useChangeSellingPriceItemMutation, useDeleteOrderItemsMutation, type Item } from '@repo/queries/composables/graphql.js'
import getItemPricesQuery from '@repo/queries/graphql/prices/queries/get-item-prices.graphql'
const { t } = useI18n();
const { date } = useFilters();

// Интерфейс для цены
interface Price {
  id: string;
  price: string;
  duration: number;
  createdAt: string;
  validAt: string;
  supplier?: {
    id: string;
    name?: string;
    location?: string;
  };
  site?: string | null;
  comment?: string | null;
  __typename?: string;
}


type GetItemPricesQuery = Price[];
const expandedRows = ref<Record<string, boolean>>({});

const expandAll = () => {
  expandedRows.value = props.items.reduce((acc, item) => {
    acc[item.id] = true;
    return acc;
  }, {} as Record<string, boolean>);
};

const collapseAll = () => {
  expandedRows.value = {};
};

const onRowExpand = (event: { data: Item }) => {
  toast.add({ 
    severity: 'info', 
    summary: t('prices.expanded'), 
    detail: event.data.product.vendorCode, 
    life: 3000 
  });
};

const onRowCollapse = (event: { data: Item }) => {
  toast.add({ 
    severity: 'success', 
    summary: t('prices.collapsed'), 
    detail: event.data.product.vendorCode, 
    life: 3000 
  });
};

// Храним цены закупки для каждого товара
const itemPrices = ref<Record<string, Price[]>>({});

// Загружаем цены для каждого товара в заказе
const loadPrices = (productId: string, itemId: string) => {
  const { data: prices, loading, error } = useQueryRelay<GetItemPricesQuery, GetItemPricesQueryVariables>({
    document: getItemPricesQuery,
    variables: () => ({
    productId: productId
  })
  })
  watchEffect(() => {
    if (prices.value) {
      console.log('Prices response:', prices.value);
      // Так как prices.value уже массив Price[], просто присваиваем его
      itemPrices.value[itemId] = prices.value;
    }
    if (error.value) {
      console.error('GraphQL Error:', error.value);
      itemPrices.value[itemId] = [];
    }
    if (!loading.value && !prices.value && !error.value) {
      console.warn(`No prices data for item ${itemId}`);
      itemPrices.value[itemId] = [];
    }
  });
};

// Вызываем загрузку цен при монтировании
onMounted(() => {
  props.items.forEach((item) => {
    loadPrices(item.product.id, item.id)
  })
})

// Храним выбранную цену
const selectedPrice = ref<Record<string, string>>({})


// Определение пропсов компонента
const props = defineProps<{
  currentStatus: string | null,
  items: Item[],
  orderId: string,
  refetch: () => void
}>();
console.log(props.items)
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
  <DataTable
    v-model:expandedRows="expandedRows" 
    :value="items"
    data-key="id"
    @row-expand="onRowExpand" 
    @row-collapse="onRowCollapse"
  >
    <!-- Добавляем кнопку управления в заголовок -->
    <template #header>
      <div class="flex flex-wrap justify-end gap-2">
        <Button
          text
          icon="pi pi-plus"
          :label="t('expandAll')"
          @click="expandAll"
        />
        <Button
          text
          icon="pi pi-minus"
          :label="t('collapseAll')"
          @click="collapseAll"
        />
      </div>
    </template>

    <!-- Добавляем колонку-расширитель -->
    <Column
      expander
      style="width: 5rem"
    />
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
    <template #expansion="{ data }">
      <div class="p-4">
        <h5>{{ t('purchasePrices.for') }} {{ data.product.vendorCode }}</h5>
        <DataTable :value="itemPrices[data.id] || []">
          <Column
            field="price"
            :header="t('purchasePrices.price')"
          >
            <template #body="slotProps">
              {{ (Number(slotProps.data.price)) }}
            </template>
          </Column>
          <Column
            field="duration"
            :header="t('purchasePrices.duration')"
          >
            <template #body="slotProps">
              {{ slotProps.data.duration }} {{ t('days') }}
            </template>
          </Column>
          <Column
            field="supplier.name"
            :header="t('purchasePrices.supplier')"
          />
          <Column
            field="validAt"
            :header="t('purchasePrices.validAt')"
          >
            <template #body="slotProps">
              {{ date(slotProps.data.validAt) }}
            </template>
          </Column>
          <Column
            field="createdAt"
            :header="t('purchasePrices.createdAt')"
          >
            <template #body="slotProps">
              {{ date(slotProps.data.createdAt) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
    
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