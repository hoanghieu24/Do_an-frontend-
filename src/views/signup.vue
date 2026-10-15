<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-center justify-center p-4" @click.self="closeForm"
    style="margin-top: 30px;">
    <div class="bg-white rounded-2xl px-6 py-3 shadow-xl max-h-[90vh] w-full  max-w-lg overflow-y-auto">

      <div
        class="bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.01]">
        <!-- Header với hiệu ứng gradient -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center relative">
          <button @click="closeForm" class="absolute top-3 right-3 text-white hover:text-indigo-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 class="text-3xl font-bold text-white">Đăng ký</h1>
          <p class="text-indigo-100 mt-2">Tạo tài khoản mới!</p>
        </div>

        <!-- Form đăng ký -->
        <form @submit.prevent="handleRegister" class="p-8 space-y-6">

          <!-- Tên đăng nhập -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Tên đăng nhập *</label>
            <div class="relative">
              <input v-model="form.userName" type="text" required placeholder="Nhập tên đăng nhập"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                :class="{ 'border-red-500': errors.userName }">
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <small v-if="errors.userName" class="text-red-500 text-sm">{{ errors.userName }}</small>
          </div>

          <!-- Họ và tên -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Họ và tên *</label>
            <div class="relative">
              <input v-model="form.fullName" type="text" required placeholder="Nhập họ và tên"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                :class="{ 'border-red-500': errors.fullName }">
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <small v-if="errors.fullName" class="text-red-500 text-sm">{{ errors.fullName }}</small>
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Email *</label>
            <div class="relative">
              <input v-model="form.email" type="email" required placeholder="your@email.com"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Mật khẩu -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Mật khẩu *</label>
            <div class="relative">
              <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required placeholder="••••••••"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                :class="{ 'border-red-500': errors.password }">
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Nhập lại mật khẩu -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Nhập lại mật khẩu *</label>
            <div class="relative">
              <input v-model="form.passwordConfirm" :type="showPasswordConfirm ? 'text' : 'password'" required
                placeholder="••••••••"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                :class="{ 'border-red-500': errors.passwordConfirm }">
              <button type="button" @click="showPasswordConfirm = !showPasswordConfirm"
                class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="showPasswordConfirm" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path v-if="showPasswordConfirm" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <small v-if="errors.passwordConfirm" class="text-red-500 text-sm">{{ errors.passwordConfirm }}</small>
          </div>

          <!-- Điều khoản sử dụng -->
          <div class="space-y-2">
            <div class="flex items-start">
              <input id="termsCheck" v-model="form.termsCheck" type="checkbox" required
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                :class="{ 'border-red-500': errors.termsCheck }">
              <label for="termsCheck" class="ml-2 block text-sm text-gray-700">
                Tôi đồng ý với <a href="#!" class="text-indigo-600 hover:text-indigo-500"><u>Điều khoản sử dụng</u></a>
              </label>
            </div>
            <small v-if="errors.termsCheck" class="text-red-500 text-sm">{{ errors.termsCheck }}</small>
          </div>

          <!-- Đăng ký làm người bán -->
          <div class="flex items-start space-x-2">
            <input id="registerSeller" type="checkbox" v-model="form.registerSeller"
              class="h-4 w-4 text-indigo-600 border-gray-300 rounded mt-1">
            <label for="registerSeller" class="text-sm text-gray-700">
              Tôi muốn đăng ký làm <span class="font-semibold text-indigo-600">Người bán / Nhân viên</span>
            </label>
          </div>

          <!-- Thông tin thêm cho seller -->
          <div v-if="form.registerSeller" class="space-y-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <h3 class="font-medium text-indigo-800">Thông tin bổ sung cho người bán</h3>
            
            <!-- Số điện thoại -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Số điện thoại *</label>
              <div class="relative">
                <input v-model="form.phoneNumber" type="tel" placeholder="Nhập số điện thoại"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  :class="{ 'border-red-500': errors.phoneNumber }">
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <small v-if="errors.phoneNumber" class="text-red-500 text-sm">{{ errors.phoneNumber }}</small>
            </div>

            <!-- Địa chỉ -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Địa chỉ *</label>
              <div class="relative">
                <input v-model="form.address" type="text" placeholder="Nhập địa chỉ"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  :class="{ 'border-red-500': errors.address }">
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <small v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</small>
            </div>

            <!-- Mô tả -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Mô tả / Thông tin thêm</label>
              <textarea v-model="form.description" rows="3" placeholder="Giới thiệu về bản thân, kinh nghiệm..."
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"></textarea>
            </div>

            <!-- Lưu ý -->
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-yellow-700">
                    Yêu cầu đăng ký seller sẽ được admin xem xét và phê duyệt. Bạn sẽ nhận được thông báo khi yêu cầu được xử lý.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Nút đăng ký -->
          <button type="submit" :disabled="loading"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
            :class="{ 'opacity-75 cursor-not-allowed': loading }">
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ loading ? 'Đang đăng ký...' : 'Đăng ký' }}
          </button>
          
          <!-- Hiển thị lỗi API -->
          <div v-if="errors.apiError" class="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600">{{ errors.apiError }}</p>
          </div>
        </form>

        <!-- Footer -->
        <div class="bg-gray-50 px-8 py-6 text-center">
          <p class="text-sm text-gray-600">
            Đã có tài khoản?
            <a href="#" @click.prevent="switchToLogin" class="font-medium text-indigo-600 hover:text-indigo-500">
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-auto transform transition-all duration-300 scale-100">
        <div class="p-6 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{ form.registerSeller ? 'Yêu cầu đăng ký seller đã được gửi!' : 'Đăng ký thành công!' }}
          </h3>
          <p class="text-gray-600 mb-6">
            {{ form.registerSeller 
              ? 'Tài khoản của bạn đã được tạo. Yêu cầu đăng ký seller sẽ được admin xem xét trong thời gian sớm nhất.' 
              : 'Tài khoản của bạn đã được tạo thành công.' }}
          </p>
          <button @click="handleSuccessClose"
            class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['close', 'switch-to-login', 'open-login'])
