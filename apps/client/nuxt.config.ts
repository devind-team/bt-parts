import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  compatibilityDate: '2024-07-06',
  runtimeConfig: {
    apiUrl: '',
    public: {
      apiUrlBrowser: '',
      wsUrlBrowser: '',
    },
  },
  alias: {
    '@repo/queries': fileURLToPath(new URL('../../packages/queries/src', import.meta.url)),
  },
  modules: [
    '@nuxtjs/color-mode',
    '@primevue/nuxt-module',
    '@nuxtjs/apollo',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/eslint-module',
    '@vee-validate/nuxt',
  ],
  css: ['@/assets/css/styles.scss'],
  // ---------- development ----------
  workspaceDir: '../../',
  srcDir: 'src',
  devtools: { enabled: true },
  devServer: {
    host: 'localhost',
    port: 3000,
  },
  typescript: {
    strict: true,
    typeCheck: true,
    // tsConfig: {
    //   extends: '../tsconfig.app.json',
    // },
  },
  imports: {
    autoImport: true,
  },
  // ---------- settings ----------
  app: {
    head: {
      title: 'Главная',
      titleTemplate: '%s - Заказ запчастей онлайн',
    },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.NUXT_API_URL || 'http://localhost:3000/api/graphql',
        browserHttpEndpoint: process.env.NUXT_PUBLIC_API_URL_BROWSER || 'http://localhost:3000/api/graphql',
        wsEndpoint: process.env.NUXT_PUBLIC_WS_URL_BROWSER || 'ws://localhost:3000/api/graphql',
      },
    },
  },
  i18n: {
    lazy: true,
    langDir: 'assets/lang/',
    defaultLocale: 'ru',
    detectBrowserLanguage: false,
    locales: [
      { code: 'ru', file: 'ru.json' },
      { code: 'en', file: 'en.json' },
    ],
  },
  primevue: {
    usePrimeVue: true,
    autoImport: true,
    components: {
      exclude: ['Chart', 'Editor'],
    },
    options: {
      ripple: true,
    },
    importTheme: { from: '@@/theme.ts' },
  },
  // ---------- build ----------
  vite: {
    plugins: [nxViteTsPaths()],
  },
  nitro: {
    devProxy: {
      '/api': `http://localhost:${process.env.SERVER_PORT || 3000}/api`,
    },
  },
  eslint: {
    lintOnStart: false,
  },
  build: {
    transpile: ['primevue'],
  },
})
