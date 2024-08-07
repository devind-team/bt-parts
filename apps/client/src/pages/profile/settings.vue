<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('profile.settings') })
</script>

<template>
  <Card>
    <template #title>
      {{ $t('profile.settings') }}
    </template>
    <template #content>
      Для смены пароля обратитесь к администратору.
    </template>
  </Card>
</template>