const toast = useToast()

const form = reactive({
  userName: '',
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  termsCheck: false,
  roleCode: 'USER',
  registerSeller: false,
  phoneNumber: '',
  address: '',
  description: ''
})

const errors = reactive({
  userName: '',
  fullName: '',
  passwordConfirm: '',
  termsCheck: '',
  phoneNumber: '',
  address: '',
  apiError: ''
})

const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const loading = ref(false)
const showSuccessModal = ref(false)

const closeForm = () => emit('close')
const switchToLogin = () => emit('switch-to-login')

// Reset thông tin seller khi bỏ tích
watch(() => form.registerSeller, (newValue) => {
  if (!newValue) {
    form.phoneNumber = ''
    form.address = ''
    form.description = ''
  }
})

// Validation
const validateName = () => {
  let isValid = true
  if (!form.userName.trim()) {
    errors.userName = 'Tên đăng nhập không được để trống!'
    isValid = false
  } else errors.userName = ''

  if (!form.fullName.trim()) {
    errors.fullName = 'Họ và tên không được để trống!'
    isValid = false
  } else errors.fullName = ''

  return isValid
}

const validatePasswords = () => {
  if (form.password !== form.passwordConfirm) {
    errors.passwordConfirm = 'Mật khẩu không trùng khớp!'
    return false
  } else {
    errors.passwordConfirm = ''
    return true
  }
}

const validateTerms = () => {
  if (!form.termsCheck) {
    errors.termsCheck = 'Bạn phải chấp nhận điều khoản sử dụng!'
    return false
  } else {
    errors.termsCheck = ''
    return true
  }
}

const validateSellerInfo = () => {
  if (!form.registerSeller) return true

  let isValid = true
  
  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = 'Số điện thoại không được để trống!'
    isValid = false
  } else if (!/^[0-9]{10,11}$/.test(form.phoneNumber.trim())) {
    errors.phoneNumber = 'Số điện thoại không hợp lệ!'
    isValid = false
  } else {
    errors.phoneNumber = ''
  }

  if (!form.address.trim()) {
    errors.address = 'Địa chỉ không được để trống!'
    isValid = false
  } else {
    errors.address = ''
  }

  return isValid
}

