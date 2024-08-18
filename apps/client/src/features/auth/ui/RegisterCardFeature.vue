<script lang="ts" setup>
import { type FormActions } from 'vee-validate'
import type { CompanyInput, UserRegisterInput } from '@repo/queries/composables/graphql.ts'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useRegisterMutation } from '@repo/queries/composables/graphql'
import { useAuthStore } from '@/stores/auth-store'

const { t } = useI18n()
const { onLogin } = useApollo()
const router = useRouter()
const authStore = useAuthStore()
const localePath = useLocalePath()

const { defineField, handleSubmit, errors } = useForm<UserRegisterInput & { passwordConfirm: string, agreeToPrivacyPolicy: boolean , companyName: string}>({
  validationSchema: toTypedSchema(
    z
      .object({
        email: z.string().email(),
        username: z.string().min(2),
        lastName: z.string().min(2),
        firstName: z.string().min(2),
        patronymic: z.string().optional(),
        phone: z.string().min(9),
        companyName: z.string().optional(),
        password: z.string().min(6),
        passwordConfirm: z.string().min(6),
        agreeToPrivacyPolicy: z.boolean().refine(val => val === true, {
          message: t('auth.agreeToPrivacyPolicyRequired')
        }),
      })
      .partial()
      .refine((data) => data.password === data.passwordConfirm, {
        message: t('auth.notEqualsPasswords'),
        path: ['passwordConfirm'],
      }),
  ),
});


const [email] = defineField('email')
const [username] = defineField('username')
const [firstName] = defineField('firstName')
const [lastName] = defineField('lastName')
const [patronymic] = defineField('patronymic')
const [phone] = defineField('phone')
const [companyName] = defineField('companyName')
const [password] = defineField('password')
const [passwordConfirm] = defineField('passwordConfirm')
const [agreeToPrivacyPolicy] = defineField('agreeToPrivacyPolicy')

const { mutate, onDone } = useRegisterMutation()
onDone(async ({ data }) => {
  if (!data || !data.register) return
  const { accessToken, user } = data.register
  await onLogin(accessToken)
  authStore.user = user
  await router.push(localePath({ name: 'index' }))
})

const onSubmit = handleSubmit(
  async (values: UserRegisterInput & { passwordConfirm: string, companyName?: string }, { setErrors }: FormActions<UserRegisterInput>) => {
    try {
      const userRegisterInput = Object.fromEntries(
        Object.entries(values).filter(([key]) => key !== 'passwordConfirm' && key !== 'companyName' && key!== 'agreeToPrivacyPolicy'),
      ) as UserRegisterInput
      console.log(userRegisterInput)
      // Create companyInput only if companyName is provided
      const companyInput: CompanyInput = values.companyName
        ? { name: values.companyName }
        : { name: '' };
      console.log(companyInput)
      await mutate({ userRegisterInput, companyInput })
    } catch (e) {
      setErrors({
        username: t('auth.error.username'),
        email: t('auth.error.email'),
        firstName: t('auth.error.firstName'),
        lastName: t('auth.error.lastName'),
        patronymic: t('auth.error.patronymic'),
        phone: t('auth.error.phone'),
        password: t('auth.error.password'),
      })
    }
  },
)
</script>

