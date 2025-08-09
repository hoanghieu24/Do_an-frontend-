<template>
  <section
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <!-- Floating background elements - More dynamic -->
    <div class="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
      <div
        class="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-float-slow">
      </div>
      <div
        class="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-float-medium animation-delay-2000">
      </div>
      <div
        class="absolute top-1/3 right-1/3 w-56 h-56 bg-purple-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-15 animate-float-fast animation-delay-3000">
      </div>
    </div>

    <!-- Floating particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-for="i in 30" :key="i" class="absolute rounded-full bg-blue-200 opacity-20"
        :class="`particle-${Math.ceil(Math.random() * 3)}`" :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 10 + 2}px`,
          height: `${Math.random() * 10 + 2}px`,
          animationDelay: `${Math.random() * 5}s`
        }"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto ">
      <!-- Header section with enhanced animation -->
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-10 ">
          <span class="relative inline-block">
            <span class="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 ">
              Danh sách yêu thích
            </span>
            <span
              class="absolute bottom-0 left-0 w-full h-3 bg-indigo-200 opacity-40 -z-0 animate-underline-expand rounded-full"></span>
          </span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto relative">
          <span class="relative inline-block">
            <span class="relative z-10">Những tòa nhà bạn đã lưu sẽ xuất hiện tại đây</span>
            <span
              class="absolute bottom-0 left-0 w-full h-1 bg-blue-100 opacity-60 -z-0 animate-underline-expand animation-delay-500 rounded-full"></span>
          </span>
        </p>
      </div>

      <!-- Loading state with better skeleton -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="animate-pulse">
          <div class="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-md"></div>
          <div class="mt-4 h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-3/4"></div>
          <div class="mt-2 h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-1/2"></div>
          <div class="mt-6 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg"></div>
        </div>
      </div>

      <!-- Empty state with more visual appeal -->
      <div v-else-if="favourites.length === 0" class="text-center py-16 animate-fade-in-up">
        <div class="inline-flex items-center justify-center p-6 bg-white rounded-full mb-6 shadow-lg relative">
          <div
            class="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 opacity-10 animate-pulse">
          </div>
          <svg class="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
            </path>
          </svg>
        </div>
        <h3 class="text-2xl font-medium text-gray-900 mb-3">Danh sách yêu thích trống</h3>
        <p class="text-gray-600 max-w-md mx-auto mb-6">Bạn chưa thêm bất động sản nào vào danh sách yêu thích.</p>
        <router-link to="/properties"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md">
          <svg class="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          Khám phá bất động sản
        </router-link>
      </div>

      <!-- Favorites grid with enhanced card design -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(property, index) in favourites" :key="property.id" class="opacity-0 animate-fade-in-up"
          :style="{ 'animation-delay': `${index * 100}ms` }">
          <div
            class="property-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100 h-full flex flex-col group">
            <!-- Badge nổi bật with animation -->
            <div v-if="property.isFeatured"
              class="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-md transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
              <span class="relative z-10">NỔI BẬT</span>
              <span class="absolute inset-0 bg-white opacity-10 rounded-full"></span>
            </div>

            <!-- Nút xóa yêu thích with better interaction -->
            <button @click.stop="removeFavorite(customerId, property.id)"
              class="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-red-100 transition-all duration-300 z-10 shadow-md group-hover:scale-110 group/remove"
              aria-label="Remove from favorites">
              <svg class="w-6 h-6 transition-all duration-300" :class="{
                'text-red-400 group-hover/remove:text-red-600 fill-red-400 group-hover/remove:fill-red-100': true,
              }" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <!-- Hình ảnh with parallax effect container -->
            <div class="property-image relative h-48 overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent z-0"></div>
              <img :src="getImageUrl(property.image)" :alt="property.nameBuilding"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy">
              <!-- Giá with gradient background -->
              <div
                class="absolute bottom-3 left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md transform group-hover:scale-105 transition-transform duration-300">
                {{ formatPrice(property.rentPrice) }}
              </div>
            </div>

            <!-- Thông tin cơ bản -->
            <div class="p-5 flex-1 flex flex-col">
              <h3
                class="text-xl font-bold text-gray-800 mb-2 truncate group-hover:text-indigo-600 transition-colors duration-300">
                {{ property.name }}
              </h3>

              <div class="flex items-center text-gray-600 mb-2">
                <svg class="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span class="truncate">
                  <p class="text-gray-600 mt-1">{{ getFullAddress(property) }}</p>
                </span>
              </div>

              <div class="flex items-center text-gray-600 mb-3">
                <svg class="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span class="truncate">{{ property.managername || 'Chưa có thông tin' }}</span>
              </div>

              <!-- Thông số kỹ thuật with hover effects -->
              <div class="grid grid-cols-3 gap-2 text-center mt-auto mb-4">
                <div
                  class="bg-gray-100 rounded-lg p-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-inner">
                  <div class="text-gray-500 text-xs">Diện tích</div>
                  <div class="font-semibold text-gray-900">{{ property.floorarea || '---' }} m²</div>
                </div>
                <div
                  class="bg-gray-100 rounded-lg p-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-inner">
                  <div class="text-gray-500 text-xs">Tầng hầm</div>
                  <div class="font-semibold text-gray-900">{{ property.numberOfBasement || '---' }}</div>
                </div>
                <div
                  class="bg-gray-100 rounded-lg p-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-inner">
                  <div class="text-gray-500 text-xs">Nhân viên</div>
                  <div class="font-semibold text-gray-900">{{ property.staffid?.length || 0 }}</div>
                </div>
              </div>

              <!-- Nút xem chi tiết with gradient and hover animation -->
              <button @click="openPropertyDetail(property)"
                class="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg mt-auto transform hover:-translate-y-0.5 flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="relative">
                  Xem chi tiết
                  <span
                    class="absolute bottom-0 left-0 w-full h-0.5 bg-white opacity-30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Property Detail Modal - Enhanced -->
    <transition name="modal">
      <div v-if="selectedProperty" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- Background overlay with transition -->
          <transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="ease-in duration-200" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-900 opacity-75" @click="selectedProperty = null"></div>
            </div>
          </transition>

          <!-- Modal content with scale transition -->
          <transition enter-active-class="ease-out duration-500"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100" leave-active-class="ease-in duration-300"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div
              class="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full relative">
              <!-- Close button (top right corner) -->
              <button @click="selectedProperty = null"
                class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-gray-100 transition-colors shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </button>

              <div class="bg-white px-6 pt-7 pb-6 sm:p-8">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <!-- Title with improved gradient -->
                    <h3 class="text-3xl leading-8 font-extrabold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                      <span
                        class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 animate-gradient">
                        {{ selectedProperty.nameBuilding }}
                      </span>
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <!-- Property Image with enhanced hover effect -->
                      <div class="relative h-72 rounded-xl overflow-hidden group">
                        <img :src="getImageUrl(selectedProperty.image)" :alt="selectedProperty.name"
                          class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                        <!-- Image badge -->
                        <div class="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                          <span
                            class="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
                            {{ selectedProperty.type || 'Cho thuê' }}
                          </span>
                        </div>
                      </div>

                      <!-- Property Details -->
                      <div>
                        <ul class="space-y-5">
                          <!-- Address -->
                          <li class="flex items-start border-b border-gray-100 pb-4 animate-fade-in-up"
                            style="animation-delay: 100ms">
                            <div class="bg-indigo-100 p-2 rounded-lg mr-4">
                              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              </svg>
                            </div>
                            <div>
                              <h4 class="font-semibold text-gray-900">Tên Toà Nhà :</h4>
                              <p class="text-gray-600 mt-1">{{ selectedProperty.address }}</p>
                              <p class="text-red-500 font-medium mt-1">{{ selectedProperty.name }}</p>
                            </div>
                          </li>

                          <!-- Manager -->
                          <li class="flex items-start border-b border-gray-100 pb-4 animate-fade-in-up"
                            style="animation-delay: 200ms">
                            <div class="bg-indigo-100 p-2 rounded-lg mr-4">
                              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                              </svg>
                            </div>
                            <div>
                              <h4 class="font-semibold text-gray-900">Địa Chỉ:</h4>
                              <p class="text-gray-600 mt-1">{{ getFullAddress(property) }}</p>
                            </div>
                          </li>
                          <li class="flex items-start border-b border-gray-100 pb-4 animate-fade-in-up"
                            style="animation-delay: 200ms">
                            <div class="bg-indigo-100 p-2 rounded-lg mr-4">
                              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                              </svg>
                            </div>
                            <div>
                              <h4 class="font-semibold text-gray-900">Quản lý:</h4>
                              <p class="text-gray-600 mt-1">{{ selectedProperty.managername || 'Đang cập nhật' }}</p>
                            </div>
                          </li>

                          <!-- Price -->
                          <li class="flex items-start border-b border-gray-100 pb-4 animate-fade-in-up"
                            style="animation-delay: 300ms">
                            <div class="bg-indigo-100 p-2 rounded-lg mr-4">
                              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                              </svg>
                            </div>
                            <div>
                              <h4 class="font-semibold text-gray-900">Giá thuê:</h4>
                              <p class="text-blue-600 font-bold text-lg mt-1">{{ formatPrice(selectedProperty.rentPrice)
                                }}</p>
                            </div>
                          </li>

                          <!-- Area -->
                          <li class="flex items-start border-b border-gray-100 pb-4 animate-fade-in-up"
                            style="animation-delay: 400ms">
                            <div class="bg-indigo-100 p-2 rounded-lg mr-4">
                              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4">
                                </path>
                              </svg>
                            </div>
                            <div>
                              <h4 class="font-semibold text-gray-900">Diện tích:</h4>
                              <p class="text-gray-600 mt-1">{{ selectedProperty.floorarea || '---' }} m²</p>
                            </div>
                          </li>

                          <!-- Basement -->
                          <li class="flex items-start animate-fade-in-up" style="animation-delay: 500ms">
                            <div class="bg-indigo-100 p-2 rounded-lg mr-4">
                              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                                </path>
                              </svg>
                            </div>
                            <div>
                              <h4 class="font-semibold text-gray-900">Số tầng hầm:</h4>
                              <p class="text-gray-600 mt-1">{{ selectedProperty.numberOfBasement || '---' }}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer with improved button -->
              <div class="bg-gray-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse border-t border-gray-200">
                <button type="button"
                  class="w-full inline-flex justify-center items-center rounded-xl border border-transparent shadow-lg px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-lg font-semibold text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-base transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
                  @click="selectedProperty = null">
                  Đóng
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

// API base
const apiBase = 'http://localhost:8080/api/buildings'

// Lấy customerId từ localStorage
const rawUser = localStorage.getItem('user')
const customerId = rawUser ? JSON.parse(rawUser).id?.[0] : null

// Inject từ cha để đồng bộ trạng thái "yêu thích"
const toggleFavoriteGlobal = inject('toggleFavorite', null) // optional fallback
if (!toggleFavoriteGlobal) {
  console.warn('⚠️ Không tìm thấy toggleFavoriteGlobal từ inject')
}

// State
const favourites = ref([])
const loading = ref(false)
const selectedProperty = ref(null)

// Lấy URL ảnh
const getImageUrl = (path) => {
  if (!path) {
    return 'https://c1.klipartz.com/pngpicture/942/649/sticker-png-architecture-icon-house-icon-design-symbol-triangle-line-logo-roof.png'
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `http://localhost:8080/img/${cleanPath}`
}

