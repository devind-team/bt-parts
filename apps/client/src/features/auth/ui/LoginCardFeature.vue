<script lang="ts" setup>

import { object, string } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useLoginMutation } from '@repo/queries/composables/graphql'
import type { UserLoginInput, UserLoginType } from '@repo/queries/composables/graphql.ts'
import { useAuthStore } from '@/stores/auth-store'
import { PrimeVueFieldConfig } from '@/shared/utils/PrimeVue.js'
import { type FormActions } from 'vee-validate'

const { t } = useI18n()
const { onLogin } = useApollo()
const router = useRouter()
const authStore = useAuthStore()

const localePath = useLocalePath()

const { defineField, handleSubmit, errors } = useForm<UserLoginInput>({
  validationSchema: toTypedSchema(
    object({
      username: string().min(2),
      password: string().min(6),
    })
  )
})

const [username, usernameProps] = defineField('username', PrimeVueFieldConfig)
const [password, passwordProps] = defineField('password', PrimeVueFieldConfig)

const { mutate, onDone } = useLoginMutation()

onDone(async (result: { data?: { login: UserLoginType } | null }) => {
  if (!result.data) return
  const { accessToken, user } = result.data.login
  await onLogin(accessToken)
  authStore.user = user
  await router.push(localePath({ name: 'index' }))
})

const onSubmit = handleSubmit(async (
  values: UserLoginInput,
  { setErrors }: FormActions<{ username: string; password: string }>,
) => {
  try{
    await mutate({ 
        userLoginInput: values 
      })
  }catch (e){
    setErrors({ username: t('auth.error'), password: t('auth.error') })
  }
  
})
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 mx-auto">
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
      <span class="text-600 font-medium line-height-3">{{ $t('auth.not_account') }}</span>
      <a 
        class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" 
        :to="localePath({ name: 'auth-register' })"
      >{{ $t('auth.create') }}
      </a>
    </div>
    <form @submit="onSubmit">
      <div>
        <div class="field">
          <label 
            for="username"
            class="block text-900 font-medium mb-2"
          >
            {{ $t('auth.username') }}
          </label>
          <InputText
            v-model="username"
            v-bind="usernameProps"
            aria-describedby="username-help"
            class="w-full mb-3"
            :class="{ 'p-invalid': errors.username }"
          />
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
          <InputText
            v-model="password"
            v-bind="passwordProps"
            aria-describedby="password-help"
            type="password"
            class="w-full mb-3"
            :class="{ 'p-invalid': errors.password }"
          />
          <small 
            id="password-help" 
            class="p-error"
          >
            {{ errors.password }}
          </small>
        </div>

        <div class="flex align-items-center justify-content-between mb-6">
          <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">{{ $t('auth.forgot_password') }}</a>
        </div>

        <Button
          icon="pi pi-user"
          class="w-full"
          type="submit"
        >
          {{ $t('auth.forgot_password') }}
        </Button>
      </div>
    </form>
  </div>
</template>
