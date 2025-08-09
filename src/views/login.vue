<template>
  <!-- Phần overlay và modal -->
  <div v-show="isVisible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
    @click.self="closeModal">
    <div class="relative bg-white rounded-xl w-full max-w-md mx-4 overflow-hidden shadow-2xl transform transition-all">
      <!-- Nút đóng -->
      <button @click="closeModal"
        class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Modal Content -->
      <div class="p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4">
              </path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800">Đăng nhập hệ thống</h2>
          <p class="text-gray-500 mt-1">Vui lòng nhập thông tin đăng nhập</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start">
          <svg class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{{ error }}</span>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="login" class="space-y-6">
          <!-- Username Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tên đăng nhập</label>
            <div class="relative">
              <input v-model="username" type="text" required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pl-11"
                placeholder="username@example.com">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
            <div class="relative">
              <input v-model="password" type="password" required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition pl-11"
                placeholder="••••••••">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                  </path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">Ghi nhớ đăng nhập</label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Quên mật khẩu?</a>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button type="submit" :disabled="loading"
              class="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-70">
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                Đang đăng nhập...
              </span>
              <span v-else>Đăng nhập</span>
            </button>
          </div>
        </form>

        <!-- Footer Links -->
        <div class="mt-6 text-center text-sm">
          <p class="text-gray-500">
            Chưa có tài khoản?
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Đăng ký ngay</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      loading: false,
      isVisible: true
    }
  },
  methods: {
    async login() {
      this.error = ''
      this.loading = true

      try {
        const response = await axios.post(
          '/j_spring_security_check',
          new URLSearchParams({
            j_username: this.username,
            j_password: this.password
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
          }
        )

        // 👤 Lấy dữ liệu từ backend (nếu có), fallback nếu thiếu
        const roles = response.data?.roles || ['ROLE_MANAGER']
        const fullname = response.data?.fullname || this.username


        const user = {
          id: response.data?.customerid || null,
          username: this.username,
          fullname: fullname,
          roles: roles
        }

        // ✅ Lưu vào localStorage
        localStorage.setItem('user', JSON.stringify(user))
        console.log('✅ Đã lưu user vào localStorage:', user)

        // ✅ Emit sự kiện login thành công
        this.$emit('login-success', user)

        // ✅ Hiển thị thông báo toast
        toast.success(`Chúc mừng bạn đã đăng nhập thành công, xin chào ${user.fullname}`)

        // ✅ Log ra console
        console.log('✅ Đăng nhập thành công:', response.data)

        await nextTick() // đảm bảo localStorage cập nhật xong

        // 🧭 Điều hướng theo quyền
        if (roles.includes('ROLE_MANAGER') || roles.includes('ROLE_STAFF')) {
          console.log('🚀 Chuyển tới admin-dashboard')
          this.$router.push('/admin/admin-dashboard')
        } else {
          console.log('➡️ Chuyển tới trang chính')
          this.$router.push('/')
        }

      } catch (err) {
        console.error('❌ Lỗi đăng nhập:', err)
        this.error = err.response?.data?.message || 'Không thể đăng nhập. Vui lòng thử lại.'
      } finally {
        this.loading = false
      }
    },

    closeModal() {
      this.isVisible = false
      this.$emit('closed')
    }
  }
}
</script>






<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.transition {
  transition: all 0.2s ease;
}

.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Animation cho modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>