<template>
  <div class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm" @click.self="onClose">
    <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Top Action Bar -->
      <div class="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          @click="onClose"
          class="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md shadow-lg transition-transform hover:scale-105 active:scale-95"
          title="Đóng cửa sổ"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Scrollable Container -->
      <div class="overflow-y-auto flex-1 custom-scrollbar">
        <!-- Hero Image Section -->
        <div class="relative w-full h-72 sm:h-96 bg-slate-900 overflow-hidden">
          <img
            :src="getImageUrl(buildingData.image)"
            :alt="buildingData.nameBuilding"
            class="w-full h-full object-cover"
            @error="onImageError"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

          <!-- VR 360 CTA Button right on image -->
          <div class="absolute top-4 left-4 z-10">
            <button
              @click="openVRDirect"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-xl backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 border border-emerald-400/40"
            >
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping"></span>
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Trải nghiệm Tour VR 360°</span>
            </button>
          </div>

          <!-- Bottom Title & Price on Hero -->
          <div class="absolute bottom-6 left-6 right-6 text-white">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-600 text-white shadow-xs">
                {{ buildingData.buildingType || 'Văn phòng cho thuê' }}
              </span>
              <span v-if="buildingData.district" class="px-2.5 py-1 rounded-md text-xs font-medium bg-white/20 text-white backdrop-blur-md">
                📍 {{ buildingData.district }}
              </span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-1.5 drop-shadow-md">
              {{ buildingData.nameBuilding || 'Chi tiết bất động sản' }}
            </h2>
            <p class="text-sm sm:text-base text-slate-200 flex items-center opacity-90">
              <svg class="w-4 h-4 mr-1.5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ buildingData.address || 'Đang cập nhật địa chỉ' }}
            </p>
          </div>
        </div>

        <!-- Body Content -->
        <div class="p-6 sm:p-8 space-y-8 bg-white">
          <!-- Price & Key Highlights Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span class="text-xs text-slate-500 font-medium block mb-1">Giá thuê tham khảo</span>
              <span class="text-lg sm:text-xl font-extrabold text-emerald-600">
                {{ formattedPrice }}
              </span>
            </div>
            <div>
              <span class="text-xs text-slate-500 font-medium block mb-1">Diện tích sàn</span>
              <span class="text-lg font-bold text-slate-900">
                {{ buildingData.floorarea ? `${buildingData.floorarea} m²` : '---' }}
              </span>
            </div>
            <div>
              <span class="text-xs text-slate-500 font-medium block mb-1">Quy mô tầng hầm</span>
              <span class="text-lg font-bold text-slate-900">
                {{ buildingData.numberOfBasement != null ? `${buildingData.numberOfBasement} Hầm` : '1 Hầm' }}
              </span>
            </div>
            <div>
              <span class="text-xs text-slate-500 font-medium block mb-1">Hướng tòa nhà</span>
              <span class="text-lg font-bold text-slate-900">
                {{ buildingData.direction || buildingData.buildingDirection || 'Đông Nam' }}
              </span>
            </div>
          </div>

          <!-- Thông số kỹ thuật chi tiết -->
          <div>
            <h3 class="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center">
              <svg class="w-5 h-5 mr-2 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Thông số kỹ thuật & Chi phí vận hành
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div
                v-for="(spec, index) in specifications"
                :key="index"
                class="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <div class="text-xs text-slate-500 font-medium mb-1">{{ spec.label }}</div>
                <div class="text-sm font-semibold text-slate-900">{{ spec.value }}</div>
              </div>
            </div>
          </div>

          <!-- Ghi chú / Mô tả bổ sung -->
          <div v-if="buildingData.note">
            <h3 class="text-lg font-bold text-slate-900 mb-2">Thông tin bổ sung</h3>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 whitespace-pre-line leading-relaxed">
              {{ buildingData.note }}
            </div>
          </div>

          <!-- Chuyên viên phụ trách & Liên hệ tư vấn -->
          <div class="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-emerald-600/30 border border-emerald-400/30 flex items-center justify-center text-emerald-300 font-bold text-xl">
                  {{ (buildingData.managername || 'H').charAt(0).toUpperCase() }}
                </div>
                <div>
                  <div class="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Chuyên viên tư vấn phụ trách</div>
                  <h4 class="text-lg font-bold text-white">{{ buildingData.managername || 'Ban Quản Lý Tòa Nhà' }}</h4>
                  <p class="text-sm text-slate-300">
                    Hotline: <span class="font-mono text-emerald-300 font-bold">{{ buildingData.managerphone || buildingData.managerPhoneNumber || '0867 198 647' }}</span>
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <a
                  :href="`tel:${buildingData.managerphone || buildingData.managerPhoneNumber || '0867198647'}`"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Gọi Hotline</span>
                </a>
                <button
                  type="button"
                  @click="openBrokerChat"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition-all transform hover:scale-105 active:scale-95 border border-emerald-400/30 cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Chat với môi giới</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky Footer Actions -->
      <div class="p-4 px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="text-xs text-slate-500">
          * Đơn giá và diện tích trống có thể thay đổi theo thời điểm thực tế.
        </div>
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            @click="openVRDirect"
            class="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-bold border border-emerald-300 transition-all flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Xem VR 360°</span>
          </button>
          <button
            type="button"
            @click="onClose"
            class="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-all"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  property: {
    type: Object,
    default: null
  },
  buildingId: {
    type: [Number, String],
    default: null
  },
  show: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close', 'open-vr', 'chat-with-broker'])