const handleRegister = async () => {
  // Reset errors
  Object.keys(errors).forEach(k => (errors[k] = ''))

  if (!validateName() || !validatePasswords() || !validateTerms() || !validateSellerInfo()) return

  loading.value = true

  try {
    // 1. Đăng ký tài khoản người dùng
    const registerData = {
      userName: form.userName.trim(),
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      roleCode: 'USER',
    }

    console.log('👉 Sending register data:', registerData)

    const userRes = await axios.post('/api/users', registerData)

    if (userRes.status === 200 || userRes.status === 201) {
      // Cố gắng lấy userId từ nhiều định dạng response khác nhau
      let userId = null
      
      if (userRes.data.id) {
        userId = userRes.data.id
      } else if (userRes.data.userId) {
        userId = userRes.data.userId
      } else if (userRes.data.data?.id) {
        userId = userRes.data.data.id
      } else if (userRes.data.data?.userId) {
        userId = userRes.data.data.userId
      }
      
      console.log('✅ User created, userId:', userId)
      
      // 2. Nếu người dùng muốn đăng ký seller và có userId
      if (form.registerSeller && userId) {
        try {
          const sellerRequestData = {
            userId: userId,
            userName: form.userName.trim(),
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            phoneNumber: form.phoneNumber.trim(),
            address: form.address.trim(),
            description: form.description.trim(),
            status: 'PENDING'
          }

          console.log('👉 Sending seller request:', sellerRequestData)
          
          // Gửi yêu cầu đăng ký seller
          await axios.post('/api/seller-requests/', sellerRequestData)
          
          toast.info('🔔 Đã gửi yêu cầu đăng ký seller! Vui lòng chờ xác nhận từ quản trị viên.')
        } catch (sellerError) {
          console.error('❌ Seller request error:', sellerError)
          // Vẫn hiển thị thành công đăng ký tài khoản
          toast.warning('⚠️ Tài khoản đã được tạo nhưng có lỗi khi gửi yêu cầu seller. Vui lòng liên hệ admin.')
        }
      } else if (form.registerSeller && !userId) {
        console.warn('⚠️ Không thể lấy userId để tạo seller request')
        toast.warning('⚠️ Tài khoản đã được tạo nhưng không thể gửi yêu cầu seller. Vui lòng liên hệ admin.')
      } else {
        toast.success('🎉 Đăng ký thành công!')
      }

      showSuccessModal.value = true
    } else {
      errors.apiError = 'Đăng ký thất bại. Vui lòng thử lại.'
    }
  } catch (err) {
    console.error('❌ Registration error:', err)
    console.error('❌ Error details:', err.response?.data)
    
    // Hiển thị thông báo lỗi chi tiết hơn
    if (err.response?.data) {
      if (err.response.data.message) {
        errors.apiError = err.response.data.message
      } else if (err.response.data.errors) {
        // Xử lý validation errors từ API
        const errorMessages = []
        Object.entries(err.response.data.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            errorMessages.push(...messages)
          } else {
            errorMessages.push(messages)
          }
        })
        errors.apiError = errorMessages.join(', ')
      } else if (typeof err.response.data === 'string') {
        errors.apiError = err.response.data
      } else {
        errors.apiError = 'Có lỗi xảy ra khi đăng ký'
      }
    } else if (err.message) {
      errors.apiError = err.message
    } else {
      errors.apiError = 'Có lỗi xảy ra khi đăng ký. Hãy thử lại sau.'
    }
  } finally {
    loading.value = false
  }
}

const handleSuccessClose = () => {
  showSuccessModal.value = false
  emit('close')
  emit('open-login')
}
</script>

<style scoped>
/* Hiệu ứng khi hover card */
.transition-all:hover {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Animation cho modal success */
.scale-100 {
  transform: scale(1);
}

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

/* Smooth transition cho form seller */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, max-height 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>