<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('profile.security') })
</script>

<template>
  <Card>
    <template #title>
      {{ t('profile.security') }}
    </template>
    <template #content>
      Для смены пароля обратитесь к администратору.
    </template>
  </Card>
</template>