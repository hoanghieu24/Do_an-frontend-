<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-white relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div class="absolute top-20 right-10 w-32 h-32 rounded-full bg-indigo-100 opacity-40 animate-float1"></div>
      <div class="absolute bottom-10 left-1/4 w-24 h-24 rounded-lg bg-indigo-200 opacity-20 animate-float2"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="bg-white p-8 rounded-2xl shadow-xl border border-indigo-100 transform transition-all duration-500 hover:shadow-2xl">
        <div class="mb-6 text-center">
          <h3 class="text-2xl font-bold text-indigo-900 mb-2 animate-text-pop">Tìm kiếm bất động sản</h3>
          <p class="text-indigo-600 opacity-0 animate-fade-in" style="animation-delay: 0.3s">Tìm ngôi nhà mơ ước của bạn với bộ lọc thông minh</p>
        </div>
        
        <form @submit.prevent="handleSearch" class="transform transition-all duration-300 hover:scale-[1.005]">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Property Type -->
            <div class="relative group">
              <label class="block text-sm font-medium text-indigo-800 mb-2 transition-all duration-300 group-hover:text-indigo-600">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  Loại hình
                </span>
              </label>
              <select 
                v-model="searchCriteria.type"
                class="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300 appearance-none  bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.5rem_1.5rem]"
              >
                <option value="">Tất cả loại hình</option>
                <option value="Căn hộ">Căn hộ</option>
                <option value="Nhà phố">Nhà phố</option>
                <option value="Biệt thự">Biệt thự</option>
                <option value="Đất nền">Đất nền</option>
                <option value="Văn phòng">Văn phòng</option>
              </select>
            </div>

            <!-- Location -->
            <div class="relative group">
              <label class="block text-sm font-medium text-indigo-800 mb-2 transition-all duration-300 group-hover:text-indigo-600">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Khu vực
                </span>
              </label>
              <select 
                v-model="searchCriteria.location"
                class="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300 appearance-none  bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.5rem_1.5rem]"
              >
                <option value="">Tất cả khu vực</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP.HCM">TP.HCM</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Nha Trang">Nha Trang</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Cần Thơ">Cần Thơ</option>
              </select>
            </div>

            <!-- Price Range -->
            <div class="relative group">
              <label class="block text-sm font-medium text-indigo-800 mb-2 transition-all duration-300 group-hover:text-indigo-600">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Mức giá
                </span>
              </label>
              <select 
                v-model="searchCriteria.price"
                class="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300 appearance-none  bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.5rem_1.5rem]"
              >
                <option value="">Tất cả mức giá</option>
                <option value="0-1000000000">Dưới 1 tỷ</option>
                <option value="1000000000-3000000000">1 - 3 tỷ</option>
                <option value="3000000000-5000000000">3 - 5 tỷ</option>
                <option value="5000000000-10000000000">5 - 10 tỷ</option>
                <option value="10000000000-">Trên 10 tỷ</option>
              </select>
            </div>

            <!-- Search Button -->
            <div class="flex items-end">
              <button 
                type="submit"
                class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-black px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center group"
              >
                <span class="mr-2">Tìm kiếm</span>
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const searchCriteria = ref({
  type: '',
  location: '',
  price: ''
})

const emit = defineEmits(['search'])

const handleSearch = () => {
  emit('search', searchCriteria.value)
  
  // Animation feedback
  const form = document.querySelector('form')
  form.classList.add('animate-pulse')
  setTimeout(() => {
    form.classList.remove('animate-pulse')
  }, 300)
}
</script>

<style scoped>
/* Floating animation for decorative elements */
@keyframes float1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(10px, 15px) rotate(2deg); }
}

@keyframes float2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-5px, 10px) rotate(-1deg); }
}

.animate-float1 {
  animation: float1 8s ease-in-out infinite;
}

.animate-float2 {
  animation: float2 10s ease-in-out infinite;
}

/* Text pop animation */
@keyframes textPop {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-text-pop {
  animation: textPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* Fade in animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

/* Custom select arrow */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
}

/* Pulse animation for form feedback */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.01); }
}

.animate-pulse {
  animation: pulse 0.3s ease-in-out;
}
</style>