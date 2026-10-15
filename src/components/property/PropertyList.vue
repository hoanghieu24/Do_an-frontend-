<template>
  <section id="property-section" class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
    
    <!-- Section Header (Phong cách Real Estate Agency cao cấp) -->
    <div class="mb-10">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-2 border border-emerald-200/60">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Danh mục bất động sản</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tòa Nhà Văn Phòng & Không Gian Cho Thuê
          </h2>
          <p class="text-slate-500 text-sm md:text-base mt-1.5 max-w-2xl">
            <span v-if="searchResultText" class="text-emerald-700 font-semibold">
              {{ searchResultText }}
            </span>
            <span v-else>
              Tổng hợp các tòa nhà cao ốc tiêu biểu tích hợp công nghệ khảo sát Tour Thực tế ảo 360°
            </span>
          </p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <div class="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
            Tổng cộng: <span class="text-emerald-700 font-extrabold">{{ properties.length }}</span> tòa nhà
          </div>
        </div>
      </div>
    </div>

    <!-- Skeleton Loading -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in itemsPerPage" :key="i" class="animate-pulse bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div class="h-56 bg-slate-200"></div>
        <div class="p-5 space-y-3">
          <div class="h-5 bg-slate-200 rounded w-3/4"></div>
          <div class="h-4 bg-slate-100 rounded w-1/2"></div>
          <div class="grid grid-cols-3 gap-2 pt-2">
            <div class="h-10 bg-slate-100 rounded"></div>
            <div class="h-10 bg-slate-100 rounded"></div>
            <div class="h-10 bg-slate-100 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="properties.length === 0 && !isLoading" class="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
      <div class="max-w-md mx-auto px-4">
        <div class="w-16 h-16 mx-auto bg-slate-200/70 rounded-full flex items-center justify-center mb-4 text-slate-500">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">Không tìm thấy tòa nhà phù hợp</h3>
        <p class="text-sm text-slate-500 mb-6">
          Vui lòng thử nới lỏng các tiêu chí lọc như khu vực hoặc mức giá để tìm thêm kết quả.
        </p>
        <button
          @click="resetSearch"
          class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
        >
          Đặt lại bộ lọc
        </button>
      </div>
    </div>

    <!-- Property Grid -->
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
        <div
          v-for="property in paginatedProperties"
          :key="property.id"
          class="flex"
        >
          <PropertyCard
            :property="property"
            :is-favorite="favoriteProperties.has(property.id)"
            class="w-full"
            @open-modal="openPropertyModal"
            @open-vr="openVRModal"
          />
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
        <div class="text-xs font-medium text-slate-500">
          Hiển thị <span class="font-bold text-slate-800">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
          - <span class="font-bold text-slate-800">{{ Math.min(currentPage * itemsPerPage, properties.length) }}</span>
          trên tổng số <span class="font-bold text-emerald-700">{{ properties.length }}</span> tòa nhà
        </div>

        <!-- Controls -->
        <div class="flex items-center space-x-1.5">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Trang trước"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            v-for="(page, index) in visiblePages"
            :key="index"
            @click="goToPage(page)"
            :disabled="page === '...'"
            :class="[
              'min-w-[36px] h-9 px-3 rounded-xl border text-xs font-bold transition-all',
              page === currentPage
                ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                : page === '...'
                ? 'border-transparent text-slate-400 cursor-default'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Trang sau"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Items Per Page -->
        <div class="flex items-center space-x-2 text-xs text-slate-500">
          <span>Hiển thị:</span>
          <select
            v-model="itemsPerPage"
            @change="currentPage = 1"
            class="border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option :value="6">6</option>
            <option :value="9">9</option>
            <option :value="12">12</option>
            <option :value="15">15</option>
          </select>
          <span>/ trang</span>
        </div>
      </div>
    </div>

    <!-- VR Tour Modal (Toàn màn hình chuyên nghiệp) -->
    <div v-if="showVR" class="fixed inset-0 z-[10000] bg-slate-950/90 backdrop-blur-md flex flex-col justify-center items-center p-2 sm:p-4">
      <div class="bg-slate-900 rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden border border-slate-700 shadow-2xl">
        <!-- Top Navigation Bar -->
        <div class="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-950 text-white shrink-0">
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <h3 class="text-base sm:text-lg font-bold text-white">
                Khảo Sát Thực Tế Ảo VR 360°
              </h3>
              <p class="text-xs text-slate-400">
                Kéo chuột để xoay 360 độ · Cuộn chuột để phóng to/thu nhỏ góc nhìn
              </p>
            </div>
          </div>
          <button
            @click="closeVRModal"
            class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
            title="Đóng VR"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- VR Iframe Viewport -->
        <div class="flex-1 relative bg-black">
          <div id="vrContainer" class="w-full h-full"></div>
        </div>
      </div>
    </div>

    <!-- Property Detail Modal -->
    <PropertyModal
      v-if="showModal && selectedProperty"
      :property="selectedProperty"
      @close="closeModal"
      @chat-with-broker="handleChatWithBroker"
    />

  </section>
</template>

<script setup>
import { ref, provide, inject, onMounted, computed, watch, nextTick } from 'vue'
import axios from 'axios'
import PropertyCard from './PropertyCard.vue'
import PropertyModal from './PropertyModal.vue'

