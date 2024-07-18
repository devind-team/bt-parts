export const vuetifyFieldConfig = (state: { errors: string[] | string }) => ({
  props: {
    'error-messages': state.errors,
  },
})
