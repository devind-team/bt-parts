<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('title') })
</script>

<template>
  <v-container>
    <div>Hello, world! <v-btn>Hello</v-btn></div>
  </v-container>
</template>
