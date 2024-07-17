<script setup lang="ts">
import { object, string } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useLoginMutation, type UserLoginInput } from '@repo/queries/composables/graphql.ts'
import { useAuthStore } from '@/stores/auth-store'
import { vuetifyFieldConfig } from '@/shared/utils/vuetify'

const { onLogin } = useApollo()
const router = useRouter()
const authStore = useAuthStore()
const localePath = useLocalePath()


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

const { mutate, onDone, loading } = useLoginMutation()

onDone(async ({ data }) => {
  if (!data) return
  const { accessToken, user } = data.login
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
  <v-container>
    <v-card
      :loading="loading"
      class="mx-auto w-50"
    >
      <v-form @submit="onSubmit">
        <v-card-title>{{ $t('auth.title') }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="username"
            v-bind="usernameProps"
            :label="$t('auth.username')"
          />
          <v-text-field
            v-model="password"
            v-bind="passwordProps"
            :label="$t('auth.password')"
            type="password"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            :to="localePath({ name: 'auth-register' })"
          >
            {{ $t('auth.register') }}
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            type="submit"
          >
            {{ $t('auth.login') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>
