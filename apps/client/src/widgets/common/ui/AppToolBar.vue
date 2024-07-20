<script lang="ts" setup>
const localePath = useLocalePath()
</script>

<template>
  <Toolbar>
    <template #start>
      <NuxtLink
        :to="localePath({ name: 'index' })"
        class="flex"
      >
        <NuxtImg
          src="/icon.svg"
          width="32"
        />
        <span class="text-2xl ml-2">
          {{ $t('name') }}
        </span>
      </NuxtLink>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <Avatar>
          ЛВС
        </Avatar>
      </div>
    </template>
  </Toolbar>
</template>