const defaultImage = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
const buildingData = ref(props.property || {})

// Watch property prop
watch(() => props.property, async (newVal) => {
  if (newVal) {
    buildingData.value = { ...newVal }
    const targetId = newVal.id || newVal.buildingId
    // Nếu thiếu thông tin quản lý, địa chỉ hoặc diện tích, tự động tải chi tiết đầy đủ
    if (targetId && (!newVal.address || !newVal.managername || !newVal.managerphone || !newVal.floorarea)) {
      try {
        const res = await axios.get(`/api/buildings/${targetId}`)
        if (res.data) {
          buildingData.value = { ...buildingData.value, ...res.data }
        }
      } catch (err) {
        console.error('Lỗi khi tải chi tiết building:', err)
      }
    }
  }
}, { immediate: true, deep: true })

// Watch buildingId prop
watch(() => props.buildingId, async (newId) => {
  if (newId) {
    try {
      const res = await axios.get(`/api/buildings/${newId}`)
      if (res.data) buildingData.value = res.data
    } catch (err) {
      console.error('Lỗi khi tải building data:', err)
    }
  }
}, { immediate: true })

onMounted(async () => {
  if (!props.property && props.buildingId) {
    try {
      const res = await axios.get(`/api/buildings/${props.buildingId}`)
      if (res.data) buildingData.value = res.data
    } catch (err) {
      console.error('Lỗi khi tải building data:', err)
    }
  }
})

const getImageUrl = (path) => {
  if (!path) return defaultImage
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `/img/${cleanPath}`
}

const onImageError = (e) => {
  e.target.src = defaultImage
}

const formattedPrice = computed(() => {
  const p = buildingData.value.rentPrice
  if (!p) return 'Liên hệ'
  const num = Number(p)
  if (isNaN(num)) return p
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(num)
})

const formatCurrency = (val) => {
  if (!val) return '---'
  const num = Number(val)
  if (isNaN(num)) return val
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(num)
}

const specifications = computed(() => [
  { label: 'Diện tích sàn', value: buildingData.value.floorarea ? `${buildingData.value.floorarea} m²` : '---' },
  { label: 'Số tầng hầm', value: buildingData.value.numberOfBasement != null ? `${buildingData.value.numberOfBasement} Hầm` : '---' },
  { label: 'Loại hình tòa nhà', value: buildingData.value.buildingType || buildingData.value.typeCode || 'Văn phòng' },
  { label: 'Hướng tòa nhà', value: buildingData.value.direction || buildingData.value.buildingDirection || '---' },
  { label: 'Kết cấu kiến trúc', value: buildingData.value.buildingStructure || 'Khung thép & Bê tông cốt thép' },
  { label: 'Thời hạn thuê tối thiểu', value: buildingData.value.rentTime ? `${buildingData.value.rentTime} tháng` : '36 tháng' },
  { label: 'Phí dịch vụ', value: formatCurrency(buildingData.value.serviceFee || buildingData.value.servicefee) },
  { label: 'Tiền đặt cọc', value: formatCurrency(buildingData.value.depositFee || buildingData.value.deposit) },
  { label: 'Phí gửi xe máy', value: formatCurrency(buildingData.value.motoFee) },
  { label: 'Phí gửi ô tô', value: formatCurrency(buildingData.value.carFee) },
  { label: 'Diện tích cho thuê', value: buildingData.value.rentalArea ? `${buildingData.value.rentalArea} m²` : 'Đang cập nhật' },
  { label: 'Chuyên viên quản lý', value: buildingData.value.managername || 'BĐS Hider' }
])

const onClose = () => emit('close')

const openVRDirect = () => {
  const bId = buildingData.value.id || props.buildingId
  if (bId) {
    window.open(`/vtour/pannellum.html?buildingId=${bId}`, '_blank')
  }
}

const openBrokerChat = () => {
  const b = buildingData.value || {}
  const bId = b.id || props.buildingId
  emit('chat-with-broker', {
    id: bId,
    buildingId: bId,
    name: b.nameBuilding || b.name,
    nameBuilding: b.nameBuilding || b.name,
    managerName: b.managername || b.managerName,
    managerPhone: b.managerphone || b.managerPhoneNumber,
    rentPrice: b.rentPrice,
    address: b.address,
    image: b.image,
    building: b
  })
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}
</style>