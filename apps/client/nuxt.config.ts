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
  css: ['~/assets/css/styles.scss'],
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
  vite: {
    plugins: [nxViteTsPaths()],
  },
  nitro: {
    devProxy: {
      '/api/graphql': `http://localhost:${process.env.SERVER_PORT || 3000}/api/graphql`,
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
  eslint: {
    lintOnStart: false,
  },
})
