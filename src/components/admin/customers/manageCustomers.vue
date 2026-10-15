<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <!-- Breadcrumb -->
    <nav class="bg-white rounded-lg shadow-xs p-3 mb-6">
      <ol class="flex items-center space-x-2 text-sm">
        <li>
          <router-link to="/admin/dashboard" class="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </router-link>
        </li>
        <li class="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </li>
        <li class="text-gray-700 font-medium">Customer-list</li>
      </ol>
    </nav>

    <!-- Search Form -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div class="bg-blue-600 px-6 py-4">
        <h3 class="text-lg font-semibold text-white text-center">
          Tìm Kiếm Khách Hàng
        </h3>
      </div>
      <div class="p-6">
        <form @submit.prevent="searchCustomers" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tên Khách Hàng</label>
              <input v-model="searchParams.fullName" type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Nhập tên khách hàng">
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">SĐT Di Động</label>
              <input v-model="searchParams.phone" type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Nhập số điện thoại">
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input v-model="searchParams.email" type="email"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Nhập email">
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tình Trạng</label>
              <select v-model="searchParams.status"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="">--- Chọn Trạng Thái ---</option>
                <option v-for="status in statusOptions" :key="status.value" :value="status.value">
                  {{ status.label }}
                </option>
              </select>
            </div>

            <!-- Staff (only for MANAGER) -->
            <div v-if="userRole === 'ROLE_MANAGER'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Nhân Viên Phụ Trách</label>
              <select v-model="searchParams.staffId"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="">--- Chọn Nhân Viên ---</option>
                <option v-for="staff in staffs" :key="staff.id" :value="staff.id">
                  {{ staff.fullName }}
                </option>
              </select>
            </div>

            <!-- Created By -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Người Thêm</label>
              <input v-model="searchParams.createdBy" type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Nhập tên người thêm">
            </div>
          </div>

          <!-- Search Button -->
          <div class="flex justify-start pt-2">
            <button type="submit"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Tìm Kiếm
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Danh Sách Khách Hàng</h2>
      <div class="flex space-x-2">
        <button v-if="userRole === 'ROLE_MANAGER'" @click="deleteSelectedCustomers"
          :disabled="selectedCustomers.length === 0"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
          </svg>
          Xóa
        </button>

        <router-link to="/admin/customer-edit"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
          </svg>
          Thêm mới
        </router-link>
      </div>
    </div>

    <!-- Customers Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên khách hàng
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số di động
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nhu cầu
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Người thêm
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày thêm
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tình trạng
              </th>
              <th scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-white z-10">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Loading State -->
            <tr v-if="loading">
              <td colspan="9" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center justify-center space-y-3">
                  <svg class="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <p class="text-gray-600 font-medium animate-pulse">Đang tải dữ liệu khách hàng...</p>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-else-if="!customers || customers.length === 0">
              <td colspan="9" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center justify-center space-y-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-gray-600 font-medium">Không tìm thấy khách hàng nào</p>
                </div>
              </td>
            </tr>

            <!-- Customers Data -->
            <tr v-else v-for="customer in customers" :key="customer.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" v-model="selectedCustomers" :value="customer.id"
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ customer.fullName || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ customer.phone || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ customer.email || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ customer.demand || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ customer.createdBy || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(customer.createdDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="getStatusClass(customer.status)">
                  {{ getStatusText(customer.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right sticky right-0 bg-white z-10">
                <div class="flex justify-end space-x-2">
                  <!-- Edit Button -->
                  <router-link :to="`/admin/customer-edit/${customer.id}`" class="text-yellow-600 hover:text-yellow-900"
                    title="Sửa khách hàng">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </router-link>

                  <!-- Delete Button (MANAGER only) -->
                  <button v-if="userRole === 'ROLE_MANAGER'" @click="confirmDeleteCustomer(customer.id)"
                    class="text-red-600 hover:text-red-900" title="Xóa khách hàng">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <!-- Assignment Button (MANAGER only) -->
                  <button v-if="userRole === 'ROLE_MANAGER'" @click="openAssignmentModal(customer.id)"
                    class="text-blue-600 hover:text-blue-900" title="Giao khách hàng">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="customers && customers.length > 0"
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between items-center">
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
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button @click="prevPage" :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <span class="sr-only">Previous</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
                :class="{ 'z-10 bg-blue-50 border-blue-500 text-blue-600': page === currentPage, 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== currentPage }"
                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                {{ page }}
              </button>

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
  </div>

  <!-- Assignment Modal -->
  <!-- Assignment Modal (Sửa lại) -->
  <div class="fixed z-10 inset-0 overflow-y-auto" v-if="showAssignmentModal" aria-labelledby="modal-title" role="dialog"
    aria-modal="true">
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
                Giao Khách Hàng Cho Nhân Viên
              </h3>
              <div class="mt-4">
                <p class="text-sm text-gray-500 mb-4">
                  Chọn nhân viên sẽ phụ trách khách hàng này
                </p>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                          <input type="checkbox" v-model="selectAllStaffs" @change="toggleSelectAllStaffs"
                            class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                        </th>
                        <th scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tên Nhân Viên
                        </th>
                        <th scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-if="!allStaffs || allStaffs.length === 0">
                        <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500">
                          Không có nhân viên nào
                        </td>
                      </tr>
                      <tr v-else v-for="staff in allStaffs" :key="staff.staffId" class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <input type="checkbox" v-model="selectedStaffs" :value="staff.staffId"
                            class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {{ staff.userName || 'N/A' }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span v-if="isStaffSelected(staff.staffId)" class="text-green-600 font-medium">Đã chọn</span>
                          <span v-else class="text-gray-400">Chưa chọn</span>
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
          <button type="button" @click="saveAssignment" :disabled="isAssigning || selectedStaffs.length === 0"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
            <svg v-if="isAssigning" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ isAssigning ? 'Đang lưu...' : `Lưu (${selectedStaffs.length} nhân viên)` }}
          </button>
          <button type="button" @click="closeAssignmentModal" :disabled="isAssigning"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
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
                <p class="text-sm text-gray-500">
                  <span v-if="Array.isArray(customerToDelete)">
                    Bạn có chắc chắn muốn xóa <strong>{{ customerToDelete.length }}</strong> khách hàng đã chọn?
                  </span>
                  <span v-else>
                    Bạn có chắc chắn muốn xóa khách hàng này?
                  </span>
                </p>
                <p class="text-sm text-gray-500 mt-2">
                  Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" @click="confirmDelete" :disabled="isDeleting"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
            <svg v-if="isDeleting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ isDeleting ? 'Đang xóa...' : 'Xác nhận xóa' }}
          </button>
          <button type="button" @click="closeDeleteModal" :disabled="isDeleting"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  name: 'CustomerList',
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      loading: false,
      customers: [], // Khởi tạo là mảng rỗng
      selectedCustomers: [],
      selectAll: false,
      selectAllStaffs: false,
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 0,
      searchParams: {
        fullName: '',
        phone: '',
        email: '',
        status: '',
        staffId: '',
        createdBy: ''
      },
      statusOptions: [
        { value: 'DANG_XU_LY', label: 'Đang xử lý ' },
        { value: 'DA_XU_LY', label: 'Đã xử lý' },
        { value: 'CHUA_XU_LY', label: 'Chưa xử lý' }
      ],
      staffs: [],
      allStaffs: [],
      selectedStaffs: [],
      currentCustomerId: null,
      customerToDelete: null,
      userRole: '',
      showAssignmentModal: false,
      showDeleteModal: false,
      isDeleting: false,
      isAssigning: false
    };
  },
  computed: {
    userRole() {
     const user = JSON.parse(localStorage.getItem("currentUser"));
     if (!user || !user.roles || user.roles.length === 0) return null;
    return user.roles[0]; 
    },
    visiblePages() {
      const range = 2;
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
  },
  methods: {
    async fetchInitialData() {
      try {
        this.loading = true;

        const response = await axios.get('/api/customers', {
          params: {
            page: this.currentPage - 1,   // backend thường bắt đầu từ 0
            size: this.itemsPerPage || 10,
            fullName: this.searchParams.fullName,
            phone: this.searchParams.phone,
            email: this.searchParams.email,
            status: this.searchParams.status,
            staffId: this.searchParams.staffId,
            createdBy: this.searchParams.createdBy
          }
        });

        // Cập nhật danh sách customers
        this.customers = response.data.content || response.data || [];
        this.totalItems = response.data.totalElements || this.customers.length;
        this.totalPages = response.data.totalPages || 1;

        // Reset selection sau khi load lại data
        this.selectedCustomers = [];
        this.selectAll = false;
      } catch (error) {
        console.error('Error loading customers:', error);
        this.toast.error('Có lỗi xảy ra khi tải danh sách khách hàng');
        this.customers = [];
        this.totalItems = 0;
        this.totalPages = 1;
      } finally {
        this.loading = false;
      }
    },



    searchCustomers() {
      this.currentPage = 1;

      this.fetchInitialData();
    },

    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedCustomers = this.customers.map(customer => customer.id);
      } else {
        this.selectedCustomers = [];
      }
    },

    toggleSelectAllStaffs() {
      if (this.selectAllStaffs) {
        // Chọn tất cả nhân viên
        this.selectedStaffs = this.allStaffs.map(staff => staff.staffId);
      } else {
        // Bỏ chọn tất cả
        this.selectedStaffs = [];
      }
    },

    isStaffSelected(staffId) {
      return this.selectedStaffs.includes(staffId);
    },

    updateSelectAllStaffsState() {
      if (!this.allStaffs || this.allStaffs.length === 0) {
        this.selectAllStaffs = false;
        return;
      }

      this.selectAllStaffs = this.selectedStaffs.length === this.allStaffs.length;
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchInitialData();
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchInitialData();
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        this.fetchInitialData();
      }
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
      } catch (error) {
        return 'N/A';
      }
    },

    getStatusClass(status) {
      switch (status) {
        case 'ACTIVE':
          return 'bg-green-100 text-green-800';
        case 'INACTIVE':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    },


    getStatusText(status) {
      switch (status) {
        case 'DANG_XU_LY':
          return 'Đang xử lý';
        case 'DA_XU_LY':
          return 'Đã xử lý';
        case 'CHUA_XU_LY':
          return 'Chưa xử lý';
        default:
          return status || 'N/A';
      }
    },

    async openAssignmentModal(customerId) {
      this.currentCustomerId = customerId;
      this.selectedStaffs = [];
      this.selectAllStaffs = false;
      this.showAssignmentModal = true;

      try {
        const response = await axios.get(`/api/customers/${customerId}`);
        this.allStaffs = (response.data.data || []).map(staff => ({
          ...staff,
          checked: staff.checked === 'checked' // ✅ convert sang boolean
        }));

        const assignedStaffs = this.allStaffs
          .filter(staff => staff.checked)
          .map(staff => staff.staffId);

        this.selectedStaffs = [...assignedStaffs];
        this.updateSelectAllStaffsState();
      } catch (error) {
        console.error('Error loading staff assignments:', error);
        this.toast.error('Có lỗi xảy ra khi tải danh sách nhân viên');
        this.allStaffs = [];
      }
    },



    closeAssignmentModal() {
      this.showAssignmentModal = false;
      this.currentCustomerId = null;
      this.selectedStaffs = [];
      this.allStaffs = [];
      this.selectAllStaffs = false;
      this.isAssigning = false;
    },


    async saveAssignment() {
      try {
        this.isAssigning = true;
        const data = {
          customerId: this.currentCustomerId,
          staffs: this.selectedStaffs
        };

        await axios.put('/api/customers/staffs', data);
        this.toast.success(`Đã giao khách hàng cho ${this.selectedStaffs.length} nhân viên thành công!`);
        this.closeAssignmentModal();
        this.fetchInitialData();
      } catch (error) {
        console.error('Error saving assignment:', error);
        this.toast.error('Có lỗi xảy ra khi giao khách hàng');
      } finally {
        this.isAssigning = false;
      }
    },

    confirmDeleteCustomer(customerId) {
      this.customerToDelete = customerId;
      this.showDeleteModal = true;
    },

    deleteSelectedCustomers() {
      if (!this.selectedCustomers || this.selectedCustomers.length === 0) {
        this.toast.warning('Vui lòng chọn ít nhất một khách hàng để xóa');
        return;
      }

      this.customerToDelete = [...this.selectedCustomers];
      this.showDeleteModal = true;
    },

    closeDeleteModal() {
      this.showDeleteModal = false;
      this.customerToDelete = null;
      this.isDeleting = false;
    },

    async confirmDelete() {
      try {
        this.isDeleting = true;

        if (Array.isArray(this.customerToDelete)) {
          // Xóa nhiều khách hàng
          await Promise.all(
            this.customerToDelete.map(id =>
              axios.delete(`/api/customers/${id}`)
            )
          );
          this.toast.success(`Đã xóa ${this.customerToDelete.length} khách hàng thành công!`);
        } else {
          // Xóa một khách hàng
          await axios.delete(`/api/customers/${this.customerToDelete}`);
          this.toast.success('Xóa khách hàng thành công!');
        }

        this.closeDeleteModal();

        // Kiểm tra và điều chỉnh trang hiện tại nếu cần
        const remainingItems = this.totalItems - (Array.isArray(this.customerToDelete) ? this.customerToDelete.length : 1);
        const itemsOnCurrentPage = this.customers.length - (Array.isArray(this.customerToDelete) ? this.customerToDelete.length : 1);

        // Nếu trang hiện tại không còn item nào và không phải trang đầu tiên, quay lại trang trước
        if (itemsOnCurrentPage <= 0 && this.currentPage > 1) {
          this.currentPage--;
        }

        await this.fetchInitialData();

      } catch (error) {
        console.error('Error deleting customer:', error);
        this.toast.error('Có lỗi xảy ra khi xóa khách hàng');
      } finally {
        this.isDeleting = false;
      }
    }
  },
  watch: {
    // Theo dõi selectedStaffs để cập nhật selectAllStaffs
    selectedStaffs: {
      handler(newVal) {
        this.updateSelectAllStaffsState();
      },
      deep: true
    }
  }
};
</script>