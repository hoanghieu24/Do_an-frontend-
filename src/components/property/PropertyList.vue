<script setup>
import { ref, provide, onMounted, computed, watch, nextTick } from 'vue';
import PropertyCard from './PropertyCard.vue';

// Props nhận từ component cha
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
const UserId = ref(null);
const allProperties = ref([]); // Tất cả properties từ API
const properties = ref([]); // Properties hiển thị (có thể được filter)
const selectedProperty = ref(null);
const showModal = ref(false);
const isLoading = ref(true);
const favoriteProperties = ref(new Set());
const errorMessage = ref('');
const currentBuildingId = ref(null);
const vrScenes = ref([]);
const currentSceneIndex = ref(0);

// Phân trang
const currentPage = ref(1);
const itemsPerPage = ref(6);

const backendBaseUrl = '/img/';
const defaultImage = 'https://c1.klipartz.com/pngpicture/942/649/sticker-png-architecture-icon-house-icon-design-symbol-triangle-line-logo-roof.png';

// Computed properties
const hasActiveSearch = computed(() => {
  return props.searchCriteria && Object.keys(props.searchCriteria).some(key => 
    props.searchCriteria[key] && props.searchCriteria[key] !== ''
  )
})

const activeSearchCriteria = computed(() => {
  if (!props.searchCriteria) return {}
  const criteria = {}
  Object.keys(props.searchCriteria).forEach(key => {
    if (props.searchCriteria[key] && props.searchCriteria[key] !== '') {
      criteria[key] = props.searchCriteria[key]
    }
  })
  return criteria
})

const totalPages = computed(() => {
  return Math.ceil(properties.value.length / itemsPerPage.value);
});

const paginatedProperties = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return properties.value.slice(startIndex, endIndex);
});

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2;
  const range = [];
  
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i);
  }
  
  if (current - delta > 2) {
    range.unshift('...');
  }
  if (current + delta < total - 1) {
    range.push('...');
  }
  
  range.unshift(1);
  if (total > 1) {
    range.push(total);
  }
  
  return range;
});

const searchResultText = computed(() => {
  if (props.searchCriteria && Object.keys(props.searchCriteria).some(key => props.searchCriteria[key])) {
    const criteria = []
    if (props.searchCriteria.typeCode) criteria.push(`loại: ${getCriteriaLabel('typeCode', props.searchCriteria.typeCode)}`)
    if (props.searchCriteria.district) criteria.push(`quận: ${props.searchCriteria.district}`)
    if (props.searchCriteria.name) criteria.push(`tên: ${props.searchCriteria.name}`)
    
    return `Kết quả tìm kiếm cho ${criteria.join(', ')} - Tìm thấy ${properties.value.length} bất động sản`
  }
  return null
})

