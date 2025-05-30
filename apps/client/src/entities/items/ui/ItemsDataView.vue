<script setup lang="ts">
import { type GetItemsPricesQueryVariables, type GetItemsPricesQuery, useChangeItemProformaMutation, useChangeItemOrderedMutation, useChangeQuantityItemMutation, useAssignPriceToItemMutation, useChangeSellingPriceItemMutation, useDeleteOrderItemsMutation, type Item } from '@repo/queries/composables/graphql.js'
import getItemPricesQuery from '@repo/queries/graphql/prices/queries/get-item-prices.graphql'
import Checkbox from 'primevue/checkbox';
const { t } = useI18n();
const { date } = useFilters();

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

};

const onRowCollapse = (event: { data: Item }) => {

};
// Мутация для номера проформы
const { mutate: changeItemProformaMutate, onDone: changeItemProformaDone, onError: changeItemProformaError } = useChangeItemProformaMutation();

changeItemProformaDone(() => {
  toast.add({ severity: 'success', summary: t('proforma.updateSuccess'), life: 3000 });
  props.refetch();
});

changeItemProformaError((error) => {
  toast.add({ severity: 'error', summary: t('proforma.updateError'), detail: error.message, life: 3000 });
});

// Мутация для статуса "Заказано"
const { mutate: changeeItemOrderedMutate, onDone: changeItemOrderedDone, onError: changeItemOrderedError } = useChangeItemOrderedMutation();

changeItemOrderedDone(() => {
  toast.add({ severity: 'success', summary: t('ordered.updateSuccess'), life: 3000 });
  props.refetch();
});

changeItemOrderedError((error) => {
  toast.add({ severity: 'error', summary: t('ordered.updateError'), detail: error.message, life: 3000 });
});
interface Price {
  __typename?: string;
  id: string;
  price: string | number;
  duration?: number | null | undefined; 
  createdAt: string;
  validAt?: string | null;
  supplier?: {
    id: string;
    name: string;
    location: string;
  } | null;
  site?: string | null;
  comment?: string | null;
  productId: string;
}
const itemPrices = ref<Record<string, Price[]>>({});
// Храним цены закупки для каждого товара
const loadPrices = () => {
  console.log('loadPrices called');
  const productIds = props.items.map(item => item.product.id);
  const { onResult } = useQueryRelay<GetItemsPricesQuery, GetItemsPricesQueryVariables>({
    document: getItemPricesQuery,
    variables: () => ({ productIds }),
  });
  
  onResult((result) => {
    const pricesData = result.data;
    console.log('pricesData:', pricesData);
    if (pricesData) {
      let prices: Price[];
      if (Array.isArray(pricesData)) {
        prices = pricesData;
      } else if ('prices' in pricesData && pricesData.prices && pricesData.prices.edges) {
        prices = pricesData.prices.edges.map(edge => edge.node);
      } else {
        console.error('Неизвестная структура данных:', pricesData);
        return;
      }
      itemPrices.value = props.items.reduce((acc, item) => {
        acc[item.id] = prices.filter(price => price.productId === item.product.id);
        return acc;
      }, {} as Record<string, Price[]>);
  }
  });
};
// Определение пропсов компонента
const props = defineProps<{
  currentStatus: string | null,
  items: Item[],
  orderId: string,
  refetch: () => void
}>();
console.log(props.items)
const { mutate: assignPriceMutate, onDone: assignPriceDone, onError: assignError } = useAssignPriceToItemMutation();
assignPriceDone(() => {
  toast.add({ severity: 'success', summary: t('prices.assignSuccess'), life: 3000 });
});
// Обработка ошибок
assignError((error) => {
  toast.add({ severity: 'error', summary: t('prices.assignError'), detail: error.message, life: 3000 });
});

// Храним выбранную цену
const selectedPrices = ref<Record<string, string>>({});
// Обработчик выбора цены
const selectPrice = (itemId: string, priceId: string) => {
  if (selectedPrices.value[itemId] === priceId) {
    // Если цена уже выбрана, снимаем выбор
    delete selectedPrices.value[itemId];
    assignPriceMutate({
      itemId,
      priceId: null, // Снимаем привязку цены
    });
  } else {
    // Устанавливаем новую выбранную цену
    selectedPrices.value[itemId] = priceId;
    assignPriceMutate({
      itemId,
      priceId, // Привязываем выбранную цену
    });
  }
  console.log('Selected prices:', selectedPrices.value);
};

// Использование хранилища авторизации
const authStore = useAuthStore();
// Локальное состояние для номера проформы и статуса "Заказано"
const proformaNumbers = ref<Record<string, string>>({});
const orderedStatuses = ref<Record<string, boolean>>({});

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
    if (item.price) {
      selectedPrices.value[item.id] = item.price.id;
    }
    proformaNumbers.value[item.id] = item.proformaNumber || '';
    orderedStatuses.value[item.id] = item.ordered || false;
  });
  loadPrices();
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
// Обработчики для номера проформы и статуса "Заказано"
// Обработчик для номера проформы
const onProformaBlur = (itemId: string) => {
  const proformaNumber = proformaNumbers.value[itemId];
  if (proformaNumber && proformaNumber.length > 50) {
    toast.add({ severity: 'error', summary: t('proforma.invalid'), detail: t('proforma.tooLong'), life: 3000 });
    proformaNumbers.value[itemId] = ''; // Сбрасываем некорректное значение
    return;
  }
  changeItemProformaMutate({
    itemId,
    proformaNumber: proformaNumber || null,
  });
};

// Обработчик для статуса "Заказано"
const onOrderedChange = (itemId: string, isOrdered: boolean) => {
  orderedStatuses.value[itemId] = isOrdered;
  changeeItemOrderedMutate({
    itemId,
    ordered: isOrdered,
  });
};
</script>

