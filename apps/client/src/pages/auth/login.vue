<script setup lang="ts">
import LoginWidget from '@/widgets/auth/ui/LoginWidget.vue'
const { t } = useI18n()

definePageMeta({ middleware: 'guest' })

useHead({ title: t('auth.authorization') })
</script>
<template>
  <LoginWidget />
</template>
