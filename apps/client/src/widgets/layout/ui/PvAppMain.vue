<template>
  <main class="pv-app-main">
    <div class="pv-app-wrap">
      <slot />
    </div>
  </main>
</template>

<style lang="scss">
.pv-app-main {
  display: flex;
  flex: 1 0 auto;
  max-width: 100%;
  transition: .2s cubic-bezier(.4, 0, .2, 1);

  & .pv-app-wrap {
    flex: 1 1 auto;
    max-width: 100%;
  }
}
</style>