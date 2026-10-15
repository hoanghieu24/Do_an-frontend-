<template>
  <div 
    class="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-center justify-center p-4"
    @click.self="closeForm" style="margin-top: 80px;"
  >
    <div class="w-full max-w-md">
      
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
        <!-- Header với hiệu ứng gradient -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center relative">
          <button 
            @click="closeForm"
            class="absolute top-3 right-3 text-white hover:text-indigo-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 class="text-3xl font-bold text-white">Quên mật khẩu</h1>
          <p class="text-indigo-100 mt-2">Khôi phục mật khẩu của bạn</p>
          
          <!-- Progress Steps -->
          <div class="flex justify-center mt-4">
            <div class="flex items-center space-x-2">
              <!-- Step 1 -->
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all"
                  :class="currentStep === 1 ? 'bg-white text-indigo-600' : 
                         currentStep > 1 ? 'bg-green-500 text-white' : 'bg-indigo-400 text-white'">
                  {{ currentStep > 1 ? '✓' : '1' }}
                </div>
              </div>
              
              <!-- Line -->
              <div class="w-8 h-1" :class="currentStep > 1 ? 'bg-green-500' : 'bg-indigo-400'"></div>
              
              <!-- Step 2 -->
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all"
                  :class="currentStep === 2 ? 'bg-white text-indigo-600' : 
                         currentStep > 2 ? 'bg-green-500 text-white' : 
                         currentStep < 2 ? 'bg-gray-300 text-gray-500' : 'bg-indigo-400 text-white'">
                  {{ currentStep > 2 ? '✓' : '2' }}
                </div>
              </div>
              
              <!-- Line -->
              <div class="w-8 h-1" :class="currentStep > 2 ? 'bg-green-500' : 'bg-gray-300'"></div>
              
              <!-- Step 3 -->
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all"
                  :class="currentStep === 3 ? 'bg-white text-indigo-600' : 
                         currentStep === 3 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'">
                  3
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 1: Nhập email -->
        <div v-if="currentStep === 1" class="p-8 space-y-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Nhập email đăng nhập</h3>
            <p class="text-gray-600 mt-2">Vui lòng nhập email của bạn để tiếp tục</p>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Email đăng nhập *</label>
              <div class="relative">
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Nhập email đăng nhập"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  :class="{ 'border-red-500': errors.email }"
                >
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <small v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</small>
            </div>

            <button
              @click="sendResetEmail"
              :disabled="loading"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              :class="{'opacity-75 cursor-not-allowed': loading}"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Đang gửi email...' : 'Gửi email đặt lại' }}
            </button>
          </div>
        </div>

        <!-- Step 2: Nhập token từ email -->
        <div v-else-if="currentStep === 2" class="p-8 space-y-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Nhập mã xác nhận</h3>
            <p class="text-gray-600 mt-2">Mã xác nhận đã được gửi đến email: <strong>{{ form.email }}</strong></p>
            <p class="text-sm text-indigo-600 mt-1">Vui lòng kiểm tra email và nhập mã xác nhận</p>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Mã xác nhận *</label>
              <div class="relative">
                <input
                  v-model="form.token"
                  type="text"
                  required
                  placeholder="Nhập mã xác nhận từ email"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  :class="{ 'border-red-500': errors.token }"
                >
              </div>
              <small v-if="errors.token" class="text-red-500 text-sm">{{ errors.token }}</small>
            </div>

            <div class="flex space-x-4">
              <button
                @click="currentStep = 1"
                class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Quay lại
              </button>
              <button
                @click="validateTokens"
                :disabled="loading"
                class="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                :class="{'opacity-75 cursor-not-allowed': loading}"
              >
                <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Đang xác thực...' : 'Xác thực mã' }}
              </button>
            </div>

            <div class="text-center">
              <button
                @click="resendEmail"
                :disabled="loading"
                class="text-sm text-indigo-600 hover:text-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Gửi lại email
              </button>
            </div>
          </div>
        </div>

        <!-- Step 3: Đặt mật khẩu mới -->
        <div v-else-if="currentStep === 3" class="p-8 space-y-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Đặt mật khẩu mới</h3>
            <p class="text-gray-600 mt-2">Vui lòng tạo mật khẩu mới cho tài khoản của bạn</p>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Mật khẩu mới *</label>
              <div class="relative">
                <input
                  v-model="form.newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  required
                  placeholder="••••••••"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  :class="{ 'border-red-500': errors.newPassword }"
                >
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="showNewPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path v-if="showNewPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <small v-if="errors.newPassword" class="text-red-500 text-sm">{{ errors.newPassword }}</small>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Xác nhận mật khẩu *</label>
              <div class="relative">
                <input
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  placeholder="••••••••"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  :class="{ 'border-red-500': errors.confirmPassword }"
                >
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path v-if="showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <small v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</small>
            </div>

            <div class="flex space-x-4">
              <button
                @click="currentStep = 2"
                class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Quay lại
              </button>
              <button
                @click="resetPassword"
                :disabled="loading"
                class="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                :class="{'opacity-75 cursor-not-allowed': loading}"
              >
                <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Đang đặt lại...' : 'Đặt lại mật khẩu' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-auto transform transition-all duration-300 scale-100">
        <div class="p-6 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Thành công!</h3>
          <p class="text-gray-600 mb-6">Mật khẩu của bạn đã được đặt lại thành công.</p>
          <button
            @click="handleSuccessClose"
            class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue'

