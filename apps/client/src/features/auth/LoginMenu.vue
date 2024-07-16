<script setup lang="ts">
import { object, string } from 'zod'
import { useAuthStore } from '@/stores/auth-store'
import { Field, Form, type FormActions } from 'vee-validate';
import { useLoginMutation, type UserLoginInput } from '@repo/queries/composables/graphql.js'


const { t } = useI18n();
const { onLogin } = useApollo();
const router = useRouter();
const authStore = useAuthStore();
const localePath = useLocalePath()
const schema = object({
  username: string().min(2),
  password: string().min(4),
})

const { mutate, onDone, loading } = useLoginMutation();
onDone(async ({ data }) => {
  if (!data) return;
  const { accessToken, user } = data.login;
  await onLogin(accessToken);
  authStore.user = user;
  await router.push(localePath({ name: 'index' }));
});

const handleSubmit = async (
  values: UserLoginInput,
  { setErrors }: FormActions<{ username: string; password: string }>,
) => {
  try {
    await mutate({ userLoginInput: values });
  } catch (e) {
    setErrors({ username: t('auth.error'), password: t('auth.error') });
  }
};

</script>
<template>
  <v-container>
    <Form
      as="v-form"
      :validation-schema="schema"
      @submit="handleSubmit"
    >
      <v-card
        :loading="loading"
        class="mx-auto w-50"
      >
        <v-card-title>{{ $t('auth.title') }}</v-card-title>
        <v-card-text>
          <Field
            v-slot="{ field, errors }"
            name="username"
          >
            <v-text-field
              v-bind="field"
              :label="$t('auth.username')"
              :error-messages="errors"
            />
          </Field>
          <Field
            v-slot="{ field, errors }"
            name="password"
          >
            <v-text-field
              v-bind="field"
              :label="$t('auth.password')"
              :error-messages="errors"
              type="password"
            />
          </Field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            type="submit"
          >
            {{ $t('auth.login') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </Form>
  </v-container>
</template>