// Format tiền
const formatPrice = (price) => {
  if (!price) return '0 VND'
  return new Intl.NumberFormat('vi-VN').format(price) + ' VND'
}

// Lấy chi tiết toà nhà
const fetchBuildingDetail = async (buildingId) => {
  try {
    const res = await axios.get(`${apiBase}/${buildingId}`)
    return res.data
  } catch (error) {
    console.error(`❌ Lỗi khi fetch toà nhà ID ${buildingId}:`, error)
    return null
  }
}

// Lấy danh sách yêu thích
const fetchFavourites = async () => {
  if (!customerId) {
    console.warn('❌ Không có customerId, không thể lấy danh sách yêu thích.')
    return
  }

  loading.value = true
  try {
    const res = await axios.get(`${apiBase}/favorites/${customerId}`)
    const rawFavourites = res.data || []

    const detailPromises = rawFavourites.map(fav => fetchBuildingDetail(fav.buildingId))
    const detailResults = await Promise.all(detailPromises)

    favourites.value = detailResults.filter(b => b && b.id)
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách yêu thích:', error)
    toast.error('Không thể tải danh sách yêu thích 😢')
  } finally {
    loading.value = false
  }
}

// Xoá khỏi yêu thích
const removeFavorite = async (customerId, buildingId) => {
  try {
    const res = await axios.post(`${apiBase}/favorites/remove`, {
      customerId,
      buildingId
    })

    if (res.data?.success === false) {
      throw new Error(res.data.message || 'Xoá không thành công')
    }

    toast.success('🗑️ Đã xoá khỏi danh sách yêu thích!')
    
    // Cập nhật local UI
    favourites.value = favourites.value.filter(b => b.id !== buildingId)

    // Gọi inject nếu có (để đồng bộ tim đỏ các nơi khác)
    if (toggleFavoriteGlobal) {
      toggleFavoriteGlobal(buildingId)
    }
  } catch (error) {
    console.error('❌ Lỗi khi xoá favorite:', error)
    toast.error('Xoá yêu thích thất bại 😓')
    fetchFavourites() // fallback
  }
}

