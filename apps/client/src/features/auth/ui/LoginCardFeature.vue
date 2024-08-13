<script lang="ts" setup>
import type { UserLoginInput, UserLoginType } from '@repo/queries/composables/graphql.ts'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useLoginMutation } from '@repo/queries/composables/graphql'
import { useAuthStore } from '@/stores/auth-store'
import { type FormActions } from 'vee-validate'

const { t } = useI18n()
const { onLogin } = useApollo()
const router = useRouter()
const authStore = useAuthStore()
const localePath = useLocalePath()

const { defineField, handleSubmit, errors } = useForm<UserLoginInput>({
  validationSchema: toTypedSchema(
    z.object({
      username: z.string().min(2),
      password: z.string().min(6),
    })
  )
})

const [username] = defineField('username')
const [password] = defineField('password')

const { mutate, onDone } = useLoginMutation()

onDone(async (result: { data?: { login: UserLoginType } | null }) => {
  if (!result.data) return
  const { accessToken, user } = result.data.login
  await onLogin(accessToken)
  authStore.user = user
  await router.push(localePath({ name: 'index' }))
})

const onSubmit = handleSubmit(async (
  userLoginInput: UserLoginInput,
  { setErrors }: FormActions<UserLoginInput>,
) => {
  try {
    await mutate({ userLoginInput })
  } catch (e) {
    setErrors({ username: t('auth.error'), password: t('auth.error') })
  }

})
</script>

<template>
  <Card class="pt-4 shadow-2 mx-auto md:w-6 xl:w-5">
    <template #header>
      <div class="text-center mb-5">
        <img
          src="/icon.svg"
          alt="Image"
          height="50"
          class="mb-3"
        >
        <div class="text-900 text-3xl font-medium mb-3">
          {{ $t('auth.welcome') }}
        </div>
        <span class="mr-2">{{ $t('auth.notAccount') }}</span>
        <nuxt-link
          :to="localePath({ name: 'auth-register' })"
          class="font-medium text-blue-500"
        >
          {{ $t('auth.create') }}
        </nuxt-link>
      </div>
    </template>
    <template #content>
      <form @submit="onSubmit">
        <div class="field">
          <label
            for="username"
            class="block text-900 font-medium mb-2"
          >
            {{ $t('auth.username') }}
          </label>
          <client-only>
            <InputText
              id="username"
              v-model="username"
              aria-describedby="username-help"
              class="w-full mb-3"
              :invalid="!!errors.username"
            />
          </client-only>
          <small
            id="username-help"
            class="p-error"
          >
            {{ errors.username }}
          </small>
        </div>
        <div class="field">
          <label
            for="password"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.password') }}</label>
          <client-only>
            <InputText
              id="password"
              v-model="password"
              aria-describedby="password-help"
              type="password"
              class="w-full mb-3"
              :invalid="!!errors.password"
            />
          </client-only>
          <small
            id="password-help"
            class="p-error"
          >
            {{ errors.password }}
          </small>
        </div>

        <div class="flex align-items-center justify-content-between mb-6">
          <nuxt-link :to="localePath({ name: 'index' })">
            {{ $t('auth.forgotPassword') }}
          </nuxt-link>
        </div>

        <Button
          icon="pi pi-user"
          class="w-full"
          type="submit"
        >
          {{ $t('auth.login') }}
        </Button>
      </form>
    </template>
  </Card>
</template>
