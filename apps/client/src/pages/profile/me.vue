<script setup lang="ts">
import Me from '~/widgets/profile/ui/Me.vue'
const { t } = useI18n()
useHead({ title: t('profile.name') })
</script>
<template>
  <me />
</template>
