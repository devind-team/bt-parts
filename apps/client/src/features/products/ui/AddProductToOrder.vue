<script setup lang="ts">
import type { Product } from '@repo/queries/composables/graphql.js'
import * as z from 'zod'

const product = defineModel<Product | null>()

const visible = computed({
  get() {
    return !!product.value
  },
  set() {
    product.value = null
  }
})

const { defineField, handleSubmit, errors } = useForm({
  initialValues: { quantity: 1 },
  validationSchema: toTypedSchema(z.object({
    quantity: z.number().positive(),
  })),
})

const [quantity] = defineField('quantity')

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  visible.value = false
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