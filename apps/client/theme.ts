import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const ThemePreset = definePreset(Aura, {})

export default {
  preset: ThemePreset,
  options: {
    darkModeSelector: '.p-dark',
  },
};