// Mở modal chi tiết
const openPropertyDetail = (property) => {
  selectedProperty.value = property
}

// Tạo địa chỉ đầy đủ
const getFullAddress = (property) => {
  if (!property) return 'Đang cập nhật địa chỉ'

  const {
    district = '',
    ward = '',
    street = ''
  } = property

  const parts = []
  if (district && district !== 'QUAN_0') parts.push(district)
  if (ward) parts.push(ward)
  if (street) parts.push(street)

  return parts.length ? parts.join(', ') : 'Đang cập nhật địa chỉ'
}

// Khi mount thì fetch danh sách
onMounted(() => {
  fetchFavourites()
})
</script>


<style scoped>
/* Enhanced floating animation */
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

@keyframes float3 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  50% {
    transform: translate(10px, -15px) rotate(2deg);
  }
}

.animate-float-slow {
  animation: float1 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float2 10s ease-in-out infinite;
}

.animate-float-fast {
  animation: float3 7s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-3000 {
  animation-delay: 3s;
}

/* Particle animations */
.particle-1 {
  animation: particle-float 15s ease-in-out infinite;
}

.particle-2 {
  animation: particle-float 20s ease-in-out infinite;
}

.particle-3 {
  animation: particle-float 12s ease-in-out infinite;
}

@keyframes particle-float {

  0%,
  100% {
    transform: translateY(0) translateX(0);
  }

  25% {
    transform: translateY(-20px) translateX(10px);
  }

  50% {
    transform: translateY(10px) translateX(-15px);
  }

  75% {
    transform: translateY(-10px) translateX(15px);
  }
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
  animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-fade-in-up {
  animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
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
  animation: underlineExpand 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  transform-origin: left;
}

/* Skeleton loading with gradient */
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

/* Property card hover effect */
.property-card {
  position: relative;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.property-image {
  position: relative;
  overflow: hidden;
}

.property-image img {
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.property-image:hover img {
  transform: scale(1.05);
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Smooth transitions for all elements */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* Button press effect */
button:active {
  transform: scale(0.98);
}

/* Focus styles for accessibility */
button:focus,
a:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}
</style>