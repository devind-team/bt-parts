export const PrimeVueFieldConfig = (state: { errors: string[] | string }) => ({
  props: {
    'error-messages': state.errors,
  },
})
