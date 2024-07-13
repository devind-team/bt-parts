<script setup lang="ts">
import AppBar from '@/widgets/common/ui/AppBar.vue'

// For info: https://github.com/vuetifyjs/vuetify/issues/15202
const styles = "--v-layout-left:0px;--v-layout-right:0px;--v-layout-top:64px;--v-layout-bottom:0px;transition:none !important;" 
</script>

<template>
  <v-app>
    <app-bar />
    <v-main :style="styles">
      <slot />
    </v-main>
  </v-app>
</template>
