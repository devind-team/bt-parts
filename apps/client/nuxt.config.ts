import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  compatibilityDate: '2024-07-06',
  alias: {
    '@repo/queries': fileURLToPath(new URL('../../packages/queries/src', import.meta.url)),
  },
  modules: [
    '@nuxtjs/color-mode',
    '@primevue/nuxt-module',
    '@nuxtjs/apollo',
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
  app: {
    head: {
      title: 'Главная',
      titleTemplate: '%s - Заказ запчастей онлайн',
    },
  },
  apollo: {
    clients: {
      default: './src/shared/graphql/client.ts',
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
  vite: {
    plugins: [nxViteTsPaths()],
  },
  nitro: {
    devProxy: {
      '/api/graphql': `http://localhost:${process.env.SERVER_PORT || 3000}/api/graphql`,
    },
  },
  eslint: {
    lintOnStart: false,
  },
  build: {
    transpile: ['primevue'],
  },
})
