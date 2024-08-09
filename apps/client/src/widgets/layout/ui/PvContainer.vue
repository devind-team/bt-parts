<script setup lang="ts">

const props = withDefaults(defineProps<{ fluid?: boolean }>(), {
  fluid: false
})
</script>

<template>
  <div
    v-bind="$attrs"
    class="pv-container"
    :class="{ 'pv-container_fluid': props.fluid }"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.pv-container {
  width: 100%;
  margin-left: auto !important;
  margin-right: auto !important;
}

@media screen and (min-width: 960px) {
  .pv-container {
    max-width: 900px;
  }
}

@media screen and (min-width: 1264px) {
  .pv-container {
    max-width: 1185px;
  }
}

@media screen and (min-width: 1904px) {
  .pv-container {
    max-width: 1785px;
  }
}

.pv-container_fluid {
  max-width: 100%;
}
</style>