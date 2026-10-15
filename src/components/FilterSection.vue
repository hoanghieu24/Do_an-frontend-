<template>
  <section class="py-10 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-b border-slate-200/80 relative">
    <div class="max-w-7xl mx-auto">
      <!-- Main Filter Card -->
      <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
        
        <!-- Header bar của Filter -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-2">
          <div>
            <h3 class="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Bộ Lọc Tìm Kiếm Bất Động Sản</span>
            </h3>
            <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
              Tra cứu nhanh theo loại hình, khu vực, ngân sách và diện tích sàn
            </p>
          </div>

          <!-- Nút toggle nâng cao -->
          <button
            type="button"
            @click="toggleAdvancedSearch"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors self-start sm:self-auto py-1 px-2.5 rounded-lg hover:bg-slate-50"
          >
            <span>{{ showAdvancedSearch ? 'Thu gọn tiêu chí' : 'Tiêu chí nâng cao' }}</span>
            <svg
              class="w-4 h-4 transition-transform duration-200"
              :class="{ 'rotate-180': showAdvancedSearch }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Form tìm kiếm chính -->
        <form @submit.prevent="handleSearch">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- 1. Loại hình -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Loại hình
              </label>
              <div class="relative">
                <select
                  v-model="searchCriteria.typeCode"
                  class="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all appearance-none cursor-pointer pr-10"
                >
                  <option value="">Tất cả loại hình</option>
                  <option v-for="(value, key) in rentTypes" :key="key" :value="key">{{ value }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- 2. Quận / Khu vực -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Khu vực (Quận)
              </label>
              <div class="relative">
                <select
                  v-model="searchCriteria.district"
                  class="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all appearance-none cursor-pointer pr-10"
                >
                  <option value="">Tất cả quận / huyện</option>
                  <option v-for="(value, key) in districts" :key="key" :value="key">{{ value }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- 3. Khoảng giá -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mức giá thuê
              </label>
              <div class="relative">
                <select
                  v-model="searchCriteria.priceRange"
                  class="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all appearance-none cursor-pointer pr-10"
                >
                  <option value="">Tất cả mức giá</option>
                  <option value="0-50000000">Dưới 50 triệu / tháng</option>
                  <option value="50000000-100000000">50 - 100 triệu / tháng</option>
                  <option value="100000000-250000000">100 - 250 triệu / tháng</option>
                  <option value="250000000-500000000">250 - 500 triệu / tháng</option>
                  <option value="500000000-">Trên 500 triệu / tháng</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- 4. Diện tích sàn -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Diện tích sàn
              </label>
              <div class="relative">
                <select
                  v-model="searchCriteria.areaRange"
                  class="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all appearance-none cursor-pointer pr-10"
                >
                  <option value="">Tất cả diện tích</option>
                  <option value="0-100">Dưới 100 m²</option>
                  <option value="100-250">100 - 250 m²</option>
                  <option value="250-500">250 - 500 m²</option>
                  <option value="500-1000">500 - 1.000 m²</option>
                  <option value="1000-">Trên 1.000 m²</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Advanced Fields (Collapsible) -->
          <div v-if="showAdvancedSearch" class="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Tên tòa nhà</label>
              <input
                v-model="searchCriteria.name"
                type="text"
                placeholder="Ví dụ: Landmark, Bitexco, Keangnam..."
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Tên đường / Phường</label>
              <input
                v-model="searchCriteria.street"
                type="text"
                placeholder="Ví dụ: Lê Duẩn, Nguyễn Huệ..."
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Số tầng hầm tối thiểu</label>
              <input
                v-model="searchCriteria.numberOfBasement"
                type="number"
                min="0"
                placeholder="0"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>

          <!-- Buttons Action Row -->
          <div class="mt-6 flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              @click="resetSearch"
              class="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all active:scale-95 flex items-center gap-1.5"
            >
              <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Đặt lại</span>
            </button>

            <button
              type="submit"
              :disabled="isLoading"
              class="px-7 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 text-white text-sm font-bold shadow-md shadow-emerald-950/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>{{ isLoading ? 'Đang tìm kiếm...' : 'Tìm kiếm tòa nhà' }}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const searchCriteria = ref({
  typeCode: '',
  district: '',
  priceRange: '',
  areaRange: '',
  name: '',
  ward: '',
  street: '',
  numberOfBasement: '',
  floorArea: '',
  managerName: ''
})

const showAdvancedSearch = ref(false)
const districts = ref({})
const rentTypes = ref({})
const isLoading = ref(false)

const emit = defineEmits(['search', 'search-start', 'search-error'])

const toggleAdvancedSearch = () => {
  showAdvancedSearch.value = !showAdvancedSearch.value
}

const handleSearch = async () => {
  try {
    isLoading.value = true
    emit('search-start')

    const params = {}
    if (searchCriteria.value.typeCode) params.typeCode = searchCriteria.value.typeCode
    if (searchCriteria.value.priceRange) params.priceRange = searchCriteria.value.priceRange
    if (searchCriteria.value.district) params.district = searchCriteria.value.district
    if (searchCriteria.value.name) params.name = searchCriteria.value.name
    if (searchCriteria.value.ward) params.ward = searchCriteria.value.ward
    if (searchCriteria.value.street) params.street = searchCriteria.value.street
    if (searchCriteria.value.numberOfBasement) params.numberOfBasement = searchCriteria.value.numberOfBasement

    const response = await axios.get('/api/buildings', { params })

    emit('search', {
      criteria: { ...searchCriteria.value },
      results: response.data,
      params: params
    })
  } catch (error) {
    console.error('Lỗi khi tìm kiếm:', error)
    emit('search-error', error)
  } finally {
    isLoading.value = false
  }
}

const resetSearch = () => {
  searchCriteria.value = {
    typeCode: '',
    district: '',
    priceRange: '',
    areaRange: '',
    name: '',
    ward: '',
    street: '',
    numberOfBasement: '',
    floorArea: '',
    managerName: ''
  }

  emit('search', {
    criteria: {},
    results: null
  })
}

const loadInitialData = async () => {
  try {
    const [districtsRes, rentTypesRes] = await Promise.all([
      axios.get('/api/buildings/districts').catch(() => ({ data: {} })),
      axios.get('/api/buildings/rent-types').catch(() => ({ data: {} }))
    ])
    districts.value = districtsRes.data || {}
    rentTypes.value = rentTypesRes.data || {}
  } catch (error) {
    console.error('Lỗi khi tải danh mục tìm kiếm:', error)
  }
}

onMounted(() => {
  loadInitialData()
})

defineExpose({ resetSearch })
</script>