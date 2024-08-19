<template>
  <main class="pv-app-main">
    <div class="pv-app-wrap">
      <slot />
    </div>
  </main>
</template>

<style lang="scss">
.pv-app-main {
  margin-top: calc(var(--p-toolbar-height) + 10px);

  display: flex;
  flex: 1 0 auto;
  max-width: 100%;

  & .pv-app-wrap {
    flex: 1 0 auto;
    max-width: 100%;
  }
}
</style>