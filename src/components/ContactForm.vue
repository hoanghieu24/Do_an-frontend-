<template>
  <section ref="contactSection" id="ContactSection"
    class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">

    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Contact Info Section -->
      <div :class="[
        'space-y-8 transform transition-all duration-700',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      ]">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-3 border border-emerald-200/60">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Liên hệ tư vấn</span>
          </div>
          <h2 :class="[
            'text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight transition-all duration-700 delay-100',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          ]">
            Đăng Ký Khảo Sát & Tư Vấn Mặt Bằng
          </h2>
          <p :class="[
            'text-base text-slate-500 leading-relaxed transition-all duration-700 delay-200',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          ]">
            Quý khách có nhu cầu thuê văn phòng hoặc cần báo giá chi tiết từng tòa nhà, vui lòng để lại thông tin để chuyên viên Hider liên hệ tư vấn trong 15 phút.
          </p>
        </div>

        <div class="space-y-4">
          <!-- Contact Item 1 -->
          <div class="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-200 transition-all">
            <div class="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mr-4 shrink-0">
              <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-slate-400 uppercase font-bold tracking-wider">Hotline tư vấn</p>
              <p class="text-base font-bold text-slate-900 font-mono">0867 198 647 (Mr. Hiếu)</p>
            </div>
          </div>

          <!-- Contact Item 2 -->
          <div class="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-200 transition-all">
            <div class="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mr-4 shrink-0">
              <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-slate-400 uppercase font-bold tracking-wider">Hòm thư hỗ trợ</p>
              <p class="text-base font-bold text-slate-900">hvan8677@gmail.com</p>
            </div>
          </div>

          <!-- Contact Item 3 -->
          <div class="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-200 transition-all">
            <div class="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mr-4 shrink-0">
              <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-slate-400 uppercase font-bold tracking-wider">Trụ sở chính</p>
              <p class="text-base font-bold text-slate-900">Tòa nhà Hider Building, TP. Vinh & TP. Hồ Chí Minh</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 3D Form Section -->
      <div :class="[
        'relative transition-all duration-700 delay-300',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      ]">
        <div
          class="relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <!-- Success/Error Messages -->
          <div v-if="showSuccessMessage"
            class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fade-in">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
              </svg>
              <span class="font-medium">Cảm ơn bạn! Tin nhắn đã được gửi thành công.</span>
            </div>
          </div>

          <div v-if="showErrorMessage"
            class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fade-in">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"></path>
              </svg>
              <span class="font-medium">{{ errorMessage }}</span>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="space-y-6">
            <div :class="[
              'transition-all duration-700 delay-400',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            ]">
              <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <input v-model="form.fullName" type="text" id="fullName" required :class="[
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:shadow-sm focus:shadow-md',
                errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
              ]" @input="clearError('fullName')">
              <p v-if="errors.fullName" class="mt-1 text-sm text-red-600">{{ errors.fullName }}</p>
            </div>
            <div :class="[
              'transition-all duration-700 delay-500',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            ]">
              <label for="email" class="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <input v-model="form.email" type="email" id="email" required :class="[
                'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200',
                errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'
              ]" @input="clearError('email')">
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
            </div>
            <div :class="[
              'transition-all duration-700 delay-600',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            ]">
              <label for="phone" class="block text-sm font-semibold text-slate-700 mb-1">Số điện thoại</label>
              <input v-model="form.phone" type="tel" id="phone" required :class="[
                'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200',
                errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'
              ]" @input="clearError('phone')">
              <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
            </div>
            <div :class="[
              'transition-all duration-700 delay-600',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            ]">
              <label for="building" class="block text-sm font-semibold text-slate-700 mb-1">
                Tòa nhà quan tâm <span class="text-red-500">*</span>
              </label>

              <select id="building" v-model="selectedBuildingId" @change="onBuildingChange" required :class="[
                'w-full px-4 py-3 border rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200',
                errors.building ? 'border-red-500 bg-red-50' : 'border-slate-200'
              ]" @input="clearError('building')">
                <option value="">--- Chọn tòa nhà khảo sát ---</option>
                <option v-for="building in buildings" :key="building.id" :value="building.id">
                  {{ building.nameBuilding }} - {{ building.address }}
                </option>
              </select>

              <p v-if="errors.building" class="mt-1 text-sm text-red-600">
                {{ errors.building }}
              </p>
            </div>

            <div :class="[
              'transition-all duration-700 delay-700',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            ]">
              <label for="demand" class="block text-sm font-semibold text-slate-700 mb-1">Nội dung nhu cầu</label>
              <textarea v-model="form.demand" id="demand" rows="4" required placeholder="Ví dụ: Cần thuê diện tích 200m2 từ tháng sau..." :class="[
                'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200',
                errors.demand ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'
              ]" @input="clearError('demand')"></textarea>
              <p v-if="errors.demand" class="mt-1 text-sm text-red-600">{{ errors.demand }}</p>
            </div>
            <button type="submit" :disabled="isSubmitting" :class="[
              'w-full px-6 py-4 text-white rounded-xl font-bold transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-95 flex items-center justify-center',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
              isSubmitting
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            ]">
              <span v-if="isSubmitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                Đang gửi...
              </span>
              <span v-else class="flex items-center">
                <span class="mr-2">Gửi liên hệ</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3">
                  </path>
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
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

