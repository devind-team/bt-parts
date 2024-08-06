<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()
const onChangeTheme = () => {
  colorMode.preference = colorMode.value == 'dark' ? 'light' : 'dark'
}
</script>
<template>
  <Button
    v-tooltip.bottom="t('changeTheme')"
    :icon="`pi ${colorMode.value == 'dark' ? 'pi-sun' : 'pi-moon'}`"
    rounded
    outlined
    @click="onChangeTheme"
  />
</template>