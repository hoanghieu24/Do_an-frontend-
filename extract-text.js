import { createI18n } from 'vue-i18n'
import vi from './locales/vi.json'
import en from './locales/en.json'

const messages = {
  vi,
  en
}

const savedLang = localStorage.getItem('lang') || 'vi'

const i18n = createI18n({
  locale: savedLang, // Ngôn ngữ hiện tại
  fallbackLocale: 'vi',
  messages
})

export default i18n