<template>
  <Toast />
  <ConfirmDialog />
  
  <DataTable
    v-model:expandedRows="expandedRows"
    :value="items"
    data-key="id"
    @row-expand="onRowExpand"
    @row-collapse="onRowCollapse"
  >
    <template #header>
      <div 
        v-if="authStore.hasPermission('appraise')"
        class="flex flex-wrap justify-end gap-2"
      >
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

    <Column
      v-if="authStore.hasPermission('appraise')"
      expander
      style="width: 5rem"
    />
    <Column :header="t('products.part')">
      <template #body="{ data }">
        {{ data.product.vendorCode }}
      </template>
    </Column>
    <Column :header="t('products.brand')">
      <template #body="{ data }">
        <div class="flex flex-wrap gap-2">
          {{ data.product.manufacturer.name }}
        </div>
      </template>
    </Column>
    <Column :header="t('products.quantity')">
      <template #body="{ data }">
        <div
          v-if="authStore.hasPermission('edit_quantity') && currentStatus !== 'APPROVED'"
          class="flex items-center gap-3"
        >
          <button
            icon="pi pi-minus"
            @click="decreaseQuantity(data)"
          >
            -
          </button>
          <span>{{ data.quantity }}</span>
          <button
            icon="pi pi-plus"
            class="btn btn-sm"
            @click="increaseQuantity(data)"
          >
            +
          </button>
        </div>
        <span v-else>{{ data.quantity }}</span>
      </template>
    </Column>
    <Column
      v-if="authStore.hasPermission('purchase_control') && currentStatus === 'APPROVED'"
      :header="t('purchasePrices.supplier')"
    >
      <template #body="{ data }">
        {{ data.price?.supplier?.name }}
      </template>
    </Column>

    <Column
      v-if="authStore.hasPermission('view_price')"
      :header="t('purchasePrices.name')"
    >
      <template #body="{ data }">
        <div>
          <span v-if="data.price">{{ Number(data.price.price) }}</span>
          <span v-else>{{ t('prices.none') }}</span>
        </div>
      </template>
    </Column>

    <Column
      v-if="authStore.hasPermission('purchase_control') && currentStatus === 'APPROVED'"
      :header="t('purchasePrices.total')"
    >
      <template #body="{ data }">
        {{ data.price ? Number(data.price.price) * data.quantity : t('prices.none') }}
      </template>
    </Column>

    <Column
      v-if="authStore.hasPermission('purchase_control') && currentStatus === 'APPROVED'"
      :header="t('purchasePrices.duration')"
    >
      <template #body="{ data }">
        {{ data.price?.duration ? `${data.price.duration} ${t('days')}` : t('prices.none') }}
      </template>
    </Column>
    
    <Column
      v-if="authStore.hasPermission('purchase_control') && currentStatus === 'APPROVED'"
      :header="t('purchasePrices.proformaNumber')"
    >
      <template #body="{ data }">
        <InputText
          v-model="proformaNumbers[data.id]"
          placeholder="Enter proforma number"
          class="input input-sm"
          @blur="onProformaBlur(data.id)"
        />
      </template>
    </Column>
    <Column
      v-if="authStore.hasPermission('purchase_control') && currentStatus === 'APPROVED'"
      :header="t('purchasePrices.ordered')"
    >
      <template #body="{ data }">
        <Checkbox
          v-model="orderedStatuses[data.id]"
          :binary="true"
          @change="onOrderedChange(data.id, $event)"
        />
      </template>
    </Column>
    <Column
      v-if="currentStatus !== 'APPROVED'"
      :header="t('status')"
    >
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
      v-if="authStore.hasPermission('view_name')"
      :header="t('users.name')"
      field="user"
    >
      <template #body="{ data }">
        {{ `${data.user.lastName} ${data.user.firstName} ${data.user.patronymic}` }}
      </template>
    </Column>
    <Column
      v-if="authStore.hasPermission('view_psevdonim')"
      :header="t('users.name')"
      field="user"
    >
      <template #body="{ data }">
        {{ `${data.user.firstName}` }}
      </template>
    </Column>
    <template
      v-if="currentStatus !== 'APPROVED'"
      #expansion="{ data }"
    >
      <div class="p-4">
        <h5>{{ t('purchasePrices.for') }} {{ data.product.vendorCode }}</h5>
        <DataTable :value="itemPrices[data.id] || []">
          <Column
            field="price"
            :header="t('purchasePrices.price')"
          >
            <template #body="slotProps">
              {{ Number(slotProps.data.price) }}
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
          <Column
            v-if="authStore.hasPermission('view_price')"
            :header="t('purchasePrices.select')"
          >
            <template #body="slotProps">
              <Checkbox
                :model-value="selectedPrices[data.id] === slotProps.data.id"
                :binary="true"
                @change="selectPrice(data.id, slotProps.data.id)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
    <Column
      v-if="authStore.hasPermission('order_manipulation') && currentStatus === 'PRICED'"
      :header="t('pricesSells.name')"
    >
      <template #body="{ data }">
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
      </template>
    </Column>
    <Column
      v-else-if="authStore.hasPermission('view_price') && currentStatus !== 'APPROVED'"
      :header="t('prices.name')"
    >
      <template #body="{ data }">
        <div>
          <span v-if="currentStatus === 'PRICED' && data.salePrice">
            <div class="flex gap-2">
              <Tag
                :value="data.salePrice * 1"
                icon="pi pi-euro"
              />
            </div>
          </span>
          <span v-else>{{ t('prices.none') }}</span>
        </div>
      </template>
    </Column>
    <Column v-if="authStore.hasPermission('can_delete_item') && currentStatus !== 'APPROVED'">
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