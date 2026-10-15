import { createI18n } from 'vue-i18n'
import vi from '../locales/vi.json'
import en from '../locales/en.json'

const messages = {
  vi,
  en
}

// Lấy ngôn ngữ từ localStorage hoặc mặc định là 'vi'
const savedLang = localStorage.getItem('lang') || 'vi'

const i18n = createI18n({
  locale: savedLang,
  fallbackLocale: 'vi',
  messages,
  legacy: false
})

export default i18n