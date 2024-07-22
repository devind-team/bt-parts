<script lang="ts" setup>

import { object, string } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useLoginMutation } from '@repo/queries/composables/graphql'
import type { UserLoginInput, UserLoginType } from '@repo/queries/composables/graphql.ts'
import { useAuthStore } from '@/stores/auth-store'
import { vuetifyFieldConfig } from '@/shared/utils/vuetify'

const { onLogin } = useApollo()
const router = useRouter()
const authStore = useAuthStore()

const localePath = useLocalePath()
const checked = ref(false)

const { defineField, handleSubmit } = useForm<UserLoginInput>({
  validationSchema: toTypedSchema(
    object({
      username: string().min(2),
      password: string().min(4),
    })
  )
})

const [username, usernameProps] = defineField('username', vuetifyFieldConfig)
const [password, passwordProps] = defineField('password', vuetifyFieldConfig)

const { mutate, onDone } = useLoginMutation()

onDone(async (result: { data?: { login: UserLoginType } | null }) => {
  if (!result.data) return
  const { accessToken, user } = result.data.login
  await onLogin(accessToken)
  authStore.user = user
  await router.push(localePath({ name: 'index' }))
})

const onSubmit = handleSubmit(async (values: UserLoginInput) => {
  try{
    await mutate({ 
        userLoginInput: values 
      })
  }catch (e){
    console.log(e)
  }
  
})
</script>

<template>
  <form @submit="onSubmit">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 mx-auto">
      <div class="text-center mb-5">
        <img
          src="/icon.svg"
          alt="Image"
          height="50"
          class="mb-3"
        >
        <div class="text-900 text-3xl font-medium mb-3">
          Welcome Back
        </div>
        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
        <a 
          class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" 
          :to="localePath({ name: 'auth-register' })"
        >Create today!
        </a>
      </div>

      <div>
        <label
          for="Username"
          class="block text-900 font-medium mb-2"
        >Username</label>
        <InputText
          id="Username"
          v-model="username"
          v-bind="usernameProps"
          type="text"
          class="w-full mb-3"
        />

        <label
          for="password"
          class="block text-900 font-medium mb-2"
        >Password</label>
        <InputText
          id="password"
          v-model="password"
          v-bind="passwordProps"
          type="password"
          class="w-full mb-3"
        />

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox
              id="rememberme1"
              v-model="checked"
              :binary="true"
              class="mr-2"
            />
            <label for="rememberme1">Remember me</label>
          </div>
          <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
        </div>

        <Button
          label="Sign In"
          icon="pi pi-user"
          class="w-full"
          type="submit"
        />
      </div>
    </div>
  </form>
</template>
