import { provideApolloClient } from '@vue/apollo-composable'
import { getMainDefinition } from '@apollo/client/utilities'
import { createHttpLink } from '@apollo/client/core'
import { ApolloLink, split } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { setContext } from '@apollo/client/link/context'
import { NuxtApollo } from '#apollo'

import createRestartableClient from '@/shared/graphql/ws.js'
import { getAuth } from '@/shared/graphql/auth'

const DEFAULT_CLIENT = 'default'

export default defineNuxtPlugin((nuxtApp) => {
  const { $apollo } = useNuxtApp()
  const $config = nuxtApp.$config
  const requestCookies = (import.meta.server && NuxtApollo.proxyCookies && useRequestHeaders(['cookie'])) || {}

  const clientConfig = NuxtApollo.clients[DEFAULT_CLIENT]

  const authLink = setContext(async (_, { headers }) => {
    const auth = await getAuth(clientConfig, requestCookies)
    if (!auth) {
      return
    }
    return {
      headers: {
        ...headers,
        ...requestCookies,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [clientConfig.authHeader!]: auth,
      },
    }
  })

  const uri =
    (import.meta.client && ($config.public.apiUrlBrowser || clientConfig.browserHttpEndpoint)) ||
    $config.apiUrl ||
    clientConfig.httpEndpoint

  const httpLink = authLink.concat(
    createHttpLink({
      ...(clientConfig?.httpLinkOptions && clientConfig.httpLinkOptions),
      uri,
      headers: { ...(clientConfig?.httpLinkOptions?.headers || {}) },
    }),
  )

  let wsLink: GraphQLWsLink | null = null
  if (import.meta.client && clientConfig.wsEndpoint) {
    const wsClient = createRestartableClient({
      ...clientConfig.wsLinkOptions,
      url: clientConfig.wsEndpoint,
      connectionParams: async () => {
        const auth = await getAuth(clientConfig, requestCookies)

        if (!auth) {
          return
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return { headers: { [clientConfig.authHeader!]: auth } }
      },
    })
    wsLink = new GraphQLWsLink(wsClient)

    nuxtApp._apolloWsClients = nuxtApp._apolloWsClients || {}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nuxtApp._apolloWsClients[DEFAULT_CLIENT] = wsClient
  }

  const errorLink = onError((err) => {
    nuxtApp.callHook('apollo:error', err)
  })

  const link = ApolloLink.from([
    errorLink,
    ...(!wsLink
      ? [httpLink]
      : [
          ...(clientConfig?.websocketsOnly
            ? [wsLink]
            : [
                split(
                  ({ query }) => {
                    const definition = getMainDefinition(query)
                    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
                  },
                  wsLink,
                  httpLink,
                ),
              ]),
        ]),
  ])
  $apollo.defaultClient.setLink(link)
  provideApolloClient($apollo.defaultClient)
})
