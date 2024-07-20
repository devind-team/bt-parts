<script setup lang="ts">
import AppBar from '@/widgets/common/ui/AppBar.vue'
import AppFooter from '@/widgets/common/ui/AppFooter.vue'
</script>

<template>
  <div>
    <AppBar />
    <slot />
    <AppFooter />
  </div>
</template>
