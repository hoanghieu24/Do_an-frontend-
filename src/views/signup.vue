<template>
    
    <div 
      class="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-center justify-center p-4"
      @click.self="closeForm"
    >
      <div class="w-full max-w-md">
        
        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.01]">
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
            <h1 class="text-3xl font-bold text-white">Đăng ký</h1>
            <p class="text-indigo-100 mt-2">Chào mừng trở lại!</p>
          </div>
  
        
          <form @submit.prevent="handleLogin" class="p-8 space-y-6">
            
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <div class="relative">
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">User</label>
                <div class="relative">
                  <input
                    v-model="form.user"
                    type="text"
                    required
                    placeholder="your@email.com"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  >
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>
  
            
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="••••••••"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Nhập lại Mật khẩu</label>
                <div class="relative">
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    placeholder="••••••••"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  >
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
              </div>
  
            <!-- Remember & Forgot -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="form.remember"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                >
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">Ghi nhớ đăng nhập</label>
              </div>
              <router-link to="/forgot-password" class="text-sm text-indigo-600 hover:text-indigo-500">
                Quên mật khẩu?
              </router-link>
            </div>
  
            <!-- Nút đăng nhập -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              :class="{'opacity-75 cursor-not-allowed': loading}"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
            </button>
          </form>
  
          <!-- Footer -->
          <div class="bg-gray-50 px-8 py-6 text-center">
            <p class="text-sm text-gray-600">
              Chưa có tài khoản?
              <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
                Đăng ký ngay
              </router-link>
            </p>
          </div>
        </div>
  
        <!-- Social login -->
        <div class="mt-6 grid grid-cols-3 gap-3">
          <button
            v-for="(provider, index) in socialProviders"
            :key="index"
            @click="socialLogin(provider.name)"
            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            <component :is="provider.icon" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  // import { FacebookIcon, GoogleIcon, GithubIcon } from '@/components/icons' // Bạn cần tạo các icon này
  
  const emit = defineEmits(['close'])
  
  const form = ref({
    email: '',
    password: '',
    remember: false
  })
  
  const showPassword = ref(false)
  const loading = ref(false)
  
  // const socialProviders = [
  //   { name: 'google', icon: GoogleIcon },
  //   { name: 'facebook', icon: FacebookIcon },
  //   { name: 'github', icon: GithubIcon }
  // ]
  
  const closeForm = () => {
    emit('close')
  }
  
  const handleLogin = async () => {
    loading.value = true
    try {
      // Xử lý đăng nhập ở đây
      console.log('Login data:', form.value)
      await new Promise(resolve => setTimeout(resolve, 1500)) // Giả lập API call
    } finally {
      loading.value = false
    }
  }
  
  const socialLogin = (provider) => {
    console.log('Login with:', provider)
  }
  </script>
  
  <style scoped>
  /* Hiệu ứng khi hover card */
  .transition-all:hover {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }
  
  /* Animation cho nút đăng nhập */
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .bg-indigo-600:hover {
    animation: pulse 1.5s infinite;
  }
  
  /* Hiệu ứng mờ cho overlay */
  .bg-opacity-30 {
    backdrop-filter: blur(2px);
  }
  </style>