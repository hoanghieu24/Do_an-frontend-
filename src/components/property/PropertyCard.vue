<template>
  <div
    class="property-card group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full"
  >
    <!-- Hình ảnh & Badges -->
    <div class="relative h-56 w-full overflow-hidden bg-slate-100 shrink-0">
      <img
        :src="getImageUrl(property.image)"
        :alt="property.nameBuilding"
        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        @error="onImageError"
      />

      <!-- Gradient overlay phía trên và dưới ảnh -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 pointer-events-none"></div>

      <!-- Top Badges -->
      <div class="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
        <!-- Badge Loại hình -->
        <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900/85 text-white backdrop-blur-md shadow-xs border border-white/10">
          {{ displayType }}
        </span>

        <!-- Badge Quận / Khu vực -->
        <span v-if="displayDistrict" class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/95 text-slate-800 backdrop-blur-md shadow-xs border border-slate-200/60">
          <svg class="w-3 h-3 mr-1 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ displayDistrict }}
        </span>
      </div>

      <!-- Top Right: Nút Yêu thích -->
      <button
        @click.stop="toggleFavorite"
        class="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md transition-all duration-200 z-10 hover:scale-110 active:scale-95"
        :aria-label="isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'"
      >
        <svg
          class="w-4 h-4 transition-colors"
          :class="{
            'text-rose-500 fill-rose-500': isFavorite,
            'text-slate-600 fill-transparent': !isFavorite
          }"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <!-- Bottom Overlay: Badge VR 360° -->
      <div class="absolute bottom-3 right-3 z-10">
        <button
          @click.stop="handleOpenVR"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-600/90 hover:bg-emerald-600 text-white shadow-lg backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 border border-emerald-400/40"
          title="Trải nghiệm thực tế ảo VR 360°"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Tour VR 360°</span>
        </button>
      </div>

      <!-- Bottom Overlay: Giá thuê nổi bật -->
      <div class="absolute bottom-3 left-3 z-10">
        <div class="text-white drop-shadow-md">
          <span class="text-xs uppercase tracking-wider text-slate-200 font-medium block">Giá thuê</span>
          <span class="text-lg font-extrabold text-emerald-300">
            {{ formatPriceShort(property.rentPrice) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Thông tin chi tiết -->
    <div class="p-5 flex flex-col flex-1 justify-between bg-white">
      <div>
        <!-- Tên tòa nhà -->
        <h3
          class="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1.5 cursor-pointer"
          :title="property.nameBuilding"
          @click="handleOpenModal"
        >
          {{ property.nameBuilding }}
        </h3>

        <!-- Địa chỉ -->
        <div class="flex items-start text-slate-500 text-xs mb-4">
          <svg class="w-3.5 h-3.5 text-slate-400 mr-1.5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="line-clamp-1" :title="property.address">{{ property.address || 'Đang cập nhật vị trí' }}</span>
        </div>

        <!-- Bảng thông số kỹ thuật chuẩn Bất động sản -->
        <div class="grid grid-cols-3 gap-2 py-3 px-2 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-center">
          <!-- Diện tích -->
          <div class="flex flex-col items-center justify-center">
            <div class="flex items-center text-slate-400 text-[11px] font-medium mb-0.5">
              <svg class="w-3 h-3 mr-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span>Diện tích</span>
            </div>
            <span class="text-xs font-bold text-slate-800">
              {{ property.floorarea ? `${property.floorarea} m²` : '---' }}
            </span>
          </div>

          <!-- Quy mô / Tầng hầm -->
          <div class="flex flex-col items-center justify-center border-x border-slate-200">
            <div class="flex items-center text-slate-400 text-[11px] font-medium mb-0.5">
              <svg class="w-3 h-3 mr-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Tầng hầm</span>
            </div>
            <span class="text-xs font-bold text-slate-800">
              {{ property.numberOfBasement != null ? `${property.numberOfBasement} Hầm` : '1 Hầm' }}
            </span>
          </div>

          <!-- Hướng nhà hoặc Kết cấu -->
          <div class="flex flex-col items-center justify-center">
            <div class="flex items-center text-slate-400 text-[11px] font-medium mb-0.5">
              <svg class="w-3 h-3 mr-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Hướng</span>
            </div>
            <span class="text-xs font-bold text-slate-800 truncate max-w-[85px]" :title="property.direction || 'Đông Nam'">
              {{ property.direction || 'Đông Nam' }}
            </span>
          </div>
        </div>

        <!-- Người quản lý / Chuyên viên tư vấn -->
        <div class="flex items-center justify-between text-xs text-slate-600 mb-4 pt-1">
          <div class="flex items-center min-w-0">
            <div class="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-[10px] mr-2 shrink-0">
              {{ (property.managername || 'H').charAt(0).toUpperCase() }}
            </div>
            <span class="truncate font-medium text-slate-700">QL: {{ property.managername || 'Ban Quản Lý' }}</span>
          </div>
          <button
            type="button"
            @click.stop="handleQuickChat"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold transition-all border border-emerald-200/60 active:scale-95 shrink-0"
            title="Chat với môi giới phụ trách"
          >
            <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Chat</span>
          </button>
        </div>
      </div>

      <!-- Action Buttons Row -->
      <div class="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
        <!-- Nút Xem VR -->
        <button
          type="button"
          @click.stop="handleOpenVR"
          class="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all border border-emerald-200/60 active:scale-95"
        >
          <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Khám phá VR</span>
        </button>

        <!-- Nút Chi tiết -->
        <button
          type="button"
          @click="handleOpenModal"
          class="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs active:scale-95"
        >
          <svg class="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Chi tiết</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

// Props & Emits
const props = defineProps({
  property: {
    type: Object,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  currentUser: {
    type: Object,
    default: null
  }
})
const emit = defineEmits(['favorite-updated', 'open-modal', 'open-vr'])

// Toast
const toast = useToast()

// Injected dependencies
const UserId = inject('UserId', { value: null })
const favoriteIds = inject('favoriteIds', { value: [] })
const openPropertyModal = inject('openPropertyModal', null)
const openVRModal = inject('openVRModal', null)
const openBrokerChat = inject('openBrokerChat', null)

// Favorite check
const isFavorite = computed(() => {
  if (Array.isArray(favoriteIds.value)) {
    return favoriteIds.value.includes(props.property.id)
  }
  return false
})

// Image Helpers
const defaultImage = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'

const getImageUrl = (path) => {
  if (!path) return defaultImage
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `/img/${cleanPath}`
}

const onImageError = (e) => {
  e.target.src = defaultImage
}

// Display label formatters
const displayType = computed(() => {
  const t = props.property.typeCode
  if (!t) return 'Văn phòng'
  if (Array.isArray(t)) return t.join(', ')
  return String(t)
})

const displayDistrict = computed(() => {
  if (props.property.district) return props.property.district
  const addr = props.property.address || ''
  const qMatch = addr.match(/(Quận\s+\d+|Quận\s+[A-Za-zÀ-ỹ]+|Q\.\d+|Cầu Giấy|Đống Đa|Ba Đình|Tây Hồ|Hoàn Kiếm|Thanh Xuân|Nam Từ Liêm|Bình Thạnh|Tân Bình|Phú Nhuận)/i)
  return qMatch ? qMatch[0] : ''
})

const formatPriceShort = (price) => {
  if (!price) return 'Thỏa thuận'
  const num = Number(price)
  if (isNaN(num)) return price
  if (num >= 1000000000) {
    const b = (num / 1000000000).toFixed(1).replace('.0', '')
    return `${b} tỷ đ/tháng`
  }
  if (num >= 1000000) {
    const m = (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1)
    return `${m} triệu đ/tháng`
  }
  return new Intl.NumberFormat('vi-VN').format(num) + ' đ/tháng'
}

// Actions
const handleOpenModal = () => {
  if (openPropertyModal) {
    openPropertyModal(props.property)
  } else {
    emit('open-modal', props.property)
  }
}

const handleOpenVR = () => {
  if (openVRModal) {
    openVRModal(props.property.id)
  } else {
    emit('open-vr', props.property.id)
  }
}

// Toggle Favorite
const toggleFavorite = async () => {
  const uid = UserId.value || props.currentUser?.id
  if (!uid) {
    toast.error('Vui lòng đăng nhập để lưu bất động sản yêu thích')
    return
  }

  const payload = {
    userId: uid,
    customerId: uid,
    buildingId: props.property.id
  }

  try {
    if (isFavorite.value) {
      await axios.post('/api/buildings/favorites/remove', payload)
      if (Array.isArray(favoriteIds.value)) {
        const index = favoriteIds.value.indexOf(props.property.id)
        if (index !== -1) favoriteIds.value.splice(index, 1)
      }
      toast.info('Đã xóa khỏi danh sách yêu thích')
    } else {
      await axios.post('/api/buildings/favorites', payload)
      if (Array.isArray(favoriteIds.value)) {
        favoriteIds.value.push(props.property.id)
      }
      toast.success('Đã thêm vào danh sách yêu thích')
    }
    emit('favorite-updated')
  } catch (err) {
    console.error('Lỗi toggle favorite:', err)
    toast.error('Không thể cập nhật danh sách yêu thích. Vui lòng thử lại.')
  }
}

const handleQuickChat = () => {
  if (openBrokerChat) {
    openBrokerChat({
      id: props.property.id,
      buildingId: props.property.id,
      name: props.property.nameBuilding || props.property.name,
      nameBuilding: props.property.nameBuilding || props.property.name,
      managerName: props.property.managername,
      managerPhone: props.property.managerphone || props.property.managerPhoneNumber,
      building: props.property
    })
  } else {
    handleOpenModal()
  }
}
</script>

<style scoped>
.scale-108 {
  transform: scale(1.08);
}
</style>