const openBrokerChat = inject('openBrokerChat', null)

const props = defineProps({
  filteredProperties: {
    type: Array,
    default: () => []
  },
  searchCriteria: {
    type: Object,
    default: () => ({})
  },
  isSearching: {
    type: Boolean,
    default: false
  }
})

const showVR = ref(false)
const UserId = ref(null)
const allProperties = ref([])
const properties = ref([])
const selectedProperty = ref(null)
const showModal = ref(false)
const isLoading = ref(true)
const favoriteProperties = ref(new Set())
const favoriteIds = ref([])
const currentBuildingId = ref(null)

// Phân trang
const currentPage = ref(1)
const itemsPerPage = ref(6)

// Computed
const totalPages = computed(() => {
  return Math.ceil(properties.value.length / itemsPerPage.value) || 1
})

const paginatedProperties = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return properties.value.slice(startIndex, endIndex)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = 2
  const range = []

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }
  if (current - delta > 2) range.unshift('...')
  if (current + delta < total - 1) range.push('...')
  range.unshift(1)
  if (total > 1) range.push(total)
  return range
})

const searchResultText = computed(() => {
  if (props.searchCriteria && Object.keys(props.searchCriteria).some(k => props.searchCriteria[k])) {
    const list = []
    if (props.searchCriteria.district) list.push(`Quận ${props.searchCriteria.district}`)
    if (props.searchCriteria.typeCode) list.push(`Loại ${props.searchCriteria.typeCode}`)
    if (props.searchCriteria.name) list.push(`"${props.searchCriteria.name}"`)
    return `Kết quả lọc (${list.join(', ')}) · Tìm thấy ${properties.value.length} bất động sản`
  }
  return null
})

// Watchers
watch(() => props.filteredProperties, (newFiltered) => {
  if (newFiltered && newFiltered.length > 0) {
    properties.value = newFiltered
  } else if (newFiltered && newFiltered.length === 0 && props.searchCriteria && Object.keys(props.searchCriteria).length > 0) {
    properties.value = []
  } else {
    properties.value = allProperties.value
  }
  currentPage.value = 1
}, { immediate: true, deep: true })

watch(allProperties, (newAll) => {
  if (newAll.length > 0 && (!props.filteredProperties || props.filteredProperties.length === 0)) {
    properties.value = newAll
  }
})

// VR Modal Methods
const closeVRModal = () => {
  showVR.value = false
  const container = document.getElementById('vrContainer')
  if (container) container.innerHTML = ''
  document.body.style.overflow = ''
}

const openVRModal = async (buildingId) => {
  try {
    currentBuildingId.value = buildingId
    showVR.value = true
    showModal.value = false
    document.body.style.overflow = 'hidden'

    await nextTick()
    const container = document.getElementById('vrContainer')
    if (!container) return

    const vrUrl = `/vtour/pannellum.html?buildingId=${buildingId}`
    container.innerHTML = `
      <iframe 
        src="${vrUrl}" 
        style="width: 100%; height: 100%; border: none; background: #000;"
        allowfullscreen>
      </iframe>
    `
  } catch (err) {
    console.error('Lỗi khi mở VR:', err)
  }
}

// Property Detail Modal Methods
const openPropertyModal = (property) => {
  selectedProperty.value = property
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = ''
}

const handleChatWithBroker = (buildingData) => {
  closeModal()
  if (openBrokerChat) {
    openBrokerChat(buildingData)
  }
}

// Pagination Controls
const goToPage = (page) => {
  if (page !== '...' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    const sec = document.getElementById('property-section')
    if (sec) sec.scrollIntoView({ behavior: 'smooth' })
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) goToPage(currentPage.value + 1)
}

const prevPage = () => {
  if (currentPage.value > 1) goToPage(currentPage.value - 1)
}

const resetSearch = () => {
  properties.value = allProperties.value
  currentPage.value = 1
}

// Provide to child components
provide('UserId', UserId)
provide('favoriteIds', favoriteIds)
provide('favoriteProperties', favoriteProperties)
provide('openPropertyModal', openPropertyModal)
provide('openVRModal', openVRModal)
provide('openBrokerChat', openBrokerChat)

onMounted(async () => {
  try {
    isLoading.value = true
    const res = await axios.get('/api/buildings')
    if (res.data && Array.isArray(res.data)) {
      allProperties.value = res.data
      if (!props.filteredProperties || props.filteredProperties.length === 0) {
        properties.value = res.data
      }
    }

    // Load user and favorites
    const userData = localStorage.getItem('currentUser') || localStorage.getItem('user')
    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        UserId.value = Array.isArray(parsed.id) ? parsed.id[0] : parsed.id
      } catch (e) {}
    }

    const savedFavs = localStorage.getItem('favorites')
    if (savedFavs) {
      try {
        const arr = JSON.parse(savedFavs)
        favoriteIds.value = arr
        favoriteProperties.value = new Set(arr)
      } catch (e) {}
    }
  } catch (err) {
    console.error('Lỗi khi nạp danh sách tòa nhà:', err)
  } finally {
    isLoading.value = false
  }
})

defineExpose({
  openPropertyModal,
  openVRModal,
  closeModal
})
</script>