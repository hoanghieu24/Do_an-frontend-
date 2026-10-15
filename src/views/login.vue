<template>
  <div
    class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[9999] transition-opacity duration-300 p-4"
    @click.self="closeModal"
  >
    <div class="relative bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl border border-slate-100 transform transition-all">
      <!-- Nút đóng -->
      <button
        type="button"
        @click="closeModal"
        class="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Modal Content -->
      <div class="p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-xs"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Đăng nhập tài khoản</h2>
          <p class="text-slate-500 text-sm mt-1">Hệ thống quản lý & giao dịch bất động sản Hiderverse</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-6 p-3.5 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200 flex items-start">
          <svg class="w-5 h-5 mr-2.5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{{ error }}</span>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="login" class="space-y-4">
          <!-- Username Field -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Tên đăng nhập</label>
            <div class="relative">
              <input
                v-model="username"
                type="text"
                required
                autocomplete="username"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all pl-11"
                placeholder="Nhập tên đăng nhập hoặc email"
              />
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Mật khẩu</label>
            <div class="relative">
              <input
                v-model="password"
                type="password"
                required
                autocomplete="current-password"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all pl-11"
                placeholder="••••••••"
              />
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between text-xs pt-1">
            <label class="flex items-center cursor-pointer text-slate-600 font-medium">
              <input type="checkbox" class="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 mr-2" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <button
              type="button"
              @click="openForgotPassword"
              class="text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
            >
              Quên mật khẩu?
            </button>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-98 disabled:opacity-70 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center cursor-pointer"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2.5 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Đang xử lý đăng nhập...</span>
              </span>
              <span v-else>Đăng nhập</span>
            </button>
          </div>
        </form>

        <!-- Footer Links -->
        <div class="mt-6 text-center text-xs text-slate-500">
          Chưa có tài khoản?
          <button
            type="button"
            class="font-bold text-emerald-700 hover:text-emerald-800 ml-1 cursor-pointer"
            @click="openRegisterModal"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const emit = defineEmits(['closed', 'open-register', 'login-success', 'open-forgot'])
const router = useRouter()
const toast = useToast()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const closeModal = () => {
  error.value = ''
  emit('closed')
}

const openRegisterModal = () => {
  closeModal()
  emit('open-register')
}

const openForgotPassword = () => {
  closeModal()
  emit('open-forgot')
}

const login = async () => {
  error.value = ''
  loading.value = true

  try {
    const response = await axios.post(
      '/api/auth/login',
      {
        username: username.value,
        password: password.value
      }
    )

    const token = response.data?.token
    if (token) {
      localStorage.setItem('token', token)
      localStorage.setItem('authToken', token)
      localStorage.setItem('access_token', token)
      localStorage.setItem('jwt', token)
    }

    const roles = response.data?.roles || ['ROLE_MANAGER']
    const fullname = response.data?.fullname || username.value
    const avatar = response.data?.avatar || username.value

    const user = {
      id: response.data?.id || null,
      username: response.data?.username || username.value,
      fullname: fullname,
      roles: roles,
      email: response.data?.email || '',
      phone: response.data?.phone || '',
      avatar: avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4RZl4rXT_nAjdeMz0EhJMnulkobm_5TQU-A&s'
    }

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('currentUser', JSON.stringify(user))
    console.log('✅ Đã lưu user và JWT token vào localStorage:', user)

    toast.success(`Chào mừng ${user.fullname} đăng nhập thành công!`)
    emit('login-success', user)

    if (roles.includes('ROLE_MANAGER') || roles.includes('ROLE_STAFF') || roles.includes('ROLE_ADMIN')) {
      router.push('/admin/admin-dashboard')
    } else {
      router.push('/')
    }
  } catch (err) {
    console.error('❌ Lỗi đăng nhập:', err)
    error.value = err.response?.data?.message || 'Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại.'
  } finally {
    loading.value = false
  }
}
</script>