<template>
  <Card class="pt-4 shadow-2 mx-auto md:w-6 xl:w-5">
    <template #header>
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">
          {{ $t('auth.registration') }}
        </div>
        <span class="text-600 font-medium mr-1 line-height-3">{{ $t('auth.accountExists') }}</span>
        <nuxt-link
          :to="localePath({ name: 'auth-login' })"
          class="font-medium text-blue-500"
        >
          {{ $t('auth.login') }}
        </nuxt-link>
      </div>
    </template>
    <template #content>
      <form @submit="onSubmit">
        <div class="field">
          <label
            for="email"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.email') }}</label>
          <client-only>
            <InputText
              id="email"
              v-model="email"
              aria-describedby="email-help"
              class="w-full mb-3"
              :class="{ 'p-invalid': errors.email }"
            />
          </client-only>
          <small
            id="email-help"
            class="p-error"
          >{{ errors.email }}</small>
        </div>
        <div class="field">
          <label
            for="username"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.username') }}</label>
          <client-only>
            <InputText
              id="username"
              v-model="username"
              aria-describedby="username-help"
              class="w-full mb-3"
              :class="{ 'p-invalid': errors.username }"
            />
          </client-only>
          <small
            id="username-help"
            class="p-error"
          >{{ errors.username }}</small>
        </div>
        <div class="field">
          <label
            for="lastName"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.lastName') }}</label>
          <client-only>
            <InputText
              id="lastName"
              v-model="lastName"
              aria-describedby="lastName-help"
              class="w-full mb-3"
              :class="{ 'p-invalid': errors.lastName }"
            />
          </client-only>
          <small
            id="lastName-help"
            class="p-error"
          >{{ errors.lastName }}</small>
        </div>
        <div class="field">
          <label
            for="firstName"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.firstName') }}</label>
          <client-only>
            <InputText
              id="firstName"
              v-model="firstName"
              aria-describedby="firstName-help"
              class="w-full mb-3"
              :class="{ 'p-invalid': errors.firstName }"
            />
          </client-only>
          <small
            id="firstName-help"
            class="p-error"
          >{{ errors.firstName }}</small>
        </div>
        <div class="field">
          <label
            for="patronymic"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.patronymic') }}</label>
          <client-only>
            <InputText
              id="patronymic"
              v-model="patronymic"
              aria-describedby="patronymic-help"
              class="w-full mb-3"
              :class="{ 'p-invalid': errors.patronymic }"
            />
          </client-only>
          <small
            id="patronymic-help"
            class="p-error"
          >{{ errors.patronymic }}</small>
        </div>
        <div class="field">
          <label
            for="companyName"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.companyName') }}</label>
          <client-only>
            <InputText
              id="companyName"
              v-model="companyName"
              aria-describedby="companyName-help"
              class="w-full mb-3"
            />
          </client-only>
        </div>
        <div class="field">
          <label
            for="phone"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.phone') }}</label>
          <client-only>
            <div class="flex-auto">
              <InputMask
                id="phone"
                v-model="phone as string | undefined"
                mask="+7 (999) 999-9999"
                placeholder="+7 (999) 999-9999"
                fluid
                aria-describedby="phone-help"
                :class="{ 'p-invalid': errors.phone }"
              />
            </div>
          </client-only>
          <small
            id="phone-help"
            class="p-error"
          >{{ errors.phone }}</small>
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
              :class="{ 'p-invalid': errors.password }"
            />
          </client-only>
          <small
            id="password-help"
            class="p-error"
          >{{ errors.password }}</small>
        </div>
        <div class="field">
          <label
            for="passwordConfirm"
            class="block text-900 font-medium mb-2"
          >{{ $t('auth.passwordConfirm') }}</label>
          <client-only>
            <InputText
              id="passwordConfirm"
              v-model="passwordConfirm"
              aria-describedby="password-confirm-help"
              type="password"
              class="w-full mb-3"
              :class="{ 'p-invalid': errors.passwordConfirm }"
            />
          </client-only>
          <small
            id="password-confirm-help"
            class="p-error"
          >{{ errors.passwordConfirm }}</small>
        </div>
        <div class="field-checkbox">
          <input
            id="agreeToPrivacyPolicy"
            v-model="agreeToPrivacyPolicy"
            type="checkbox"
            :class="{ 'p-invalid': errors.agreeToPrivacyPolicy }"
          >
          <label for="agreeToPrivacyPolicy">
            {{ $t('auth.agreeToPrivacyPolicy') }}
            <nuxt-link
              :to="localePath({ name: 'policy' })"
              class="font-medium text-blue-500"
            >
              {{ $t('auth.privacyPolicy') }}
            </nuxt-link>
          </label>
        </div>
        <div>
          <small
            id="agreeToPrivacyPolicy-help"
            class="p-error"
          >{{ errors.agreeToPrivacyPolicy }}</small>
        </div>
        <Button
          icon="pi pi-user"
          class="w-full"
          type="submit"
        >
          {{ $t('auth.register') }}
        </Button>
      </form>
    </template>
  </Card>
</template>