const emit = defineEmits(['close', 'switch-to-login'])

// State management
const currentStep = ref(1)
const loading = ref(false)
const showSuccessModal = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const form = reactive({
  email: '',
  token: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = reactive({
  email: '',
  token: '',
  newPassword: '',
  confirmPassword: ''
})

// API endpoints - Điều chỉnh theo API của bạn
const API_BASE_URL = '/api/password' // Thay bằng URL thực tế

// Validation functions
const validateEmail = () => {
  if (!form.email.trim()) {
    errors.email = 'Vui lòng nhập email đăng nhập'
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = 'Email không hợp lệ'
    return false
  }
  errors.email = ''
  return true
}

const validateToken = () => {
  if (!form.token.trim()) {
    errors.token = 'Vui lòng nhập mã xác nhận'
    return false
  }
  errors.token = ''
  return true
}

const validatePasswords = () => {
  if (!form.newPassword) {
    errors.newPassword = 'Vui lòng nhập mật khẩu mới'
    return false
  }
  if (form.newPassword.length < 6) {
    errors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự'
    return false
  }
  if (form.newPassword !== form.confirmPassword) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp'
    return false
  }
  errors.newPassword = ''
  errors.confirmPassword = ''
  return true
}

// API call functions
const apiCall = async (endpoint, method = 'POST', body = null, params = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  // Build URL với query parameters nếu có
  let url = `${API_BASE_URL}${endpoint}`
  if (params) {
    const queryParams = new URLSearchParams(params).toString()
    url += `?${queryParams}`
  }

  try {
    const response = await fetch(url, config)
    const data = await response.text()

    if (!response.ok) {
      throw new Error(data.message || 'Có lỗi xảy ra')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Step handlers
const sendResetEmail = async () => {
  if (!validateEmail()) return

  loading.value = true
  try {
    // Gọi API gửi email reset password
    await apiCall('/forgot', 'POST', null, {
      email: form.email
    })
    
    // Chuyển sang step 2
    currentStep.value = 2
    
  } catch (error) {
    console.error('Error sending reset email:', error)
    errors.email = error.message || 'Có lỗi xảy ra khi gửi email. Vui lòng thử lại.'
  } finally {
    loading.value = false
  }
}

const validateTokens = async () => {
  if (!validateToken()) return

  loading.value = true
  try {
    // Gọi API xác thực token
    const response = await apiCall('/checkOTP', 'GET', null, {
      email: form.email,
      token: form.token
    })
    
    // Nếu token hợp lệ, chuyển sang step 3
    currentStep.value = 3
    
  } catch (error) {
    console.error('Error validating token:', error)
    errors.token = 'Mã xác nhận không hợp lệ hoặc đã hết hạn.'
  } finally {
    loading.value = false
  }
}

const resendEmail = async () => {
  loading.value = true
  try {
    // Gọi API gửi lại email
    await apiCall('/forgot', 'POST', null, {
      email: form.email
    })
    
    alert('Email đã được gửi lại thành công!')
    
  } catch (error) {
    console.error('Error resending email:', error)
    alert(error.message || 'Có lỗi xảy ra khi gửi lại email. Vui lòng thử lại.')
  } finally {
    loading.value = false
  }
}

const resetPassword = async () => {
  if (!validatePasswords()) return

  loading.value = true
  try {
    // Gọi API đặt lại mật khẩu
    await apiCall('/reset', 'POST', null, {
      email: form.email,
      token: form.token,
      newPassword: form.newPassword
    })
    
    // Hiển thị modal thành công
    showSuccessModal.value = true
    
  } catch (error) {
    console.error('Error resetting password:', error)
    alert(error.message || 'Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.')
  } finally {
    loading.value = false
  }
}

const closeForm = () => {
  emit('close')
}

const handleSuccessClose = () => {
  showSuccessModal.value = false
  emit('close')
  emit('open-login')
}

// Cleanup
onUnmounted(() => {
  // Cleanup nếu cần
})
</script>

<style scoped>
/* Hiệu ứng mờ cho overlay */
.bg-opacity-30 {
  backdrop-filter: blur(2px);
}

/* Success checkmark animation */
@keyframes checkmark {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-check {
  animation: checkmark 0.6s ease-in-out;
}

/* Progress step animation */
.step-transition {
  transition: all 0.3s ease-in-out;
}
</style>