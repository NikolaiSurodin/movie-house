import i18n from "@/i18n"

const Trans = {
  set currentLocale( newLocale ) {
    i18n.global.locale.value = newLocale
  },
  get supportedLocales() {
    return import.meta.env.VITE_SUPPORTED_LOCALES.split( "," )
  },
  async switchLanguage( newLocale ) {
    Trans.currentLocale = newLocale
    const normalizeLocale = newLocale.split('-')[0]
    document.querySelector( "html" ).setAttribute( "lang", normalizeLocale )
    localStorage.setItem( "lang", newLocale )
    window.location.reload()
  }
}
export default Trans