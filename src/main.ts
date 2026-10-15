import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/main.css'
import axios from 'axios'

axios.defaults.withCredentials = true

// 🔐 Tự động đính kèm JWT Bearer Token vào mọi request Axios
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ⚠️ Xử lý tự động khi Token hết hạn (401)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const url = error.config?.url || ''
      if (!url.includes('/login') && !url.includes('/j_spring_security_check')) {
        console.warn('⚠️ Token hết hạn hoặc không có quyền truy cập')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('currentUser')
      }
    }
    return Promise.reject(error)
  }
)

const app = createApp(App)

const toastOptions = {
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
}

app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')
