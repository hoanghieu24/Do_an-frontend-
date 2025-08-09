<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <!-- Breadcrumb -->
    <nav class="bg-white rounded-lg shadow-xs p-3 mb-6">
      <ol class="flex items-center space-x-2 text-sm">
        <li>
          <a href="#" class="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </a>
        </li>
        <li class="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </li>
        <li class="text-gray-700 font-medium">Danh sách tòa nhà</li>
      </ol>
    </nav>

    <!-- Search Form -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div class="bg-blue-600 px-6 py-4">
        <h3 class="text-lg font-semibold text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Tìm kiếm tòa nhà
        </h3>
      </div>
      <div class="p-6">
        <form @submit.prevent="searchBuildings" class="space-y-4">
          <!-- Row 1 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tên tòa nhà</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <input v-model="searchParams.name"
                  class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Nhập tên tòa nhà...">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Diện tích sàn (m²)</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <input v-model="searchParams.floorarea" type="number"
                  class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="0">
              </div>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Quận</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <select v-model="searchParams.district"
                  class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                  <option value="">Chọn quận...</option>
                  <option v-for="(value, key) in districts" :value="key" :key="key">{{ value }}</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phường</label>
              <input v-model="searchParams.ward"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Nhập phường">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Đường</label>
              <input v-model="searchParams.street"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Nhập tên đường">
            </div>
          </div>

          <!-- Row 3 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Số tầng hầm</label>
              <input v-model="searchParams.numberofbasement" type="number"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="0">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Hướng</label>
              <input v-model="searchParams.direction"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Nhập hướng">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Hạng</label>
              <input v-model="searchParams.lever" type="number"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Nhập hạng">
            </div>
          </div>

          <!-- Row 4 -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Diện tích từ (m²)</label>
              <input v-model="searchParams.areaFrom" type="number"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="0">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Diện tích đến (m²)</label>
              <input v-model="searchParams.areaTo" type="number"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="0">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Giá thuê từ (VND)</label>
              <input v-model="searchParams.rentPriceFrom" type="number"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="0">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Giá thuê đến (VND)</label>
              <input v-model="searchParams.rentPriceTo" type="number"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="0">
            </div>
          </div>

          <!-- Row 5 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tên quản lý</label>
              <input v-model="searchParams.managername"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Nhập tên quản lý">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">SĐT quản lý</label>
              <input v-model="searchParams.managerphone"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="0123456789">
            </div>
            <div v-if="userRole === 'MANAGER'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Nhân viên phụ trách</label>
              <select v-model="searchParams.staffId"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="">Chọn nhân viên...</option>
                <option v-for="staff in staffs" :value="staff.id" :key="staff.id">{{ staff.fullName }}</option>
              </select>
            </div>
          </div>

          <!-- Rent Types -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Loại cho thuê</label>
            <div class="flex flex-wrap gap-3">
              <div v-for="(value, key) in rentTypes" :key="key" class="flex items-center">
                <input :id="'type-' + key" :value="key" v-model="searchParams.typeCode" type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <label :for="'type-' + key" class="ml-2 text-sm text-gray-700">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ value }}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex justify-center space-x-4 pt-4">
            <button type="submit"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Tìm kiếm
            </button>
            <button @click="resetSearch" type="button"
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Đặt lại
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Building List -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
        <h3 class="text-lg font-semibold text-gray-900 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Danh sách tòa nhà
        </h3>
        <div class="mt-3 md:mt-0 space-x-2">
          <button v-if="userRole === 'MANAGER'" @click="deleteSelectedBuildings"
            :disabled="selectedBuildings.length === 0"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Xóa
          </button>

          <router-link to="/admin/building-edit"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Thêm mới
          </router-link>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên
                tòa nhà</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa
                chỉ</th>
              <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Tầng
                hầm</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quản lý</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SĐT
              </th>
              <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                D.T.Sàn</th>
              <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                D.T.Trống</th>
              <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                D.T.Thuê</th>
              <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Giá
                thuê</th>
              <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Phí DV
              </th>
              <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Phí MG
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="building in buildings" :key="building.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" v-model="selectedBuildings" :value="building.id"
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">{{ building.nameBuilding }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ building.address }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                  {{ building.numberOfBasement }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ building.managername }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ building.managerphone }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {{ formatNumber(building.floorarea) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {{ formatNumber(building.empty_area) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {{ formatNumber(building.rental_area) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {{ formatCurrency(building.rentPrice) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {{ formatCurrency(building.servicefee) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {{ formatCurrency(building.brokerage_fee) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <router-link :to="'/admin/building-edit-' + building.id" class="text-blue-600 hover:text-blue-900">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </router-link>

                  <button v-if="userRole === 'MANAGER'" @click="confirmDeleteBuilding(building.id)"
                    class="text-red-600 hover:text-red-900">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <button v-if="userRole === 'MANAGER'" @click="showAssignmentModal(building.id)"
                    class="text-indigo-600 hover:text-indigo-900">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="buildings.length === 0">
              <td colspan="13" class="px-6 py-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Không có dữ liệu</h3>
                <p class="mt-1 text-sm text-gray-500">Không tìm thấy tòa nhà nào phù hợp với tiêu chí tìm kiếm của bạn.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Hiển thị
              <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
              đến
              <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span>
              của
              <span class="font-medium">{{ totalItems }}</span>
              kết quả
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button @click="prevPage" :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <span class="sr-only">Previous</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <template v-for="page in visiblePages" :key="page">
                <button @click="goToPage(page)"
                  :class="{ 'z-10 bg-blue-50 border-blue-500 text-blue-600': page === currentPage, 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== currentPage }"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  {{ page }}
                </button>
              </template>

              <button @click="nextPage" :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <span class="sr-only">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Assignment Modal -->
    <div class="fixed z-10 inset-0 overflow-y-auto" v-if="showAssignmentModal" aria-labelledby="modal-title"
      role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Giao tòa nhà cho nhân viên
                </h3>
                <div class="mt-2">
                  <div class="alert alert-info bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-blue-700">
                          Chọn nhân viên sẽ phụ trách tòa nhà này
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                            <input type="checkbox" v-model="selectAllStaffs" @change="toggleSelectAllStaffs"
                              class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                          </th>
                          <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên
                            nhân
                            viên</th>
                          <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email
                          </th>
                          <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SĐT
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="staff in allStaffs" :key="staff.id" class="hover:bg-gray-50">
                          <td class="px-6 py-4 whitespace-nowrap">
                            <input type="checkbox" v-model="selectedStaffs" :value="staff.id"
                              class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 h-10 w-10">
                                <div
                                  class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                  {{ staff.name.charAt(0) }}
                                </div>
                              </div>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">{{ staff.name }}</div>
                                <div class="text-sm text-gray-500">{{ staff.position }}</div>
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ staff.email }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ staff.phone }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" @click="saveAssignment"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Lưu thay đổi
            </button>
            <button type="button" @click="closeModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="fixed z-10 inset-0 overflow-y-auto" v-if="showDeleteModal" aria-labelledby="modal-title" role="dialog"
      aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Xác nhận xóa
                </h3>
                <div class="mt-2">
                  <div class="alert alert-danger bg-red-50 border-l-4 border-red-500 p-4">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-red-700">
                          <span v-if="Array.isArray(buildingToDelete)">
                            Bạn có chắc chắn muốn xóa <strong>{{ buildingToDelete.length }}</strong> tòa nhà đã chọn?
                          </span>
                          <span v-else>
                            Bạn có chắc chắn muốn xóa tòa nhà này?
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-500 mt-2">
                    Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" @click="confirmDelete"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Xác nhận xóa
            </button>
            <button type="button" @click="closeModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Notification -->
    <div aria-live="assertive"
      class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50">
      <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
        <transition enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
          leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <div v-if="showSuccessNotification"
            class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div class="p-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="text-sm font-medium text-gray-900">
                    {{ successMessage }}
                  </p>
                </div>
                <div class="ml-4 flex-shrink-0 flex">
                  <button @click="showSuccessNotification = false"
                    class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span class="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchParams: {
        name: '',
        floorarea: '',
        district: '',
        ward: '',
        street: '',
        numberofbasement: '',
        direction: '',
        lever: '',
        areaFrom: '',
        areaTo: '',
        rentPriceFrom: '',
        rentPriceTo: '',
        managername: '',
        managerphone: '',
        staffId: '',
        typeCode: []
      },
      buildings: [],
      selectedBuildings: [],
      selectAll: false,
      selectAllStaffs: false,
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 0,
      districts: {},
      rentTypes: {},
      staffs: [],
      allStaffs: [],
      selectedStaffs: [],
      currentBuildingId: null,
      buildingToDelete: null,
      userRole: 'MANAGER',
      successMessage: '',
      showAssignmentModal: false,
      showDeleteModal: false,
      showSuccessNotification: false
    };
  },
  computed: {
    visiblePages() {
      const range = 2; // Number of pages to show before and after current page
      const start = Math.max(1, this.currentPage - range);
      const end = Math.min(this.totalPages, this.currentPage + range);

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  mounted() {
    this.fetchInitialData();
    this.loadBuildings();
  },
  methods: {
    fetchInitialData() {
  axios.all([
    axios.get('/api/buildings/districts'),
    axios.get('/api/buildings/rent-types'),
    axios.get('/api/buildings/staffs')
  ])
  .then(axios.spread((districtsRes, rentTypesRes, staffsRes) => {
    this.districts = districtsRes.data;
    this.rentTypes = rentTypesRes.data;
    this.staffs = staffsRes.data;
    this.allStaffs = staffsRes.data;

    alert("✅ Đã tải dữ liệu ban đầu thành công!");
    console.log("🏙️ Quận:", this.districts);
  }))
  .catch(error => {
    console.error('🚨 Lỗi khi tải dữ liệu:', error);
    alert("❌ Lỗi khi tải dữ liệu!");
  });
    },
    loadBuildings() {
      const params = {
        ...this.searchParams,
        page: this.currentPage - 1,
        size: this.itemsPerPage,
        typeCode: this.searchParams.typeCode.join(',')
      };

      axios.get('/api/buildings', { params })
        .then(res => {
          if (res.data.length === 0) {
            alert("❗ Không tìm thấy tòa nhà nào phù hợp.");
          }
          this.buildings = res.data;
        })
        .catch(error => {
          console.error('🚨 Lỗi khi tải danh sách tòa nhà:', error);
          alert("⚠️ Đã xảy ra lỗi khi gọi dữ liệu, vui lòng thử lại.");
        });
    },
    searchBuildings() {
      this.currentPage = 1;
      this.loadBuildings();
    },
    resetSearch() {
      this.searchParams = {
        name: '',
        floorarea: '',
        district: '',
        ward: '',
        street: '',
        numberofbasement: '',
        direction: '',
        lever: '',
        areaFrom: '',
        areaTo: '',
        rentPriceFrom: '',
        rentPriceTo: '',
        managername: '',
        managerphone: '',
        staffId: '',
        typeCode: []
      };
      this.searchBuildings();
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedBuildings = this.buildings.map(building => building.id);
      } else {
        this.selectedBuildings = [];
      }
    },
    toggleSelectAllStaffs() {
      if (this.selectAllStaffs) {
        this.selectedStaffs = this.allStaffs.map(staff => staff.id);
      } else {
        this.selectedStaffs = [];
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadBuildings();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadBuildings();
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        this.loadBuildings();
      }
    },
    showAssignmentModal(buildingId) {
      this.currentBuildingId = buildingId;
      this.selectedStaffs = [];
      this.showAssignmentModal = true;

      axios.get(`/api/buildings/${buildingId}/staffs`)
        .then(response => {
          this.selectedStaffs = response.data.map(staff => staff.id);
          this.selectAllStaffs = this.selectedStaffs.length === this.allStaffs.length;
        })
        .catch(error => {
          console.error('Error loading staff assignments:', error);
        });
    },
    saveAssignment() {
      const data = {
        buildingId: this.currentBuildingId,
        staffIds: this.selectedStaffs
      };

      axios.put('/api/buildings/assign-staff', data)
        .then(() => {
          this.showSuccess('Giao tòa nhà thành công!');
          this.showAssignmentModal = false;
        })
        .catch(error => {
          console.error('Error saving assignment:', error);
        });
    },
    confirmDeleteBuilding(buildingId) {
      this.buildingToDelete = buildingId;
      this.showDeleteModal = true;
    },
    deleteSelectedBuildings() {
      if (this.selectedBuildings.length === 0) {
        this.showError('Vui lòng chọn ít nhất một tòa nhà để xóa');
        return;
      }

      this.buildingToDelete = this.selectedBuildings;
      this.showDeleteModal = true;
    },
    confirmDelete() {
      const buildingIds = Array.isArray(this.buildingToDelete)
        ? this.buildingToDelete
        : [this.buildingToDelete];

      axios.delete('/api/buildings/delete/', { data: buildingIds })
        .then(() => {
          this.showSuccess(
            Array.isArray(this.buildingToDelete)
              ? `Đã xóa ${this.buildingToDelete.length} tòa nhà thành công!`
              : 'Xóa tòa nhà thành công!'
          );
          this.loadBuildings();
          this.selectedBuildings = [];
          this.selectAll = false;
          this.showDeleteModal = false;
        })
        .catch(error => {
          console.error('Error deleting buildings:', error);
          this.showError('Có lỗi xảy ra khi xóa tòa nhà');
        });
    },
    formatNumber(value) {
      return value ? value.toLocaleString() : '0';
    },
    formatCurrency(value) {
      return value ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value) : '0 ₫';
    },
    showSuccess(message) {
      this.successMessage = message;
      this.showSuccessNotification = true;

      setTimeout(() => {
        this.showSuccessNotification = false;
      }, 3000);
    },
    showError(message) {
      this.successMessage = message;
      this.showSuccessNotification = true;

      setTimeout(() => {
        this.showSuccessNotification = false;
      }, 3000);
    },
    closeModal() {
      this.showAssignmentModal = false;
      this.showDeleteModal = false;
    }
  }
};
</script>