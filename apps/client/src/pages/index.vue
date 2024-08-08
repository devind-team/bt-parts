<script setup lang="ts">
import PvContainer from '@/widgets/layout/ui/PvContainer.vue'

const { t } = useI18n()
const localePath = useLocalePath()
useHead({ title: t('title') })

</script>

<template>
  <pv-container fluid>
    <div class="flex flex-column">
      <div class="grid text-800">
        <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
            <span class="block text-5xl font-bold mb-1">{{ t('description') }}</span>
            <div class="text-3xl text-primary font-bold mb-3">
              {{ t('tagline') }}
            </div>
            <p class="mt-0 mb-4 text-700 line-height-3">
              {{ t('about') }}
            </p>
            <Button
              type="button"
              class="p-button-outlined"
              as="router-link"
              :to="localePath({ name: 'auth-register' })"
            >
              {{ t('auth.doOrder') }}
            </Button>
          </section>
        </div>
        <div class="col-12 md:col-6 hidden md:block overflow-hidden">
          <img
            src="/icon.svg"
            alt="Image"
            class="md:ml-auto block md:h-full"
            style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)"
          >
        </div>
      </div>
      <div class="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
        <div class="mb-3 font-bold text-3xl">
          <span class="text-900">{{ t('features.original') }}, </span>
          <span class="text-blue-600">{{ t('features.oem') }}</span>
        </div>
        <div class="text-700 mb-6">
          {{ t('features.qualityParts') }}
        </div>
        <div class="grid">
          <div class="col-12 md:col-4 mb-4 px-5">
            <span
              class="p-3 shadow-2 mb-3 inline-block surface-card"
              style="border-radius: 10px"
            >
              <i class="pi pi-warehouse text-4xl text-blue-500" />
            </span>
            <div class="text-900 text-xl mb-3 font-medium">
              {{ t('features.supplyFactories') }}
            </div>
            <span class="text-700 line-height-3">{{ t('featureDescriptions.supplyFactories') }}</span>
          </div>
          <div class="col-12 md:col-4 mb-4 px-5">
            <span
              class="p-3 shadow-2 mb-3 inline-block surface-card"
              style="border-radius: 10px"
            >
              <i class="pi pi-verified text-4xl text-blue-500" />
            </span>
            <div class="text-900 text-xl mb-3 font-medium">
              {{ t('features.warranty') }}
            </div>
            <span class="text-700 line-height-3">{{ t('featureDescriptions.warranty') }}</span>
          </div>
          <div class="col-12 md:col-4 mb-4 px-5">
            <span
              class="p-3 shadow-2 mb-3 inline-block surface-card"
              style="border-radius: 10px"
            >
              <i class="pi pi-wallet text-4xl text-blue-500" />
            </span>
            <div class="text-900 text-xl mb-3 font-medium">
              {{ t('features.lowPrices') }}
            </div>
            <span class="text-700 line-height-3">{{ t('featureDescriptions.lowPrices') }}</span>
          </div>
          <div class="col-12 md:col-4 mb-4 px-5">
            <span
              class="p-3 shadow-2 mb-3 inline-block surface-card"
              style="border-radius: 10px"
            >
              <i class="pi pi-globe text-4xl text-blue-500" />
            </span>
            <div class="text-900 text-xl mb-3 font-medium">
              {{ t('features.internationalLogistics') }}
            </div>
            <span class="text-700 line-height-3">{{ t('featureDescriptions.internationalLogistics') }}</span>
          </div>
          <div class="col-12 md:col-4 mb-4 px-5">
            <span
              class="p-3 shadow-2 mb-3 inline-block surface-card"
              style="border-radius: 10px"
            >
              <i class="pi pi-stopwatch text-4xl text-blue-500" />
            </span>
            <div class="text-900 text-xl mb-3 font-medium">
              {{ t('features.shortTerms') }}
            </div>
            <span class="text-700 line-height-3">{{ t('featureDescriptions.shortTerms') }}</span>
          </div>
          <div class="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <span
              class="p-3 shadow-2 mb-3 inline-block surface-card"
              style="border-radius: 10px"
            >
              <i class="pi pi-desktop text-4xl text-blue-500" />
            </span>
            <div class="text-900 text-xl mb-3 font-medium">
              {{ t('features.itSystem') }}
            </div>
            <span class="text-700 line-height-3">{{ t('featureDescriptions.itSystem') }}</span>
          </div>
        </div>
      </div>
    </div>
  </pv-container>
</template>
