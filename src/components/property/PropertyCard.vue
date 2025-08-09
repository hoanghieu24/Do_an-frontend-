<template>
  <div
    class="property-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
    
    <!-- Badge nổi bật -->
    <div v-if="property.isFeatured"
      class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10 shadow-md">
      NỔI BẬT
    </div>

    <!-- Hình ảnh -->
    <div class="property-image relative h-48 overflow-hidden">
      <img :src="getImageUrl(property.image)" :alt="property.nameBuilding"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
      <div
        class="absolute bottom-3 left-3 bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
        {{ property.formattedRentPrice || formatPrice(property.rentPrice) }}
      </div>
    </div>

    <!-- Nút yêu thích -->
    <button @click.stop="toggleFavorite"
      class="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-200 z-10 shadow-md"
      aria-label="Add to favorites">
      <svg class="w-5 h-5 transition-colors" :class="{
        'text-red-500 fill-red-500': isFavorite,
        'text-gray-600 fill-transparent': !isFavorite
      }" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>

    <!-- Thông tin -->
    <div class="p-4">
      <h3 class="text-xl font-bold text-gray-800 mb-2 truncate">{{ property.nameBuilding }}</h3>

      <div class="flex items-center text-gray-600 mb-2">
        <i class="fas fa-user-tie mr-2 text-blue-500"></i>
        <span class="truncate">{{ property.managername }}</span>
      </div>

      <div class="flex items-center text-gray-600 mb-3">
        <i class="fas fa-map-marker-alt mr-2 text-blue-500"></i>
        <span class="truncate">{{ property.address }}</span>
      </div>

      <div class="grid grid-cols-3 gap-2 text-center mb-4">
        <div class="bg-gray-100 rounded p-2 hover:bg-gray-200">
          <div class="text-gray-500 text-xs">Diện tích</div>
          <div class="font-semibold text-black">{{ property.floorarea }} m²</div>
        </div>
        <div class="bg-gray-100 rounded p-2 hover:bg-gray-200">
          <div class="text-gray-500 text-xs">Tầng hầm</div>
          <div class="font-semibold text-black">{{ property.numberOfBasement }}</div>
        </div>
        <div class="bg-gray-100 rounded p-2 hover:bg-gray-200">
          <div class="text-gray-500 text-xs">Nhân viên</div>
          <div class="font-semibold text-black">{{ property.staffid?.length || 0 }}</div>
        </div>
      </div>

      <!-- Xem chi tiết -->
      <button @click="openPropertyModal && openPropertyModal(property)"
        class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
        <i class="fas fa-info-circle mr-2"></i>
        Xem chi tiết
      </button>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

// Props & Emits
const props = defineProps({
  property: Object,
  isFavorite: Boolean,
  currentUser: Object
})
const emit = defineEmits(['favorite-updated'])

// Toast
const toast = useToast()

// Inject từ cha
const customerId = inject('customerId')
const favoriteIds = inject('favoriteIds') // ✅ danh sách id tòa nhà đã được yêu thích
const openPropertyModal = inject('openPropertyModal')

// ✅ Xác định trạng thái yêu thích
const isFavorite = computed(() => {
  return favoriteIds.value.includes(props.property.id)
})

// Constants
const backendBaseUrl = 'http://localhost:8080/img/'
const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image'

const formatPrice = (price) => {
  if (!price) return '0 VND'
  return new Intl.NumberFormat('vi-VN').format(price) + ' VND'
}
const getImageUrl = (path) => {
  if (!path) return defaultImage
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${backendBaseUrl}${cleanPath}`
}

// ✅ Toggle favorite (thêm hoặc xoá)
const toggleFavorite = async () => {
  if (!customerId.value) {
    toast.error('Bạn cần đăng nhập để yêu thích toà nhà này 💔')
    return
  }

  const payload = {
    customerId: customerId.value,
    buildingId: props.property.id
  }

  try {
    if (isFavorite.value) {
      // Nếu đang yêu thích -> xoá
      await axios.post('http://localhost:8080/api/buildings/favorites/remove', payload)
      const index = favoriteIds.value.indexOf(props.property.id)
      if (index !== -1) favoriteIds.value.splice(index, 1)
      toast.warning('💔 Đã xoá khỏi danh sách yêu thích')
    } else {
      // Nếu chưa yêu thích -> thêm
      await axios.post('http://localhost:8080/api/buildings/favorites', payload)
      favoriteIds.value.push(props.property.id)
      toast.success('❤️ Đã thêm vào danh sách yêu thích')
    }

    // Emit để cha có thể xử lý nếu cần
    emit('favorite-updated')

  } catch (err) {
    console.error('Lỗi toggle favorite:', err)
    toast.error('Lỗi hệ thống khi thay đổi trạng thái yêu thích 😢')
  }
}
</script>

<style scoped>
.property-card {
  position: relative;
  transition: all 0.3s ease;
}
.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
.property-image {
  position: relative;
  overflow: hidden;
}
.property-image img {
  transition: transform 0.5s ease;
}
.property-image:hover img {
  transform: scale(1.05);
}
</style>
