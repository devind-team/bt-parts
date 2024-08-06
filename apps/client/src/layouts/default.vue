<script setup lang="ts">
import PvApp from '@/widgets/common/ui/PvApp.vue'
import PvAppMain from '@/widgets/common/ui/PvAppMain.vue'
import PvAppToolBar from '@/widgets/common/ui/PvAppToolBar.vue'
import PvAppFooter from '@/widgets/common/ui/PvAppFooter.vue'
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
