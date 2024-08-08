<script lang="ts" setup>
import * as z from 'zod'
import { useToast } from 'primevue/usetoast'
import { useCommonQuery } from '#imports'
import { useUpdateUserMutation, type MeQuery, type MeQueryVariables, type UpdateUserInput } from '@repo/queries/composables/graphql'
import meQuery from '@repo/queries/graphql/auth/queries/me.graphql'

const authStore = useAuthStore()
const toast = useToast()
const { t } = useI18n()

const { data: user, changeUpdate } = useCommonQuery<MeQuery, MeQueryVariables>({ document: meQuery })

const { mutate: updateUserMutation, onDone, loading } = useUpdateUserMutation({
  update: (cache, result) => changeUpdate(cache, result)
})

onDone(({ data }) => {
  authStore.user = data!.updateUser
  toast.add({ severity: 'success', summary: t('profile.basicInformation.name'), detail: t('profile.successUpdate') })
})

const { defineField, handleSubmit, errors } = useForm<UpdateUserInput>({
  initialValues: user.value,
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().email(),
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      patronymic: z.string().optional(),
    })
  )
})

const [email] = defineField('email')
const [firstName] = defineField('firstName')
const [lastName] = defineField('lastName')
const [patronymic] = defineField('patronymic')

const onSubmit = handleSubmit(async (values) => {
  await updateUserMutation({ updateUserInput: { id: user.value!.id, ...values } })
})
</script>

<template>
  <div class="flex flex-wrap mt-5">
    <div class="w-12 md:w-3 text-500">
      {{ $t('profile.basicInformation.name') }}
    </div>
    <div class="w-12 md:w-9 px-2">
      <form @submit="onSubmit">
        <div class="flex flex-column gap-2 profile-field">
          <label
            :for="`profile-email`"
            class="text-800"
          >{{ $t(`auth.email`) }}</label>
          <client-only>
            <InputText
              id="profile-email"
              v-model="email"
              aria-describedby="email-help"
              :invalid="!!errors.email"
            />
          </client-only>
          <small id="email-help">{{ errors.email }}</small>
        </div>
        <div class="flex flex-column gap-2 profile-field">
          <label
            :for="`profile-lastName`"
            class="text-800"
          >{{ $t(`auth.lastName`) }}</label>
          <client-only>
            <InputText
              id="profile-lastName"
              v-model="lastName"
              aria-describedby="lastName-help"
              :invalid="!!errors.lastName"
            />
          </client-only>
          <small id="lastName-help">{{ errors.lastName }}</small>
        </div>
        <div class="flex flex-column gap-2 profile-field">
          <label
            :for="`profile-firstName`"
            class="text-800"
          >{{ $t(`auth.firstName`) }}</label>
          <client-only>
            <InputText
              id="profile-firstName"
              v-model="firstName"
              aria-describedby="email-help"
              :invalid="!!errors.firstName"
            />
          </client-only>
          <small id="firstName-help">{{ errors.firstName }}</small>
        </div>
        <div class="flex flex-column gap-2 profile-field">
          <label
            :for="`profile-patronymic`"
            class="text-800"
          >{{ $t(`auth.patronymic`) }}</label>
          <client-only>
            <InputText
              id="profile-patronymic"
              v-model="patronymic"
              aria-describedby="patronymic-help"
              :invalid="!!errors.patronymic"
            />
          </client-only>
          <small id="patronymic-help">{{ errors.patronymic }}</small>
        </div>
        <div class="flex justify-content-end">
          <Button
            :loading="loading"
            :label="$t('save')"
            icon="pi pi-check"
            type="submit"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-field {
  height: 100px;
}
</style>