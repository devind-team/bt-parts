<script setup lang="ts">
import RegisterWidget from '@/widgets/auth/ui/RegisterWidget.vue'

const { t } = useI18n()

definePageMeta({ middleware: 'guest' })
useHead({ title: t('auth.registration') })
</script>
<template>
  <RegisterWidget />
</template>
