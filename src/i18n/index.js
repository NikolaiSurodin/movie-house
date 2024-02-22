import { createI18n } from "vue-i18n"
import en from "./locales/en-US.json"
import ru from "./locales/ru-RU.json"

export default createI18n( {
  locale: localStorage.getItem( 'lang' ) || import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: { 'en-US': en, 'ru-RU': ru }
} )

