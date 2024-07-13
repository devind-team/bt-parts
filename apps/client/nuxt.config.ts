import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-07-06',
  modules: [
    '@nuxtjs/apollo',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/eslint-module',
    '@nuxtjs/color-mode',
    '@vee-validate/nuxt',
  ],
  css: ['~/assets/css/styles.scss', 'vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],
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
      default: {
        httpEndpoint: process.env.NUXT_API_URL || 'http://localhost:4200/api/graphql',
        browserHttpEndpoint: process.env.NUX_API_URL_BROWSER,
        wsEndpoint: process.env.NUXT_WS_URL_BROWSER,
        connectToDevTools: true,
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
  vite: {
    plugins: [
      vuetify({
        autoImport: true,
      }),
      nxViteTsPaths(),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
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
    transpile: ['vuetify'],
  },
})
