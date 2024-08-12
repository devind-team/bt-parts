import type { ClientConfig } from '@nuxtjs/apollo/config'

export type RequestCookie = { cookie?: string | undefined }

export const getAuth = async (clientConfig: ClientConfig, requestCookies: RequestCookie) => {
  const token = ref<string | null>(null)

  // await nuxtApp.callHook('apollo:auth', { token, client: key })

  if (!token.value) {
    if (clientConfig.tokenStorage === 'cookie') {
      if (import.meta.client) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const t = useCookie(clientConfig.tokenName!).value
        if (t) {
          token.value = t
        }
      } else if (requestCookies?.cookie) {
        const t = requestCookies.cookie
          .split(';')
          .find((c) => c.trim().startsWith(`${clientConfig.tokenName}=`))
          ?.split('=')?.[1]
        if (t) {
          token.value = t
        }
      }
    } else if (import.meta.client && clientConfig.tokenStorage === 'localStorage') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      token.value = localStorage.getItem(clientConfig.tokenName!)
    }

    if (!token.value) {
      return
    }
  }

  const authScheme = !!token.value?.match(/^[a-zA-Z]+\s/)?.[0]

  if (authScheme || clientConfig?.authType === null) {
    return token.value
  }

  return `${clientConfig?.authType} ${token.value}`
}
