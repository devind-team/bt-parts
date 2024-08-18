<script setup lang="ts">
import type { LinksType, BreadCrumbsItem } from '@/shared/layout/types'
import { PrimeIcons } from '@primevue/core/api'
import BreadCrumbs from '@/shared/layout/ui/BreadCrumbs.vue'
import TwoColumns from '@/shared/layout/ui/TwoColumns.vue'
const { t } = useI18n()

definePageMeta({ middleware: 'auth' })

const items = ref<LinksType[]>([
  { label: t('profile.name'), icon: PrimeIcons.USER, name: 'profile-me' },
  { label: t('profile.settings'), icon: PrimeIcons.SHIELD, name: 'profile-settings' },
  { label: t('profile.security'), icon: `${PrimeIcons.COG} pi-spin`, name: 'profile-security' },
])

const links = ref<BreadCrumbsItem[]>([
  { label: t('profile.title'), icon: PrimeIcons.USERS, name: 'profile-me' }
])
</script>
<template>
  <bread-crumbs :items="links">
    <two-columns :items="items">
      <nuxt-page />
    </two-columns>
  </bread-crumbs>
</template>