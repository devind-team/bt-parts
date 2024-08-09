<script setup lang="ts">
import PvApp from '@/widgets/layout/ui/PvApp.vue'
import PvAppMain from '@/widgets/layout/ui/PvAppMain.vue'
import PvAppToolBar from '@/widgets/layout/ui/PvAppToolBar.vue'
import PvAppFooter from '@/widgets/layout/ui/PvAppFooter.vue'
</script>

<template>
  <pv-app>
    <pv-app-tool-bar />
    <pv-app-main>
      <slot />
    </pv-app-main>
    <pv-app-footer />
  </pv-app>
</template>
