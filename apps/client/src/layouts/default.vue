<script setup lang="ts">
import App from '@/widgets/common/ui/App.vue'
import AppMain from '~/widgets/common/ui/AppMain.vue'
import AppToolBar from '~/widgets/common/ui/AppToolBar.vue'
import AppFooter from '@/widgets/common/ui/AppFooter.vue'
</script>

<template>
  <app>
    <app-tool-bar />
    <app-main>
      <slot />
    </app-main>
    <app-footer />
  </app>
</template>
