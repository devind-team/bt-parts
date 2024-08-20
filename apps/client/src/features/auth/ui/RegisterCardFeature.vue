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
        email: z.string().email({ message: t('auth.error.invalidEmail') }),
        username: z.string().min(3, { message: t('auth.error.invalidUsername') }),
        lastName: z.string().min(2, { message: t('auth.error.invalidLastName') }),
        firstName: z.string().min(2, { message: t('auth.error.invalidFirstName') }),
        patronymic: z.string().optional(),
        phone: z.string().length(17,{ message: t('auth.error.invalidPhoneNumber') }),
        companyName: z.string().min(2, { message: t('auth.error.invalidCompanyName') }),
        password: z.string().min(6, { message: t('auth.error.invalidPassword') }),
        passwordConfirm: z.string().min(6, { message: t('auth.error.invalidPassword') }),
        agreeToPrivacyPolicy: z.boolean().refine(val => val === true, {
          message: t('auth.agreeToPrivacyPolicyRequired')
        }),
      })
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
      if (!values.patronymic) {
        userRegisterInput.patronymic = "";
      }
      const companyInput: CompanyInput = values.companyName
        ? { name: values.companyName }
        : { name: '' }
      await mutate({ userRegisterInput, companyInput })
    } catch (e) {
      if (e instanceof Error) {
        const errorType = e.message;
        switch (errorType) {
          case 'username':
            setErrors({ username: t('auth.error.usernameTaken') });
            break;
          case 'email':
            setErrors({ email: t('auth.error.emailTaken') });
            break;
          case 'phone':
            setErrors({ phone: t('auth.error.phoneTaken') });
            break;
        }
      } else {
        console.log(e);
      }
    }
  },
)
</script>

<template>
  <Card class="pt-4 shadow-2 mx-auto md:w-6 xl:w-5">
    <template #header>
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">
          {{ t('auth.registration') }}
        </div>
        <span class="text-600 font-medium mr-1 line-height-3">{{ t('auth.accountExists') }}</span>
        <nuxt-link
          :to="localePath({ name: 'auth-login' })"
          class="font-medium text-blue-500"
        >
          {{ t('auth.login') }}
        </nuxt-link>
      </div>
    </template>
    <template #content>
      <form @submit="onSubmit">
        <div class="field">
          <label
            for="email"
            class="block text-900 font-medium mb-2"
          >{{ t('auth.email') }}</label>
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
          >{{ t('auth.username') }}</label>
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
          >{{ t('auth.lastName') }}</label>
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
          >{{ t('auth.firstName') }}</label>
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
          >{{ t('auth.patronymic') }}</label>
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
          >{{ t('auth.companyName') }}</label>
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
          >{{ t('auth.phone') }}</label>
          <client-only>
            <div class="flex-auto">
              <InputMask
                id="phone"
                v-model="phone"
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
          >{{ t('auth.password') }}</label>
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
          >{{ t('auth.passwordConfirm') }}</label>
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
        <div>
          <label>
            {{ t('auth.requiredFields') }}
          </label>
        </div> 
        <div class="field-checkbox">
          <input
            id="agreeToPrivacyPolicy"
            v-model="agreeToPrivacyPolicy"
            type="checkbox"
            :class="{ 'p-invalid': errors.agreeToPrivacyPolicy }"
          >
          <label for="agreeToPrivacyPolicy">
            {{ t('auth.agreeToPrivacyPolicy') }}
          
            <nuxt-link
              :to="localePath({ name: 'policy' })"
              class="font-medium text-blue-500"
            >
              {{ t('auth.privacyPolicy') }}
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
          {{ t('auth.register') }}
        </Button>
      </form>
    </template>
  </Card>
</template>
