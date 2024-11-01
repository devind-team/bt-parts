import { defineStore } from 'pinia'
import type { User } from '@repo/queries/composables/graphql.ts'

export type AuthStoreStateType = {
  user: User | null
}

export type AuthStoreGettersType = {
  loginIn: (state: AuthStoreStateType) => boolean
  initials: (state: AuthStoreStateType) => string
  fullName: (state: AuthStoreStateType) => string
  avatarUrl: (state: AuthStoreStateType) => string | undefined
  userRole: (state: AuthStoreStateType) => string
}

export type AuthStoreActionsType = {
  setAvatar: (url: string | null) => void
}

export const useAuthStore = defineStore<string, AuthStoreStateType, AuthStoreGettersType, AuthStoreActionsType>(
  'authStore',
  {
    state: () => ({
      user: null,
    }),
    getters: {
      loginIn: (state) => !!state.user,
      initials: (state) => (state.user ? `${state.user.lastName[0]}${state.user.firstName[0]}` : ''),
      fullName: (state) =>
        state.user ? `${state.user.lastName} ${state.user.firstName} ${state.user.patronymic}` : '',
      avatarUrl: (state) => (state.user?.avatar ? `/api/files/${state.user.avatar}` : undefined),
      userRole: (state) => state.user? state.user.role : ''
    },
    actions: {
      setAvatar(url: string | null): void {
        if (this.user) {
          this.user = { ...this.user, avatar: url }
        }
      },
    },
  },
)
