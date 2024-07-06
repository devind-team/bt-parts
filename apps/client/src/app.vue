<script setup lang="ts">
import { useHead } from '#imports'
useHead({
  title: 'hello'
})
</script>

<template>
  <main>
    <header>
      <nav>
        <NuxtLink to="/">
          Home
        </NuxtLink>
        <NuxtLink to="/about">
          About
        </NuxtLink>
      </nav>
    </header>
    <nuxt-page />
  </main>
</template>
