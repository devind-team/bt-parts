import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  workspaceDir: '../../',
  srcDir: 'src',
  devtools: { enabled: true },
  devServer: {
    host: 'localhost',
    port: 4200,
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      extends: '../tsconfig.app.json',
    },
  },
  imports: {
    autoImport: true,
  },

  css: ['~/assets/css/styles.scss'],

  vite: {
    plugins: [nxViteTsPaths()],
  },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n'],
})
