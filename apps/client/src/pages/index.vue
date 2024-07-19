<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('title') })
</script>

<template>
  <div>
    <Button
      label="Hello, world"
      icon="pi pi-search"
      pt:root="bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2"
      pt:label="text-white font-bold text-lg"
      pt:icon="text-white text-xl"
    />
    <InputText label="Login" />
  </div>
</template>
