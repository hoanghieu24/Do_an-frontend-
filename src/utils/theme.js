// src/stores/themeStore.js
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: localStorage.getItem('isDark') === 'true',
    festivalMode: localStorage.getItem('festivalMode') === 'true'
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      localStorage.setItem('isDark', this.isDark)
      document.documentElement.classList.toggle('dark', this.isDark)
    },
    toggleFestivalMode() {
      this.festivalMode = !this.festivalMode
      localStorage.setItem('festivalMode', this.festivalMode)

      const snowContainer = document.getElementById('snow-container')
      const fireworksContainer = document.getElementById('fireworks-container')

      if (this.festivalMode) {
        snowContainer?.classList.remove('hidden')
        fireworksContainer?.classList.remove('hidden')
      } else {
        snowContainer?.classList.add('hidden')
        fireworksContainer?.classList.add('hidden')
      }
    },
    initTheme() {
      document.documentElement.classList.toggle('dark', this.isDark)
      const snowContainer = document.getElementById('snow-container')
      const fireworksContainer = document.getElementById('fireworks-container')
      if (this.festivalMode) {
        snowContainer?.classList.remove('hidden')
        fireworksContainer?.classList.remove('hidden')
      }
    }
  }
})
