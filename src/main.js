import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/tailwind.css'
import i18n from './i18n'
import { createPinia } from 'pinia'
import axios from 'axios'

// Global Axios Interceptor: Attach JWT Bearer Token and User ID
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || localStorage.getItem('jwt')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  const userRaw = localStorage.getItem('currentUser') || localStorage.getItem('user')
  if (userRaw) {
    try {
      const u = JSON.parse(userRaw)
      if (u && u.id) {
        config.headers['X-User-Id'] = u.id
      }
    } catch (e) {}
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
// 👉 Kích hoạt router và i18n
app.use(router)
app.use(i18n) // 👈 thêm dòng này

// 👉 Cấu hình Toast
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
})

// 👉 Cuối cùng mới mount app
app.mount('#app')
