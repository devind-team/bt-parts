<script setup lang="ts">
import type { LinksType, BreadCrumbsItem } from '@/shared/common/types'
import { PrimeIcons } from '@primevue/core/api'
import BreadCrumbs from '@/shared/common/ui/BreadCrumbs.vue'
import TwoColumns from '@/shared/common/ui/TwoColumns.vue'
const { t } = useI18n()

const items = ref<LinksType[]>([
  { label: t('profile.name'), icon: PrimeIcons.USER, name: 'profile-me' },
  { label: t('profile.settings'), icon: PrimeIcons.USER, name: 'profile-settings' },
  { label: t('profile.security'), icon: PrimeIcons.COG, name: 'profile-security' },
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