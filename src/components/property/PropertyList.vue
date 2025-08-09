<script setup>
import { ref, provide, onMounted } from 'vue';
import PropertyCard from './PropertyCard.vue';

const customerId = ref(null);
const properties = ref([]);
const selectedProperty = ref(null);
const showModal = ref(false);
const isLoading = ref(true);
const favoriteProperties = ref(new Set());
const errorMessage = ref('');

const backendBaseUrl = 'http://localhost:8080/img/';
const defaultImage = 'https://c1.klipartz.com/pngpicture/942/649/sticker-png-architecture-icon-house-icon-design-symbol-triangle-line-logo-roof.png';

const formatPrice = (price) => {
  if (!price) return '0 VND';
  return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
};

const getImageUrl = (path) => {
  if (!path) return defaultImage;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${backendBaseUrl}${cleanPath}`;
};

// Toggle favorite status
const toggleFavorite = (propertyId) => {
  if (!customerId.value) {
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

// Modal open & close
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
provide('customerId', customerId);
provide('toggleFavorite', toggleFavorite);
provide('favoriteProperties', favoriteProperties);
provide('openPropertyModal', openPropertyModal);

// onMounted 1: Get userId, load favorites, scroll
onMounted(() => {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser && typeof parsedUser === 'object') {
        // Nếu id là mảng như [5] thì lấy phần tử đầu tiên
        customerId.value = Array.isArray(parsedUser.id) ? parsedUser.id[0] : parsedUser.id;
        console.log('✅ Đã lấy customerId từ localStorage:', customerId.value);
      } else {
        console.warn('⚠️ Dữ liệu user sai cấu trúc:', parsedUser);
      }
    } catch (err) {
      console.error('❌ Lỗi khi parse user:', err);
    }
  } else {
    console.warn('⚠️ Không tìm thấy user trong localStorage');
  }

  const savedFavorites = localStorage.getItem('favorites');
  if (savedFavorites) {
    favoriteProperties.value = new Set(JSON.parse(savedFavorites));
  }

  if (window.location.hash === '#property-section') {
    const section = document.getElementById('property-section');
    const header = document.querySelector('nav');
    if (section && header) {
      const offset = section.offsetTop - header.offsetHeight - 20;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }
});

// onMounted 2: Fetch properties
onMounted(async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';
    const response = await fetch('http://localhost:8080/api/buildings/');
    if (!response.ok) {
      throw new Error(`Lỗi ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    properties.value = data;

    setTimeout(() => {
      isLoading.value = false;
    }, 800);
  } catch (err) {
    console.error('❌ Lỗi fetch backend:', err);
    errorMessage.value = err.message || 'Lỗi không xác định';
    isLoading.value = false;
  }
});

// 👇 Expose hàm cho template (để dùng được trong @click trong modal)
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
          <p class="text-gray-600 mt-2 animate-fade-in animation-delay-100">Khám phá các tài sản cao cấp của chúng tôi
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
        <div v-for="i in 3" :key="i" class="animate-pulse">
          <div class="h-64 bg-gray-200 rounded-xl"></div>
          <div class="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="properties.length === 0" class="text-center py-16 animate-fade-in">
        <div class="inline-block p-6 bg-gray-50 rounded-full mb-4">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
            </path>
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">Không tìm thấy bất động sản</h3>
        <p class="text-gray-500 max-w-md mx-auto">Hiện không có bất động sản nào phù hợp. Vui lòng thử lại sau.</p>
      </div>

      <!-- Property list -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(property, index) in properties" :key="property.id" class="opacity-0 animate-fade-in-up"
          :style="{ 'animation-delay': `${index * 100}ms` }">
          <PropertyCard :property="property" :is-favorite="favoriteProperties.has(property.id)"
            class="transition-all duration-500 ease-out transform hover:scale-[1.03] hover:shadow-xl hover:z-10" />
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
            <div class="relative h-80 w-full overflow-hidden">
              <img v-if="selectedProperty?.image" :src="getImageUrl(selectedProperty.image)"
                :alt="selectedProperty?.nameBuilding"
                class="w-full h-full object-cover transition-transform duration-700 ease-out" />
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
</style>