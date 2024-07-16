<script lang="ts" setup>
import * as z from 'zod';
import { Field, Form, type FormActions } from 'vee-validate';
import { definePageMeta, useLocalePath } from '#imports';
import { useRouter } from '#app';
import { useAuthStore } from '@/stores/auth-store'
import {useRegisterMutation, type UserRegisterInput} from '@repo/queries/composables/graphql.js'

const { t } = useI18n();
const { onLogin } = useApollo();
const router = useRouter();
const localePath = useLocalePath();
const authStore = useAuthStore();

definePageMeta({ middleware: 'guest' });

useHead({ title: t('auth.register') });

const { mutate, onDone, loading } = useRegisterMutation();
onDone(async ({ data }) => {
  if (!data || !data.register) return;
  const { accessToken, user } = data.register;
  await onLogin(accessToken);
  authStore.user = user;
  await router.push(localePath({ name: 'index' }));
});

const generalFields = ['username', 'lastName', 'firstName', 'sirName'];

const schema = z.object({
  email: z.string().email(),
  ...generalFields.reduce(
    (a, c) => ({
      ...a,
      [c]: z
        .string()
        .min(2)
    }),
    {},
  ),
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6)
}).refine((data) => data.password === data.passwordConfirmation, {
  message: t('auth.pc'),
  path: ['passwordConfirmation']
});

const handleRegister = async (
  values: UserRegisterInput & { passwordConfirmation: string },
  { setErrors }: FormActions<UserRegisterInput>,
) => {
  try {
    const { passwordConfirmation, ...userRegisterInput } = values; // eslint-disable-line @typescript-eslint/no-unused-vars
    await mutate({ userRegisterInput });
  } catch (e) {
    setErrors({ username: 'Ошибка регистрации' });
  }
};
</script>
<template>
  <v-container>
    <Form
      as="v-form"
      :validation-schema="schema"
    >
      <v-card
        :loading="loading"
        class="mx-auto lg:w-1/2"
      >
        <v-card-title>{{ $t('auth.register') }}</v-card-title>
        <v-card-text>
          <Field
            v-slot="{ field, errors }"
            name="email"
          >
            <v-text-field
              v-bind="field"
              :label="$t('auth.email')"
              :error-messages="errors"
              type="email"
            />
          </Field>
          <Field
            v-for="generalField in generalFields"
            :key="generalField"
            v-slot="{ field, errors }"
            :name="generalField"
          >
            <v-text-field
              v-bind="field"
              :label="$t(`auth.${generalField}`)"
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
          <Field
            v-slot="{ field, errors }"
            name="passwordConfirmation"
          >
            <v-text-field
              v-bind="field"
              :label="$t('auth.passwordConfirmation')"
              :error-messages="errors"
              type="password"
            />
          </Field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            :to="localePath({ name: 'auth-login' })"
            stacked
          >
            {{ $t('auth.login') }}
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            type="submit"
          >
            {{ $t('auth.doRegister') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </Form>
  </v-container>
</template>
