<script lang="ts" setup>
import { object, string } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useRegisterMutation } from '@repo/queries/composables/graphql'
import type { UserRegisterInput, UserLoginType } from '@repo/queries/composables/graphql.ts'
import { useAuthStore } from '@/stores/auth-store'
import { PrimeVueFieldConfig } from '@/shared/utils/PrimeVue.js'
import { type FormActions } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const { onLogin } = useApollo()
const router = useRouter()
const authStore = useAuthStore()

const localePath = useLocalePath()

const { defineField, handleSubmit, errors } = useForm<UserRegisterInput>({
  validationSchema: toTypedSchema(
    object({
      username: string().min(2),
      password: string().min(6),
      email: string().email(),
      firstName: string().min(2),
      lastName: string().min(2),
      patronymic: string().min(2)
    })
  )
})

const [username, usernameProps] = defineField('username', PrimeVueFieldConfig)
const [password, passwordProps] = defineField('password', PrimeVueFieldConfig)
const [email, emailProps] = defineField('email', PrimeVueFieldConfig)
const [firstName, firstNameProps] = defineField('firstName', PrimeVueFieldConfig)
const [lastName, lastNameProps] = defineField('lastName', PrimeVueFieldConfig)
const [patronymic, patronymicProps] = defineField('patronymic', PrimeVueFieldConfig)

const { mutate, onDone } = useRegisterMutation()

onDone(async ({ data }) => {
  if (!data || !data.register) return
  const { accessToken, user } = data.register
  await onLogin(accessToken)
  authStore.user = user
  await router.push(localePath({ name: 'index' }))
})

const onSubmit = handleSubmit(async (
  values: UserRegisterInput,
  { setErrors }: FormActions<UserRegisterInput>,
) => {
  try {
    await mutate({ 
      userRegisterInput: values 
    })
  } catch (e) {
    setErrors({
      username: t('auth.error'),
      email: t('auth.error'),
      firstName: t('auth.error'),
      lastName: t('auth.error'),
      patronymic: t('auth.error'),
      password: t('auth.error')
    })
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
        :to="localePath({ name: 'auth-login' })"
      >
        {{ $t('auth.login') }}
      </a>
    </div>
    <form @submit="onSubmit">
      <div>
        <div class="field">
          <label
            for="username"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.username') }}</label>
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
          >{{ errors.username }}</small>
        </div>
        <div class="field">
          <label
            for="email"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.email') }}</label>
          <InputText
            v-model="email"
            v-bind="emailProps"
            aria-describedby="email-help"
            class="w-full mb-3"
            :class="{ 'p-invalid': errors.email }"
          />
          <small
            id="email-help"
            class="p-error"
          >{{ errors.email }}</small>
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
          >{{ errors.password }}</small>
        </div>
        <div class="field">
          <label
            for="firstName"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.firstName') }}</label>
          <InputText
            v-model="firstName"
            v-bind="firstNameProps"
            aria-describedby="firstName-help"
            class="w-full mb-3"
            :class="{ 'p-invalid': errors.firstName }"
          />
          <small
            id="firstName-help"
            class="p-error"
          >{{ errors.firstName }}</small>
        </div>
        <div class="field">
          <label
            for="lastName"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.lastName') }}</label>
          <InputText
            v-model="lastName"
            v-bind="lastNameProps"
            aria-describedby="lastName-help"
            class="w-full mb-3"
            :class="{ 'p-invalid': errors.lastName }"
          />
          <small
            id="lastName-help"
            class="p-error"
          >{{ errors.lastName }}</small>
        </div>
        <div class="field">
          <label
            for="patronymic"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.patronymic') }}</label>
          <InputText
            v-model="patronymic"
            v-bind="patronymicProps"
            aria-describedby="patronymic-help"
            class="w-full mb-3"
            :class="{ 'p-invalid': errors.patronymic }"
          />
          <small
            id="patronymic-help"
            class="p-error"
          >{{ errors.patronymic }}</small>
        </div>
        <div class="flex align-items-center justify-content-between mb-6">
          <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">{{ $t('auth.forgot_password') }}</a>
        </div>
        <Button
          icon="pi pi-user"
          class="w-full"
          type="submit"
        >
          {{ $t('auth.register') }}
        </Button>
      </div>
    </form>
  </div>
</template>
