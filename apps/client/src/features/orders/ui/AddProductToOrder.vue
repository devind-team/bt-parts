<script setup lang="ts">
import { type FormActions } from 'vee-validate'
import { type Product as ProductType, type AddProductInput, useAddProductToOrderMutation } from '@repo/queries/composables/graphql.js'
import * as z from 'zod'
import { useToast } from 'primevue/usetoast'

const product = defineModel<ProductType | null>()

const toast = useToast()
const { t } = useI18n()

const visible = computed({
  get() {
    return !!product.value
  },
  set() {
    product.value = null
  }
})

const { mutate, onDone } = useAddProductToOrderMutation()

onDone(() => {
  toast.add({ severity: 'success', summary: t('success'), detail: t('orders.added', { vendorCode: product.value?.vendorCode }), life: 3000 })
  visible.value = false
  quantity.value = 1
})

const { defineField, handleSubmit, errors } = useForm<AddProductInput>({
  initialValues: { quantity: 1 },
  validationSchema: toTypedSchema(z.object({
    quantity: z.number().positive(),
  })),
})

const [quantity] = defineField('quantity')

const onSubmit = handleSubmit(async (values: AddProductInput, { setErrors }: FormActions<AddProductInput>) => {
  try {
    await mutate({ product: { productId: product.value!.id, quantity: values.quantity } })
  } catch (e) {
    setErrors({ quantity: 'Ошибка добавления в корзину' })
  }
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :header="`${$t('products.part')} ${product?.vendorCode}`"
    :style="{ width: '50rem' }"
    modal
  >
    <form @submit="onSubmit">
      <div class="field">
        <label
          for="quantity"
          class="block text-900 font-medium mb-2"
        >
          {{ $t('products.quantity') }}
        </label>
        <client-only>
          <InputNumber
            id="quantity"
            v-model="quantity"
            aria-describedby="username-help"
            class="w-full mb-3"
            :invalid="!!errors.quantity"
          />
        </client-only>
        <small
          id="quantity-help"
          class="p-error"
        >
          {{ errors.quantity }}
        </small>
      </div>
      <div class="flex justify-end">
        <Button
          :label="$t('products.add')"
          type="submit"
        />
      </div>
    </form>
  </Dialog>
</template>