// Watchers
watch(() => props.filteredProperties, (newFiltered) => {
  console.log('🔄 PropertySection received filtered properties:', newFiltered?.length)
  
  if (newFiltered && newFiltered.length > 0) {
    properties.value = newFiltered
    console.log('✅ Displaying filtered properties:', newFiltered.length)
  } else if (newFiltered && newFiltered.length === 0) {
    properties.value = []
    console.log('🔄 No results from search')
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

// VR Methods
const closeVRModal = () => {
  showVR.value = false
    window.location.reload()
}

const openVRModal = async (buildingId) => {
  try {
    currentBuildingId.value = buildingId
    showVR.value = true
    showModal.value = false;

    await nextTick() // chờ modal render xong
    
    const container = document.getElementById('vrContainer')
    if (!container) {
      console.error('Không tìm thấy container VR để nhúng iframe.')
      return
    }

    // Nhúng trực tiếp trang VR từ backend (đường dẫn tương đối)
    const vrUrl = `/vtour/pannellum.html?buildingId=${buildingId}`

    container.innerHTML = `
      <iframe 
        src="${vrUrl}" 
        style="width: 100%; height: 700px; border: none; border-radius: 10px;"
        allowfullscreen>
      </iframe>
    `
  } catch (error) {
    console.error('❌ Lỗi khi mở VR modal:', error)
    alert('Không thể tải VR tour. Vui lòng thử lại sau.')
  }
}

// Methods
const getEmptyStateMessage = () => {
  if (hasActiveSearch.value) {
    return 'Rất tiếc, chúng tôi không tìm thấy tòa nhà nào phù hợp với yêu cầu của bạn.'
  } else {
    return 'Hiện không có tòa nhà nào trong danh sách. Vui lòng thử lại sau.'
  }
}

const getCriteriaLabel = (key, value) => {
  const labels = {
    typeCode: 'Loại hình',
    district: 'Quận',
    priceRange: 'Mức giá',
    areaRange: 'Diện tích',
    name: 'Tên tòa nhà',
    ward: 'Phường',
    street: 'Đường',
    numberOfBasement: 'Số tầng hầm'
  }
  
  const valueLabels = {
    'TANG_TRET': 'Tầng trệt',
    'NGUYEN_CAN': 'Nguyên căn',
    'NOI_THAT': 'Nội thất'
  }
  
  const label = labels[key] || key
  const valueText = valueLabels[value] || value
  
  return `${label}: ${valueText}`
}

const resetSearch = () => {
  window.location.reload()
}

const goToPage = (page) => {
  if (page !== '...' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    const section = document.getElementById('property-section');
    if (section) {
      const header = document.querySelector('nav');
      const offset = section.offsetTop - (header?.offsetHeight || 0) - 20;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

const formatPrice = (price) => {
  if (!price) return '0 VND';
  return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
};

const getImageUrl = (path) => {
  if (!path) return defaultImage;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${backendBaseUrl}${cleanPath}`;
};

const toggleFavorite = (propertyId) => {
  if (!UserId.value) {
    alert('⚠️ Bạn cần đăng nhập để yêu thích tòa nhà này!');
    return;
  }

  if (favoriteProperties.value.has(propertyId)) {
    favoriteProperties.value.delete(propertyId);
  } else {
    favoriteProperties.value.add(propertyId);
  }

  localStorage.setItem('favorites', JSON.stringify(Array.from(favoriteProperties.value)));
};

const openPropertyModal = (property) => {
  selectedProperty.value = property;
  showModal.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  showModal.value = false;
  document.body.style.overflow = '';
};

// Provide to children
provide('UserId', UserId);
provide('toggleFavorite', toggleFavorite);
provide('favoriteProperties', favoriteProperties);
provide('openPropertyModal', openPropertyModal);

// Lifecycle
onMounted(() => {
  // Get user data
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser && typeof parsedUser === 'object') {
        UserId.value = Array.isArray(parsedUser.id) ? parsedUser.id[0] : parsedUser.id;
        console.log('✅ Đã lấy UserId từ localStorage:', UserId.value);
      }
    } catch (err) {
      console.error('❌ Lỗi khi parse user:', err);
    }
  }

  // Load favorites
  const savedFavorites = localStorage.getItem('favorites');
  if (savedFavorites) {
    favoriteProperties.value = new Set(JSON.parse(savedFavorites));
  }

  // Handle hash navigation
  if (window.location.hash === '#property-section') {
    const section = document.getElementById('property-section');
    const header = document.querySelector('nav');
    if (section && header) {
      const offset = section.offsetTop - header.offsetHeight - 20;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }
});

// Fetch properties
onMounted(async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';
    const response = await fetch('/api/buildings/');
    if (!response.ok) {
      throw new Error(`Lỗi ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    allProperties.value = data;
    
    // Only set to properties if no filtered data
    if (!props.filteredProperties || props.filteredProperties.length === 0) {
      properties.value = data;
    }

    setTimeout(() => {
      isLoading.value = false;
    }, 800);
  } catch (err) {
    console.error('❌ Lỗi fetch backend:', err);
    errorMessage.value = err.message || 'Lỗi không xác định';
    isLoading.value = false;
  }
});

defineExpose({
  toggleFavorite,
  closeModal
});
</script>

<template>
  <section id="property-section" class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Floating background elements -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div
        class="absolute top-20 left-20 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-float-slow">
      </div>
      <div
        class="absolute bottom-20 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-float-medium animation-delay-2000">
      </div>
    </div>

    <div class="relative z-10">
      <div class="flex justify-between items-center mb-12">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 animate-fade-in">
            <span class="relative inline-block">
              <span class="relative z-10">Bất động sản nổi bật</span>
              <span
                class="absolute bottom-0 left-0 w-full h-2 bg-indigo-200 opacity-40 -z-0 animate-underline-expand"></span>
            </span>
          </h2>
          <p class="text-gray-600 mt-2 animate-fade-in animation-delay-100">
            <span v-if="searchResultText" class="text-indigo-600 font-medium">
              {{ searchResultText }}
            </span>
            <span v-else>
              Khám phá các tài sản cao cấp của chúng tôi
              <span v-if="allProperties.length > 0" class="text-indigo-600 font-medium ml-2">
                ({{ allProperties.length }} bất động sản)
              </span>
            </span>
          </p>
        </div>
        <router-link to="/properties"
          class="text-indigo-600 hover:text-indigo-800 font-medium transition-all duration-300 flex items-center group">
          <span class="mr-2 group-hover:mr-3 transition-all">Xem tất cả</span>
          <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </router-link>
      </div>

      <!-- Skeleton loading -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in itemsPerPage" :key="i" class="animate-pulse">
          <div class="h-64 bg-gray-200 rounded-xl"></div>
          <div class="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="properties.length === 0 && !isLoading" class="text-center py-16 animate-fade-in">
        <div class="max-w-md mx-auto">
          <!-- Icon đẹp -->
          <div class="relative mb-8">
            <div class="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                </path>
              </svg>
            </div>
            <!-- Hiệu ứng nền -->
            <div class="absolute inset-0 -z-10">
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-50 rounded-full opacity-60"></div>
            </div>
          </div>

          <!-- Nội dung -->
          <div class="space-y-4">
            <h3 class="text-2xl font-bold text-gray-900">
              <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Không tìm thấy tòa nhà
              </span>
            </h3>
            
            <p class="text-gray-600 text-lg leading-relaxed">
              {{ getEmptyStateMessage() }}
            </p>

            <!-- Hiển thị tiêu chí tìm kiếm -->
            <div v-if="hasActiveSearch" class="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 class="font-medium text-gray-900 mb-3 flex items-center justify-center">
                <svg class="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Tiêu chí tìm kiếm của bạn
              </h4>
              <div class="flex flex-wrap gap-2 justify-center">
                <span v-for="(value, key) in activeSearchCriteria" :key="key" 
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {{ getCriteriaLabel(key, value) }}
                </span>
              </div>
            </div>

            <!-- Gợi ý -->
            <div class="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 class="font-medium text-blue-900 mb-2 flex items-center justify-center">
                <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Gợi ý cho bạn
              </h4>
              <ul class="text-blue-700 text-sm space-y-1 text-left">
                <li class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Thử mở rộng tiêu chí tìm kiếm
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Kiểm tra lại khu vực tìm kiếm
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Điều chỉnh mức giá phù hợp
                </li>
              </ul>
            </div>

            <!-- Action buttons -->
            <div class="flex flex-col sm:flex-row gap-3 justify-center pt-6">
              <button @click="resetSearch" 
                      class="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300 group">
                <svg class="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Đặt lại tìm kiếm
              </button>
              
              <router-link to="/properties" 
                          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Xem tất cả tòa nhà
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Property list -->
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div v-for="(property, index) in paginatedProperties" :key="property.id" class="opacity-0 animate-fade-in-up"
            :style="{ 'animation-delay': `${index * 100}ms` }">
            <PropertyCard :property="property" :is-favorite="favoriteProperties.has(property.id)"
              class="transition-all duration-500 ease-out transform hover:scale-[1.03] hover:shadow-xl hover:z-10" />
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
          <!-- Info text -->
          <div class="text-sm text-gray-600">
            Hiển thị <span class="font-medium">{{ Math.min((currentPage - 1) * itemsPerPage + 1, properties.length) }}</span>
            - <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, properties.length) }}</span>
            của <span class="font-medium">{{ properties.length }}</span> bất động sản
          </div>

          <!-- Pagination controls -->
          <div class="flex items-center space-x-1">
            <!-- Previous button -->
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Trang trước">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <!-- Page numbers -->
            <button
              v-for="(page, index) in visiblePages"
              :key="index"
              @click="goToPage(page)"
              :disabled="page === '...'"
              :class="[
                'min-w-[40px] h-10 px-3 rounded-lg border font-medium transition-all duration-200',
                page === currentPage
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                  : page === '...'
                  ? 'border-transparent text-gray-500 cursor-default'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
              ]"
              :aria-label="page === '...' ? 'More pages' : `Go to page ${page}`"
              :aria-current="page === currentPage ? 'page' : null">
              {{ page }}
            </button>

            <!-- Next button -->
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Trang sau">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          <!-- Items per page selector -->
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <span>Hiển thị:</span>
            <select
              v-model="itemsPerPage"
              @change="currentPage = 1"
              class="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
            </select>
            <span>mỗi trang</span>
          </div>
        </div>
      </div>
    </div>

    <!-- VR Modal -->
    <div v-if="showVR" class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div class="bg-white rounded-xl w-[95%] h-[90%] relative overflow-hidden flex flex-col">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 border-b bg-white">
          <h3 class="text-xl font-bold text-gray-900">
            Trải nghiệm VR - {{ vrScenes[currentSceneIndex]?.name || 'Scene' }}
          </h3>
          <button
            @click="closeVRModal"
            class="text-gray-700 hover:text-red-600 text-xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        <!-- VR Container và Scene Navigation -->
        <div class="flex-1 flex">
          <!-- Scene Navigation (bên trái) -->
          <div v-if="vrScenes.length > 1" class="w-64 bg-gray-50 border-r p-4 overflow-y-auto">
            <h4 class="font-medium text-gray-900 mb-3">Các Scene</h4>
            <div class="space-y-2">
              <button
                v-for="(scene, index) in vrScenes"
                :key="scene.id"
                @click="loadVRScene(index)"
                :class="[
                  'w-full text-left p-3 rounded-lg border transition-all',
                  currentSceneIndex === index
                    ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                    : 'bg-white border-gray-200 hover:bg-gray-100'
                ]"
              >
                <div class="font-medium">{{ scene.name }}</div>
                <div class="text-sm text-gray-600 mt-1">{{ scene.buildingName }}</div>
              </button>
            </div>
          </div>

          <!-- VR Container -->
          <div class="flex-1 relative">
            <div id="vrContainer" class="w-full h-full"></div>
            
            <!-- Navigation Controls -->
            <div v-if="vrScenes.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <button
                @click="prevScene"
                :disabled="currentSceneIndex === 0"
                class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white disabled:opacity-50 transition-all"
              >
                ← Scene trước
              </button>
              <button
                @click="nextScene"
                :disabled="currentSceneIndex === vrScenes.length - 1"
                class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white disabled:opacity-50 transition-all"
              >
                Scene tiếp theo →
              </button>
            </div>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="p-4 border-t bg-gray-50">
          <div class="flex justify-between items-center text-sm text-gray-600">
            <div>
              Scene {{ currentSceneIndex + 1 }} / {{ vrScenes.length }}
            </div>
            <div>
              Sử dụng chuột để xoay và scroll để zoom
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Property Modal -->
    <transition name="modal">
      <div v-if="showModal" class="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
          @click="closeModal"></div>

        <div
          class="modal-content relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] flex flex-col transform transition-all duration-300 ease-out"
          :class="{ 'scale-95 opacity-0': !showModal, 'scale-100 opacity-100': showModal }" @click.stop>
          <!-- Close button -->
          <button @click="closeModal"
            class="absolute -top-10 right-0 p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-200 group shadow-md z-10"
            aria-label="Close modal">
            <svg class="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Favorite heart button -->
          <button @click="toggleFavorite(selectedProperty.id)"
            class="absolute -top-10 left-0 p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-200 group shadow-md z-10"
            aria-label="Add to favorites">
            <svg class="w-6 h-6 transition-colors" :class="{
              'text-red-500 fill-red-500': favoriteProperties.has(selectedProperty.id),
              'text-gray-600 fill-transparent': !favoriteProperties.has(selectedProperty.id)
            }" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <!-- Scrollable content area -->
          <div class="overflow-y-auto flex-1">
            <!-- Hero image section -->
            <div class="relative w-full">
              <img
                v-if="selectedProperty?.image"
                :src="getImageUrl(selectedProperty.image)"
                :alt="selectedProperty?.nameBuilding"
                class="w-full h-auto object-contain transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div v-else
                class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <svg class="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                  </path>
                </svg>
              </div>

              <!-- Gradient overlay and title -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-8 text-white w-full">
                <h3 class="text-3xl font-bold mb-2 drop-shadow-lg">{{ selectedProperty?.nameBuilding }}</h3>
                <div class="flex items-center text-white/90">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span class="text-lg">{{ selectedProperty?.address }}</span>
                </div>
              </div>
            </div>

            <!-- Main content -->
            <div class="p-8">
              <!-- Highlights ribbon -->
              <div class="flex flex-wrap gap-3 mb-8">
                <div class="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z">
                    </path>
                  </svg>
                  <span class="text-sm font-medium">{{ selectedProperty?.typeCode?.join(', ') || 'Chưa rõ loại'
                    }}</span>
                </div>
                <div class="px-4 py-2 bg-blue-100 text-blue-800 rounded-full flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4">
                    </path>
                  </svg>
                  <span class="text-sm font-medium">{{ selectedProperty?.buildingStructure }}</span>
                </div>
                <div class="px-4 py-2 bg-green-100 text-green-800 rounded-full flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7">
                    </path>
                  </svg>
                  <span class="text-sm font-medium">{{ selectedProperty?.floorarea }} m²</span>
                </div>
              </div>

              <!-- Two-column layout -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <!-- Left column - Property details -->
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Chi tiết tài sản</h4>

                  <div class="space-y-6">
                    <div class="flex items-start">
                      <div
                        class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center mr-4">
                        <svg class="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                          </path>
                        </svg>
                      </div>
                      <div>
                        <h5 class="font-medium text-gray-500">Diện tích sàn</h5>
                        <p class="text-lg font-semibold text-gray-900">{{ selectedProperty?.floorarea }} m²</p>
                      </div>
                    </div>

                    <div class="flex items-start">
                      <div
                        class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                        <svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                          </path>
                        </svg>
                      </div>
                      <div>
                        <h5 class="font-medium text-gray-500">Số tầng hầm</h5>
                        <p class="text-lg font-semibold text-gray-900">{{ selectedProperty?.numberOfBasement }}</p>
                      </div>
                    </div>

                    <div class="flex items-start">
                      <div
                        class="flex-shrink-0 h-10 w-10 rounded-full bg-green-50 flex items-center justify-center mr-4">
                        <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4">
                          </path>
                        </svg>
                      </div>
                      <div>
                        <h5 class="font-medium text-gray-500">Hướng tòa nhà</h5>
                        <p class="text-lg font-semibold text-gray-900">{{ selectedProperty?.direction }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right column - Pricing info -->
                <div>
                  <div class="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
                    <h4 class="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-indigo-200">Thông tin giá</h4>

                    <div class="space-y-4">
                      <div class="flex justify-between items-center pb-4 border-b border-indigo-100">
                        <div class="flex items-center">
                          <svg class="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                            </path>
                          </svg>
                          <span class="text-gray-600">Phí dịch vụ:</span>
                        </div>
                        <span class="font-semibold text-lg text-gray-900">{{ formatPrice(selectedProperty?.servicefee)
                          }}</span>
                      </div>

                      <div class="flex justify-between items-center pb-4 border-b border-indigo-100">
                        <div class="flex items-center">
                          <svg class="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-5l-5 5v-5z"></path>
                          </svg>
                          <span class="text-gray-600">Phí đặt cọc:</span>
                        </div>
                        <span class="font-semibold text-lg text-gray-900">{{ formatPrice(selectedProperty?.deposit)
                          }}</span>
                      </div>

                      <div class="flex justify-between items-center">
                        <div class="flex items-center">
                          <svg class="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span class="text-gray-600">Thời gian thuê:</span>
                        </div>
                        <span class="font-semibold text-lg text-gray-900">{{ selectedProperty?.rentTime || 'Không rõ' }}
                          tháng</span>
                      </div>
                    </div>

                    <!-- Call to action price -->
                    <div class="mt-6 pt-6 border-t border-indigo-200">
                      <div class="text-center bg-white p-4 rounded-lg shadow-sm">
                        <p class="text-sm text-gray-500 mb-1">Giá thuê ước tính</p>
                        <p class="text-2xl font-bold text-indigo-600">{{ selectedProperty?.rentPriceDescription || 'Chưa có dữ liệu' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Additional notes -->
              <div v-if="selectedProperty?.note" class="mb-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Thông tin bổ sung</h4>
                <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <p class="text-gray-700 whitespace-pre-line">{{ selectedProperty.note }}</p>
                </div>
              </div>

              <!-- Contact information -->
              <div class="mb-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Liên hệ quản lý</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start">
                    <div
                      class="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <svg class="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                        </path>
                      </svg>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-900 mb-1">Số điện thoại</h5>
                      <p class="text-lg text-gray-600">{{ selectedProperty?.managerphone }} ({{
                        selectedProperty?.managername }})</p>
                    </div>
                  </div>

                  <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                        </path>
                      </svg>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-900 mb-1">Email liên hệ</h5>
                      <p class="text-lg text-gray-600">
                        {{ selectedProperty?.email || 'bdshider@gmail.com' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sticky action buttons at bottom -->
          <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div class="flex flex-col sm:flex-row gap-4 justify-between items-center max-w-5xl mx-auto">
              <button @click="closeModal"
                class="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300 flex-1 sm:flex-none flex items-center justify-center w-full sm:w-auto">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Đóng
              </button>

              <a :href="`tel:${selectedProperty?.managerphone}`"
                class="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 flex-1 sm:flex-none flex items-center justify-center w-full sm:w-auto">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                  </path>
                </svg>
                Gọi ngay
              </a>

              <button
                @click="openVRModal(selectedProperty?.id)"
                class="px-8 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-all duration-300 flex-1 sm:flex-none flex items-center justify-center w-full sm:w-auto"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 2.5c1.5 0 3 .5 4 1.5 2 2 2 5 2 7 0 3.5-2 6.5-6 6.5s-6-3-6-6.5c0-2 0-5 2-7 1-1 2.5-1.5 4-1.5z"/>
                </svg>
                Xem VR
              </button>

              <router-link to="/lien-he"
                class="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 flex-1 sm:flex-none flex items-center justify-center w-full sm:w-auto">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z">
                  </path>
                </svg>
                Nhắn tin
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<style scoped>
/* Floating animation */
@keyframes float1 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  50% {
    transform: translate(20px, 30px) rotate(5deg);
  }
}

@keyframes float2 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  50% {
    transform: translate(-15px, 20px) rotate(-3deg);
  }
}

.animate-float-slow {
  animation: float1 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float2 10s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

/* Fade in animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeIn 0.8s ease-out forwards;
}

.animation-delay-100 {
  animation-delay: 0.1s;
}

/* Underline animation */
@keyframes underlineExpand {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

.animate-underline-expand {
  animation: underlineExpand 1s ease-out forwards;
  transform-origin: left;
}

/* Skeleton loading */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Enhanced modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

/* Smooth scrolling for modal content */
.modal-content {
  scroll-behavior: smooth;
}

/* Custom scrollbar for modal */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Hover effect for property image */
.modal-content img {
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-content:hover img {
  transform: scale(1.03);
}

/* Pulse animation for call-to-action */
@keyframes pulse-cta {

  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }

  50% {
    box-shadow: 0 0 0 12px rgba(99, 102, 241, 0);
  }
}

.bg-indigo-600 {
  animation: pulse-cta 2s infinite;
}

.bg-indigo-600:hover {
  animation: none;
}

/* Heart animation */
@keyframes heartBeat {
  0% {
    transform: scale(1);
  }

  14% {
    transform: scale(1.3);
  }

  28% {
    transform: scale(1);
  }

  42% {
    transform: scale(1.3);
  }

  70% {
    transform: scale(1);
  }
}

.heart-animation {
  animation: heartBeat 1s;
}

/* Pagination animations */
@keyframes paginationFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pagination-container {
  animation: paginationFadeIn 0.5s ease-out;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .pagination-info {
    text-align: center;
  }
  
  .pagination-controls {
    order: -1;
  }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* VR Modal specific styles */
#vrContainer {
  min-height: 500px;
}

/* Ensure Pannellum viewer takes full space */
.pnlm-container {
  width: 100% !important;
  height: 100% !important;
}
</style>