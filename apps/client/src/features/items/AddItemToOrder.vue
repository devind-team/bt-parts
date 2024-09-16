<script setup lang="ts">
import {type AddNewProductInput, useAddNewProductToOrderMutation } from '@repo/queries/composables/graphql.js'
const visible = ref(false)
//const { t } = useI18n()
const { mutate } = useAddNewProductToOrderMutation()


const product: AddNewProductInput = {
  vendorCode: 'пробныйКод',
  manufacturer: 'OlegOlegovich',
  }
  const quantity = 1
const addNewProductToOrder = async () => {
    const res = await mutate( {product, quantity} )
    console.log(res)
   }
</script>

<template>
  <div>
    <Button
    
      label="Добавить деталь"
      @click="visible=true"
    />
  </div>
  
  <Dialog
    v-model:visible="visible"
    modal
    header="Edit Profile"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
    <div class="flex items-center gap-4 mb-4">
      <label
        for="username"
        class="font-semibold w-24"
      >Username</label>
      <InputText
        id="username"
        class="flex-auto"
        autocomplete="off"
      />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label
        for="email"
        class="font-semibold w-24"
      >Email</label>
      <InputText
        id="email"
        class="flex-auto"
        autocomplete="off"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="visible = false"
      />
      <Button
        type="button"
        label="Save"
        @click="addNewProductToOrder"
      />
    </div>
  </Dialog>
</template>