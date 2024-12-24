<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router'
const { t } = useI18n()
const props = withDefaults(defineProps<{ q: string | LocationQueryValue[] }>(), { q: '' })
const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const search = ref<string>(String(props.q))

const handleSearch = () => {
  emit('search', search.value)
}
</script>

<template>
  <div class="flex gap-2 p-3">
    <InputText
      id="products-search"
      v-model="search"
      class="flex-1"
      :placeholder="t('products.search')"
      size="large"
      @keyup.enter="handleSearch"
    />
    <Button
      :label="t('find')"
      @click="handleSearch"
    />
  </div>
  <div />
</template>