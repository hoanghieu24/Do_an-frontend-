// src/stores/useSettingsStore.js
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    festivalMode: false, // hiệu ứng tuyết
    isDark: false,
    language: 'vi'
  }),
  actions: {
    toggleFestival() {
      this.festivalMode = !this.festivalMode
    },
    toggleDark() {
      this.isDark = !this.isDark
    },
    setLanguage(lang) {
      this.language = lang
    }
  }
})