/* ===================== STATE ===================== */
const contactSection = ref(null)
const isVisible = ref(false)

const buildings = ref([])
const selectedBuildingId = ref(null)
const selectedBuilding = ref(null)

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  demand: ''
})

const errors = reactive({
  fullName: '',
  email: '',
  phone: '',
  demand: '',
  building: ''
})

const isSubmitting = ref(false)
const showSuccessMessage = ref(false)
const showErrorMessage = ref(false)
const errorMessage = ref('')
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  if (contactSection.value) {
    observer.observe(contactSection.value)
  }

  loadBuildings()
})

onUnmounted(() => {
  if (observer && contactSection.value) {
    observer.unobserve(contactSection.value)
  }
})

const loadBuildings = async () => {
  try {
    const response = await axios.get('/api/buildings')
    buildings.value = response.data
  } catch (error) {
    console.error('Lỗi khi tải danh sách tòa nhà:', error)
  }
}

const findSelectedBuilding = () => {
  selectedBuilding.value = buildings.value.find(
    b => b.id === selectedBuildingId.value
  )
}

const onBuildingChange = () => {
  clearError('building')
  findSelectedBuilding()
}

const validateForm = () => {
  let isValid = true

  Object.keys(errors).forEach(key => errors[key] = '')

  if (!form.fullName.trim()) {
    errors.fullName = 'Vui lòng nhập họ và tên'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Vui lòng nhập email'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Email không hợp lệ'
    isValid = false
  }

  if (!form.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại'
    isValid = false
  } else if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(form.phone)) {
    errors.phone = 'Số điện thoại không hợp lệ'
    isValid = false
  }

  if (!selectedBuildingId.value) {
    errors.building = 'Vui lòng chọn tòa nhà'
    isValid = false
  }

  if (!form.demand.trim()) {
    errors.demand = 'Vui lòng nhập nội dung'
    isValid = false
  }

  return isValid
}

const clearError = (field) => {
  errors[field] = ''
}

const submitForm = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  showSuccessMessage.value = false
  showErrorMessage.value = false

  try {
    const response = await fetch('/api/customers/nologin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        buildingId: selectedBuildingId.value,
        timestamp: new Date().toISOString(),
        status: 'CHUA_XU_LY'
      })
    })

    if (!response.ok) throw new Error('Gửi thất bại')

    showSuccessMessage.value = true

    Object.keys(form).forEach(key => form[key] = '')
    selectedBuildingId.value = null

    setTimeout(() => showSuccessMessage.value = false, 5000)
  } catch (error) {
    showErrorMessage.value = true
    errorMessage.value = error.message || 'Có lỗi xảy ra'
    setTimeout(() => showErrorMessage.value = false, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>


<style scoped>
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
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

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-tilt {
  animation: tilt 10s infinite;
}

/* Transition delays */
.delay-100 {
  transition-delay: 100ms;
}

.delay-200 {
  transition-delay: 200ms;
}

.delay-300 {
  transition-delay: 300ms;
}

.delay-400 {
  transition-delay: 400ms;
}

.delay-500 {
  transition-delay: 500ms;
}

.delay-600 {
  transition-delay: 600ms;
}

.delay-700 {
  transition-delay: 700ms;
}

.delay-800 {
  transition-delay: 800ms;
}
</style>