import { useApollo } from '#imports'
import { useAuthStore } from '@/stores/auth-store'
import type { MeQuery } from '@repo/queries/composables/graphql.ts'
import meQuery from '@repo/queries/graphql/auth/queries/me.graphql'

const DEFAULT_CLIENT_ID = 'default'

export default defineNuxtRouteMiddleware(async () => {
  const apollo = useApollo()
  const authStore = useAuthStore()
  const { resolveClient } = useApolloClient()
  const client = resolveClient()
  const token = useCookie(`apollo:${DEFAULT_CLIENT_ID}.token`)

  if (token && !authStore.loginIn) {
    try {
      authStore.user = await client
        .query({
          query: meQuery,
          fetchPolicy: 'network-only',
        })
        .then(({ data }: { data: MeQuery }) => data.me)
    } catch (e) {
      if (import.meta.client) {
        await apollo.onLogout()
      }
    }
  }
})
