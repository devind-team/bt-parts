<script setup lang="ts">
import { ref } from 'vue';
import { type AddNewProductInput, useAddNewProductToOrderMutation } from '@repo/queries/composables/graphql.js';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

const visible = ref(false);
const { mutate, onDone } = useAddNewProductToOrderMutation();

const toast = useToast();
const { t } = useI18n();

const product = ref<AddNewProductInput>({
  vendorCode: '',
  manufacturer: '',
});
const quantity = ref<number>(1);

const addNewProductToOrder = async () => {
  await mutate({ product: product.value, quantity: quantity.value });
  visible.value = false;
};

onDone(() => {
  toast.add({ severity: 'success', summary: t('success'), detail: t('orders.added', { vendorCode: product.value?.vendorCode }), life: 3000 });
});
</script>

<template>
  <div>
    <Button
      :label="t('products.add')"
      @click="visible = true"
    />
  </div>

  <Dialog
    v-model:visible="visible"
    modal
    :header="t('products.add')"
    :style="{ width: '30rem' }"
  >
    <div class="grid gap-3 p-fluid">
      <div class="col-12">
        <label
          for="vendorCode"
          class="block mb-2 font-semibold"
        >{{ t('products.part') }}</label>
        <InputText
          id="vendorCode"
          v-model="product.vendorCode"
          :placeholder="t('products.search')"
          autocomplete="off"
          class="w-full mb-0"
        />
      </div>

      <div class="col-12">
        <label
          for="manufacturer"
          class="block mb-1 font-semibold"
        >{{ t('products.manufacturer') }}</label>
        <InputText
          id="manufacturer"
          v-model="product.manufacturer"
          :placeholder="t('products.manufacturer')"
          autocomplete="off"
          class="w-full"
        />
      </div>

      <div class="col-12">
        <label
          for="quantity"
          class="block mb-1 font-semibold"
        >{{ t('products.quantity') }}</label>
        <InputNumber
          id="quantity"
          v-model="quantity"
          :placeholder="t('products.quantity')"
          :min="1"
          class="w-full"
        />
      </div>

      <div class="col-12 flex justify-content-end gap-2 mt-2">
        <Button
          type="button"
          :label="t('cancel')"
          severity="secondary"
          class="p-button-outlined"
          @click="visible = false"
        />
        <Button
          type="button"
          :label="t('products.add')"
          class="p-button-primary"
          @click="addNewProductToOrder"
        />
      </div>
    </div>
  </Dialog>
</template>
