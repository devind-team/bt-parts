<script lang="ts" setup>
const localePath = useLocalePath()
</script>

<template>
  <Toolbar>
    <template #start>
      <div class="flex items-center gap-2">
        <NuxtLink :to="localePath({ name: 'index' })">
          <NuxtImg
            src="/icon.svg"
            width="32"
          />
          <span class="text-500">{{ $t('name') }}</span>
        </NuxtLink>
      </div>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <Avatar style="width: 32px; height: 32px">
          ЛВС
        </Avatar>
      </div>
    </template>
  </Toolbar>
</template>
