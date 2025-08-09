<template>
  <section id="ContactSection" class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
    <!-- Floating background elements -->
    <div class="absolute -top-20 -left-20 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div class="absolute -bottom-40 -right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    <div class="absolute top-1/2 left-1/4 w-60 h-60 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Contact Info Section -->
      <div class="space-y-8 transform transition-all duration-500 hover:scale-[1.01]">
        <div>
          <h2 class="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">Liên hệ với chúng tôi</h2>
          <p class="text-lg text-gray-600 mb-8 animate-fade-in-up animate-delay-100">
            Bạn có câu hỏi hoặc cần tư vấn? Hãy để lại thông tin, chúng tôi sẽ liên hệ lại ngay!
          </p>
        </div>
        
        <div class="space-y-6">
          <!-- Contact Item 1 -->
          <div class="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up animate-delay-200 group hover:-translate-y-1">
            <div class="bg-indigo-600 p-3 rounded-full mr-4 group-hover:rotate-[15deg] transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500">Hotline</p>
              <p class="text-lg font-medium text-gray-800">0867198647 (Mr.Hiếu) </p>
            </div>
          </div>
          
          <!-- Contact Item 2 -->
          <div class="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up animate-delay-300 group hover:-translate-y-1">
            <div class="bg-indigo-600 p-3 rounded-full mr-4 group-hover:rotate-[15deg] transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500">Email</p>
              <p class="text-lg font-medium text-gray-800">hvan8677@gmail.com</p>
            </div>
          </div>
          
          <!-- Contact Item 3 -->
          <div class="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up animate-delay-400 group hover:-translate-y-1">
            <div class="bg-indigo-600 p-3 rounded-full mr-4 group-hover:rotate-[15deg] transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500">Địa chỉ</p>
              <p class="text-lg font-medium text-gray-800">Thành Phố Vinh , Tỉnh Nghệ An</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 3D Form Section -->
      <div class="relative">
        <div class="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition duration-1000 animate-tilt"></div>
        <div class="relative bg-black p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-[1.01] group">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="animate-fade-in-up animate-delay-200">
              <label style="background-color: aliceblue;" for="name" class="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <input style="background-color: aliceblue;"
                v-model="form.name"
                type="text" 
                id="name"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:shadow-sm focus:shadow-md"
              >
            </div>
            <div class="animate-fade-in-up animate-delay-300">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                v-model="form.email"
                type="email" 
                id="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:shadow-sm focus:shadow-md"
              >
            </div>
            <div class="animate-fade-in-up animate-delay-400">
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input 
                v-model="form.phone"
                type="tel" 
                id="phone"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:shadow-sm focus:shadow-md"
              >
            </div>
            <div class="animate-fade-in-up animate-delay-500">
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
              <textarea 
                v-model="form.message"
                id="message"
                rows="4"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:shadow-sm focus:shadow-md"
              ></textarea>
            </div>
            <button 
              type="submit"
              class="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-500 shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0 animate-fade-in-up animate-delay-600"
            >
              <span class="flex items-center justify-center">
                <span class="mr-2">Gửi liên hệ</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const submitForm = () => {
  // Handle form submission
  alert(`Cảm ơn bạn ${form.value.name} đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.`)
  form.value = {
    name: '',
    email: '',
    phone: '',
    message: ''
  }
}
</script>

<style>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes tilt {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1deg);
  }
  75% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-delay-100 {
  animation-delay: 0.1s;
}

.animate-delay-200 {
  animation-delay: 0.2s;
}

.animate-delay-300 {
  animation-delay: 0.3s;
}

.animate-delay-400 {
  animation-delay: 0.4s;
}

.animate-delay-500 {
  animation-delay: 0.5s;
}

.animate-delay-600 {
  animation-delay: 0.6s;
}

.animate-tilt {
  animation: tilt 10s infinite;
}
</style>