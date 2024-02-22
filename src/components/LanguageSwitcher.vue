<template>
  <div class="lang-switcher">
    <n-select
      :options="supportedLocales"
      :value="locale.split('-')[ 0 ].toUpperCase()"
      :on-update:value="switchLanguage"
    />
  </div>
</template>

<script>
import { NButton, NDropdown, NSelect } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import Tr from "../i18n/translation"

export default {
  components: {
    NSelect,
    NDropdown,
    NButton
  },
  setup() {
    const { t, locale } = useI18n()
    const supportedLocales = Tr.supportedLocales.map( el => {
      return {
        label: el.split( '-' )[ 0 ].toUpperCase(),
        value: el
      }
    } )
    const switchLanguage = async ( value ) => {
      await Tr.switchLanguage( value )
    }

    return { t, locale, supportedLocales, switchLanguage }
  }
}
</script>

<style>
.lang-switcher {
  width: 70px;
}
</style>