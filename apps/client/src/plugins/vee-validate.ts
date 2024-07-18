import { defineRule, configure } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ru from '@vee-validate/i18n/dist/locale/ru.json'

defineRule('required', required)

configure({
  generateMessage: localize({
    ru,
    en,
  }),
})

export default defineNuxtPlugin((nuxtApp) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  setLocale(unref(nuxtApp.$i18n.locale))
})
