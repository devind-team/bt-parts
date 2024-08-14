<script setup lang="ts">
import searchProductsQuery from '@repo/queries/graphql/products/queries/search-products.graphql'
import SearchProductField from '@/shared/products/ui/SearchProductField.vue'
import ProductsDataView from '@/entities/products/ui/ProductsDataView.vue'

const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()

const handleSearch = (q: string) => {
  router.push(localePath({ query: { q } }))
}

const search = computed(() => route.query.q || '')
</script>

<template>
  <Card>
    <template #header>
      <SearchProductField
        :q="search"
        @search="handleSearch"
      />
    </template>
    <template #content>
      <ProductsDataView />
    </template>
  </Card>
</template>