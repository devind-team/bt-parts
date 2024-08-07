<template>
  <div class="pv-container">
    <slot />
  </div>
</template>

<style lang="scss">
.pv-container {
  width: 100%;
  padding: 12px;
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
</style>