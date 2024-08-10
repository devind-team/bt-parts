import { defineApolloClient } from '@nuxtjs/apollo/config'

export default defineApolloClient({
  httpEndpoint: process.env.NUXT_API_URL as string,
  browserHttpEndpoint: process.env.NUXT_API_URL_BROWSER,
  wsEndpoint: process.env.NUXT_WS_URL_BROWSER,
  inMemoryCacheOptions: {},
  // inMemoryCacheOptions: { fragmentMatcher }
  httpLinkOptions: {
    headers: {
      'Accept-Language': 'ru', // Язык по умолчанию
    },
  },
})
