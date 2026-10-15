<template>
    <div id="app" v-cloak>
        <div class="min-h-screen bg-gray-50 p-4 md:p-6">
            <!-- Breadcrumb -->
            <nav class="bg-white rounded-lg shadow-xs p-3 mb-6">
                <ol class="flex items-center space-x-2 text-sm">
                    <li>
                        <a href="/admin/dashboard" class="text-blue-600 hover:text-blue-800 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </a>
                    </li>
                    <li class="text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </li>
                    <li class="text-gray-700 font-medium">Customer-list</li>
                    <li class="text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </li>
                    <li class="text-gray-700 font-medium">Sửa thông tin khách hàng</li>
                </ol>
            </nav>

            <!-- Main Content -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div class="bg-blue-600 px-6 py-4">
                    <h1 class="text-xl font-semibold text-white text-center">
                        Sửa Thông Tin Khách Hàng
                    </h1>
                </div>

                <div class="p-6">
                    <form @submit.prevent="handleSubmit" class="space-y-6">
                        <!-- Hidden ID -->
                        <input type="hidden" v-model="formData.id">

                        <!-- Full Name -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <label for="fullName" class="block text-sm font-medium text-gray-700 pt-2">
                                Tên Khách Hàng *
                            </label>
                            <div class="md:col-span-2">
                                <input v-model="formData.fullName" type="text" id="fullName"
                                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    :class="{ 'border-red-300': errors.fullName }" placeholder="Nhập tên khách hàng">
                                <p v-if="errors.fullName" class="mt-1 text-sm text-red-600">{{ errors.fullName }}</p>
                            </div>
                        </div>

                        <!-- Phone -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <label for="phone" class="block text-sm font-medium text-gray-700 pt-2">
                                Số điện thoại *
                            </label>
                            <div class="md:col-span-2">
                                <input v-model="formData.phone" type="text" id="phone"
                                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    :class="{ 'border-red-300': errors.phone }" placeholder="Nhập số điện thoại">
                                <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <label for="email" class="block text-sm font-medium text-gray-700 pt-2">
                                Email
                            </label>
                            <div class="md:col-span-2">
                                <input v-model="formData.email" type="email" id="email"
                                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    :class="{ 'border-red-300': errors.email }" placeholder="Nhập email">
                                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                            </div>
                        </div>

                        <!-- Company Name -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <label for="companyName" class="block text-sm font-medium text-gray-700 pt-2">
                                Tên Công ty
                            </label>
                            <div class="md:col-span-2">
                                <input v-model="formData.companyName" type="text" id="companyName"
                                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Nhập tên công ty">
                            </div>
                        </div>

                        <!-- Demand -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <label for="demand" class="block text-sm font-medium text-gray-700 pt-2">
                                Nhu cầu
                            </label>
                            <div class="md:col-span-2">
                                <input v-model="formData.demand" type="text" id="demand"
                                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Nhập nhu cầu khách hàng">
                            </div>
                        </div>

                        <!-- Status -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <label for="status" class="block text-sm font-medium text-gray-700 pt-2">
                                Tình Trạng *
                            </label>
                            <div class="md:col-span-2">
                                <select v-model="formData.status" id="status"
                                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    :class="{ 'border-red-300': errors.status }">
                                    <option value="">--- Chọn tình trạng ---</option>
                                    <option v-for="statusOption in statusOptions" :key="statusOption.value"
                                        :value="statusOption.value">
                                        {{ statusOption.label }}
                                    </option>
                                </select>
                                <p v-if="errors.status" class="mt-1 text-sm text-red-600">{{ errors.status }}</p>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex flex-wrap gap-3 justify-center md:justify-start pt-6">
                            <button type="submit" :disabled="loading"
                                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                                <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-4 w-4"
                                    fill="currentColor" viewBox="0 0 16 16">
                                    <path
                                        d="M8 0a2 2 0 0 0-2 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h2v4H4V3zm5 0a1 1 0 0 1 1 1v4H9V3h2zM4 8v5h8V8H4z" />
                                </svg>
                                Sửa Khách Hàng
                            </button>

                            <a href="/admin/customer-manager"
                                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-4 w-4" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Hủy Thao Tác
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Contract Signing Section -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div class="border-b border-gray-200 px-6 py-4">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-gray-900">KÝ HỢP ĐỒNG</h3>
                        <button @click="openContractModal"
                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-4 w-4" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path
                                    d="M8 0a2 2 0 0 0-2 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h2v4H4V3zm5 0a1 1 0 0 1 1 1v4H9V3h2zM4 8v5h8V8H4z" />
                            </svg>
                            + ADD
                        </button>
                    </div>
                </div>

                <!-- Hiển thị danh sách hợp đồng -->
                <div class="p-6">
                    <div v-if="contracts && contracts.length > 0" class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mã Hợp Đồng
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Loại BĐS
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ngày Bắt Đầu
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ngày Kết Thúc
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Giá Thuê
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thao Tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="contract in contracts" :key="contract.id">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {{ contract.contractCode || 'N/A' }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {{ contract.propertyType || 'N/A' }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {{ formatDate(contract.startDate) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {{ formatDate(contract.endDate) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {{ formatPrice(contract.rentalPrice) }} VND
                                    </td>
                                    <td class=" py-4  whitespace-nowrap text-sm font-medium">
                                        <div class="flex space-x-2">
                                            <!-- Nút Xem -->
                                            <button @click="viewContract(contract.id)"
                                                class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                Xem
                                            </button>

                                            <!-- Nút Tải về -->
                                            <button @click="downloadContract(contract)"
                                                class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Tải về
                                            </button>
                                            <button @click="confirmDeleteContract(contract.id)"
                                                class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                                                </svg>
                                                Xoá
                                            </button>
                                            <!-- openEditContractModal(contract) -->
                                            <button @click="baotri()"
                                                class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M11 4h2m-1 0v16m4-10l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                                Chỉnh sửa
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Hiển thị khi không có hợp đồng -->
                    <div v-else class="text-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">Không có hợp đồng</h3>
                        <p class="mt-1 text-sm text-gray-500">Chưa có hợp đồng nào được tạo cho khách hàng này.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Contract Modal -->
        <div style="margin-left: 300px; margin-top: 60px;" class="fixed z-10 inset-0 overflow-y-auto"
            v-if="showContractModal" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-1 px-4 pb-64 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {{ isEditing ? 'Sửa Hợp Đồng' : 'Thêm Hợp Đồng Mới' }}
                                </h3>
                                <div class="mt-4 space-y-6">
                                    <!-- Thông tin hợp đồng -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-4">Thông tin hợp đồng</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label for="contractCode"
                                                    class="block text-sm font-medium text-gray-700">Mã hợp đồng
                                                    *</label>
                                                <input v-model="newContract.contractCode" type="text" id="contractCode"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="VD: HD/MBS-2023/001">
                                            </div>
                                            <div style="display:none">
                                                <label for="contractName"
                                                    class="block text-sm font-medium text-gray-700">Tên hợp đồng
                                                    *</label>
                                                <input v-model="newContract.contractName" type="text" id="contractName"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập tên hợp đồng">
                                            </div>
                                            <div>
                                                <label for="contractDate"
                                                    class="block text-sm font-medium text-gray-700">Ngày ký hợp đồng
                                                    *</label>
                                                <input v-model="newContract.contractDate" type="date" id="contractDate"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Thông tin bên bán -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-4">Thông tin bên bán</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label for="sellerName"
                                                    class="block text-sm font-medium text-gray-700">Tên bên bán
                                                    *</label>
                                                <input v-model="newContract.sellerName" type="text" id="sellerName"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập tên bên bán">
                                            </div>
                                            <div>
                                                <label for="sellerPhone"
                                                    class="block text-sm font-medium text-gray-700">Số điện thoại bên
                                                    bán *</label>
                                                <input v-model="newContract.sellerPhone" type="text" id="sellerPhone"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập số điện thoại bên bán">
                                            </div>
                                            <div>
                                                <label for="sellerIdNumber"
                                                    class="block text-sm font-medium text-gray-700">Số CMND/CCCD
                                                    *</label>
                                                <input v-model="newContract.sellerIdNumber" type="text"
                                                    id="sellerIdNumber"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập số CMND/CCCD">
                                            </div>
                                            <div>
                                                <label for="sellerIssueDate"
                                                    class="block text-sm font-medium text-gray-700">Ngày cấp</label>
                                                <input v-model="newContract.sellerIssueDate" type="date"
                                                    id="sellerIssueDate"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="sellerIssuePlace"
                                                    class="block text-sm font-medium text-gray-700">Nơi cấp</label>
                                                <input v-model="newContract.sellerIssuePlace" type="text"
                                                    id="sellerIssuePlace"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập nơi cấp">
                                            </div>
                                            <div class="md:col-span-2">
                                                <label for="sellerAddress"
                                                    class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                                <textarea v-model="newContract.sellerAddress" id="sellerAddress"
                                                    rows="2"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập địa chỉ bên bán"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Thông tin bên mua -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-4">Thông tin bên mua</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label for="buyerName"
                                                    class="block text-sm font-medium text-gray-700">Tên bên mua
                                                    *</label>
                                                <input v-model="newContract.buyerName" type="text" id="buyerName"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập tên bên mua">
                                            </div>
                                            <div>
                                                <label for="buyerPhone"
                                                    class="block text-sm font-medium text-gray-700">Số điện thoại bên
                                                    mua *</label>
                                                <input v-model="newContract.buyerPhone" type="text" id="buyerPhone"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập số điện thoại bên mua">
                                            </div>
                                            <div>
                                                <label for="buyerIdNumber"
                                                    class="block text-sm font-medium text-gray-700">Số CMND/CCCD
                                                    *</label>
                                                <input v-model="newContract.buyerIdNumber" type="text"
                                                    id="buyerIdNumber"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập số CMND/CCCD">
                                            </div>
                                            <div>
                                                <label for="buyerIssueDate"
                                                    class="block text-sm font-medium text-gray-700">Ngày cấp</label>
                                                <input v-model="newContract.buyerIssueDate" type="date"
                                                    id="buyerIssueDate"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="buyerIssuePlace"
                                                    class="block text-sm font-medium text-gray-700">Nơi cấp</label>
                                                <input v-model="newContract.buyerIssuePlace" type="text"
                                                    id="buyerIssuePlace"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập nơi cấp">
                                            </div>
                                            <div class="md:col-span-2">
                                                <label for="buyerAddress"
                                                    class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                                <textarea v-model="newContract.buyerAddress" id="buyerAddress" rows="2"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập địa chỉ bên mua"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Thông tin bất động sản -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-4">Thông tin bất động sản</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label for="propertyType"
                                                    class="block text-sm font-medium text-gray-700">Loại bất động sản
                                                    *</label>
                                                <select v-model="newContract.propertyType" id="propertyType"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                                    <option value="">Chọn loại bất động sản</option>
                                                    <option value="Căn hộ chung cư">Căn hộ chung cư</option>
                                                    <option value="Nhà riêng">Nhà riêng</option>
                                                    <option value="Đất nền">Đất nền</option>
                                                    <option value="Biệt thự">Biệt thự</option>
                                                    <option value="Văn phòng">Văn phòng</option>
                                                    <option value="Mặt bằng kinh doanh">Mặt bằng kinh doanh</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label for="propertyArea"
                                                    class="block text-sm font-medium text-gray-700">Diện tích (m²)
                                                    *</label>
                                                <input v-model="newContract.propertyArea" type="number"
                                                    id="propertyArea"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập diện tích">
                                            </div>
                                            <div class="md:col-span-2">
                                                <label for="propertyAddress"
                                                    class="block text-sm font-medium text-gray-700">Địa chỉ bất động sản
                                                    *</label>
                                                <textarea v-model="newContract.propertyAddress" id="propertyAddress"
                                                    rows="2"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập địa chỉ bất động sản"></textarea>
                                            </div>
                                            <div class="md:col-span-2">
                                                <label for="propertyRooms"
                                                    class="block text-sm font-medium text-gray-700">Thông tin
                                                    phòng</label>
                                                <input v-model="newContract.propertyRooms" type="text"
                                                    id="propertyRooms"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="VD: 3 phòng ngủ, 2 phòng tắm, 1 phòng khách">
                                            </div>
                                            <div class="md:col-span-2">
                                                <label for="propertyCertificate"
                                                    class="block text-sm font-medium text-gray-700">Số giấy chứng
                                                    nhận</label>
                                                <input v-model="newContract.propertyCertificate" type="text"
                                                    id="propertyCertificate"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập số giấy chứng nhận">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Thông tin giá cả và thời hạn -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-4">Thông tin giá cả và thời hạn
                                        </h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label for="rentalPrice"
                                                    class="block text-sm font-medium text-gray-700">Giá thuê
                                                    (VND)</label>
                                                <input v-model="newContract.rentalPrice" type="number" id="rentalPrice"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập giá thuê">
                                            </div>
                                            <div>
                                                <label for="totalPrice"
                                                    class="block text-sm font-medium text-gray-700">Tổng giá trị (VND)
                                                    *</label>
                                                <input v-model="newContract.totalPrice" type="number" id="totalPrice"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập tổng giá trị">
                                            </div>
                                            <div>
                                                <label for="rentalDuration"
                                                    class="block text-sm font-medium text-gray-700">Thời hạn thuê
                                                    (tháng)</label>
                                                <input v-model="newContract.rentalDuration" type="number"
                                                    id="rentalDuration"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    placeholder="Nhập thời hạn thuê">
                                            </div>
                                            <div>
                                                <label for="startDate"
                                                    class="block text-sm font-medium text-gray-700">Ngày bắt đầu</label>
                                                <input v-model="newContract.startDate" type="date" id="startDate"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="endDate"
                                                    class="block text-sm font-medium text-gray-700">Ngày kết
                                                    thúc</label>
                                                <input v-model="newContract.endDate" type="date" id="endDate"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Mô tả -->
                                    <div>
                                        <label for="description" class="block text-sm font-medium text-gray-700">Mô tả
                                            hợp đồng</label>
                                        <textarea v-model="newContract.description" id="description" rows="4"
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            placeholder="Nhập mô tả chi tiết về hợp đồng..."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" @click="createContract"
                            :disabled="!isContractFormValid || contractLoading"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            <svg v-if="contractLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Thêm Hợp Đồng
                        </button>
                        <button type="button" @click="closeContractModal"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- bảo trì -->
         <!-- Maintenance Modal -->
<div class="fixed inset-0 z-50 overflow-y-auto" v-if="showMaintenanceModal" aria-labelledby="maintenance-modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <!-- Modal panel -->
        <div class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <!-- Header -->
            <div class="bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-4">
                <div class="flex items-center justify-center">
                    <div class="bg-white bg-opacity-20 p-3 rounded-full">
                        <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div class="bg-white px-6 py-8 text-center">
                <h3 class="text-2xl font-bold text-gray-900 mb-2" id="maintenance-modal-title">
                    🛠️ Đang Bảo Trì
                </h3>
                <p class="text-gray-600 mb-6">
                    Tính năng này hiện đang được bảo trì và nâng cấp. Vui lòng quay lại sau!
                </p>
                
                <!-- Progress bar -->
                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div class="bg-orange-500 h-2.5 rounded-full animate-pulse" style="width: 75%"></div>
                </div>
                
                <p class="text-sm text-gray-500 mb-6">
                    Dự kiến hoàn thành: <span class="font-semibold">30 phút nữa</span>
                </p>

                <!-- Maintenance info -->
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
                    <div class="flex items-start">
                        <svg class="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <p class="text-sm text-yellow-800 font-medium">Thông báo bảo trì</p>
                            <p class="text-sm text-yellow-700 mt-1">
                                Chúng tôi đang nâng cấp hệ thống để mang đến trải nghiệm tốt hơn. Mọi thao tác sẽ được khôi phục sau khi bảo trì hoàn tất.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Contact info -->
                <div class="text-sm text-gray-500">
                    <p>📞 Liên hệ hỗ trợ: <span class="font-semibold">1900 1234</span></p>
                    <p class="mt-1">📧 Email: <span class="font-semibold">support@company.com</span></p>
                </div>
            </div>

            <!-- Footer -->
            <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-2xl">
                <button 
                    @click="closeMaintenanceModal"
                    class="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                    <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Đã hiểu
                </button>
            </div>
        </div>
    </div>
</div>

        <!-- Edit Contract Modal -->
        <div style="margin-left: 300px; margin-top: 60px;" class="fixed z-10 inset-0 overflow-y-auto" v-if="showEditContractModal" aria-labelledby="modal-title"
            role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Sửa Hợp Đồng
                                </h3>
                                <div class="mt-4 space-y-6">
                                    <!-- Thông tin hợp đồng -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-4">Thông tin hợp đồng</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div style="display: none;">
                                                <label for="editContractId"
                                                    class="block text-sm font-medium text-gray-700">id
                                                    </label>
                                                <input v-model="editingContract.id" type="text"
                                                    id="editContractId"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="editContractCode"
                                                    class="block text-sm font-medium text-gray-700">Mã hợp đồng
                                                    *</label>
                                                <input v-model="editingContract.contractCode" type="text"
                                                    id="editContractCode"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div style="display:none">
                                                <label for="editContractName"
                                                    class="block text-sm font-medium text-gray-700">Tên hợp đồng
                                                    *</label>
                                                <input v-model="editingContract.contractName" type="text"
                                                    id="editContractName"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="editContractDate"
                                                    class="block text-sm font-medium text-gray-700">Ngày ký hợp đồng
                                                    *</label>
                                                <input v-model="editingContract.contractDate" type="date"
                                                    id="editContractDate"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Thông tin bên bán -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-4">Thông tin bên bán</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label for="editSellerName"
                                                    class="block text-sm font-medium text-gray-700">Tên bên bán
                                                    *</label>
                                                <input v-model="editingContract.sellerName" type="text"
                                                    id="editSellerName"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="editSellerIdNumber"
                                                    class="block text-sm font-medium text-gray-700">Số CMND/CCCD
                                                    *</label>
                                                <input v-model="editingContract.sellerIdNumber" type="text"
                                                    id="editSellerIdNumber"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="editSellerIssueDate"
                                                    class="block text-sm font-medium text-gray-700">Ngày cấp</label>
                                                <input v-model="editingContract.sellerIssueDate" type="date"
                                                    id="editSellerIssueDate"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="editSellerIssuePlace"
                                                    class="block text-sm font-medium text-gray-700">Nơi cấp</label>
                                                <input v-model="editingContract.sellerIssuePlace" type="text"
                                                    id="editSellerIssuePlace"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div class="md:col-span-2">
                                                <label for="editSellerAddress"
                                                    class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                                <textarea v-model="editingContract.sellerAddress" id="editSellerAddress"
                                                    rows="2"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Thông tin bên mua -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-4">Thông tin bên mua</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label for="editBuyerName"
                                                    class="block text-sm font-medium text-gray-700">Tên bên mua
                                                    *</label>
                                                <input v-model="editingContract.buyerName" type="text"
                                                    id="editBuyerName"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="editBuyerIdNumber"
                                                    class="block text-sm font-medium text-gray-700">Số CMND/CCCD
                                                    *</label>
                                                <input v-model="editingContract.buyerIdNumber" type="text"
                                                    id="editBuyerIdNumber"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="editBuyerIssueDate"
                                                    class="block text-sm font-medium text-gray-700">Ngày cấp</label>
                                                <input v-model="editingContract.buyerIssueDate" type="date"
                                                    id="editBuyerIssueDate"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="editBuyerIssuePlace"
                                                    class="block text-sm font-medium text-gray-700">Nơi cấp</label>
                                                <input v-model="editingContract.buyerIssuePlace" type="text"
                                                    id="editBuyerIssuePlace"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div class="md:col-span-2">
                                                <label for="editBuyerAddress"
                                                    class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                                <textarea v-model="editingContract.buyerAddress" id="editBuyerAddress"
                                                    rows="2"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Thông tin bất động sản -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-4">Thông tin bất động sản</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label for="editPropertyType"
                                                    class="block text-sm font-medium text-gray-700">Loại bất động sản
                                                    *</label>
                                                <select v-model="editingContract.propertyType" id="editPropertyType"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                                    <option value="">Chọn loại bất động sản</option>
                                                    <option value="Căn hộ chung cư">Căn hộ chung cư</option>
                                                    <option value="Nhà riêng">Nhà riêng</option>
                                                    <option value="Đất nền">Đất nền</option>
                                                    <option value="Biệt thự">Biệt thự</option>
                                                    <option value="Văn phòng">Văn phòng</option>
                                                    <option value="Mặt bằng kinh doanh">Mặt bằng kinh doanh</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label for="editPropertyArea"
                                                    class="block text-sm font-medium text-gray-700">Diện tích (m²)
                                                    *</label>
                                                <input v-model="editingContract.propertyArea" type="number"
                                                    id="editPropertyArea"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div class="md:col-span-2">
                                                <label for="editPropertyAddress"
                                                    class="block text-sm font-medium text-gray-700">Địa chỉ bất động sản
                                                    *</label>
                                                <textarea v-model="editingContract.propertyAddress"
                                                    id="editPropertyAddress" rows="2"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
                                            </div>
                                            <div class="md:col-span-2">
                                                <label for="editPropertyRooms"
                                                    class="block text-sm font-medium text-gray-700">Thông tin
                                                    phòng</label>
                                                <input v-model="editingContract.propertyRooms" type="text"
                                                    id="editPropertyRooms"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div class="md:col-span-2">
                                                <label for="editPropertyCertificate"
                                                    class="block text-sm font-medium text-gray-700">Số giấy chứng
                                                    nhận</label>
                                                <input v-model="editingContract.propertyCertificate" type="text"
                                                    id="editPropertyCertificate"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Thông tin giá cả và thời hạn -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-4">Thông tin giá cả và thời hạn
                                        </h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label for="editRentalPrice"
                                                    class="block text-sm font-medium text-gray-700">Giá thuê
                                                    (VND)</label>
                                                <input v-model="editingContract.rentalPrice" type="number"
                                                    id="editRentalPrice"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="editTotalPrice"
                                                    class="block text-sm font-medium text-gray-700">Tổng giá trị (VND)
                                                    *</label>
                                                <input v-model="editingContract.totalPrice" type="number"
                                                    id="editTotalPrice"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="editRentalDuration"
                                                    class="block text-sm font-medium text-gray-700">Thời hạn thuê
                                                    (tháng)</label>
                                                <input v-model="editingContract.rentalDuration" type="number"
                                                    id="editRentalDuration"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="editStartDate"
                                                    class="block text-sm font-medium text-gray-700">Ngày bắt đầu</label>
                                                <input v-model="editingContract.startDate" type="date"
                                                    id="editStartDate"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                            <div>
                                                <label for="editEndDate"
                                                    class="block text-sm font-medium text-gray-700">Ngày kết
                                                    thúc</label>
                                                <input v-model="editingContract.endDate" type="date" id="editEndDate"
                                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Mô tả -->
                                    <div>
                                        <label for="editDescription" class="block text-sm font-medium text-gray-700">Mô
                                            tả hợp đồng</label>
                                        <textarea v-model="editingContract.description" id="editDescription" rows="4"
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" @click="updateContract"
                            :disabled="!isEditContractFormValid || contractLoading"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            <svg v-if="contractLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Cập nhật Hợp Đồng
                        </button>
                        <button type="button" @click="closeContractModal"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- View Contract Modal -->
        <div class="fixed z-10 inset-0 overflow-y-auto" v-if="showViewContractModal" aria-labelledby="modal-title"
            role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true">
                </div>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <div class="flex justify-between items-center mb-4">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Chi Tiết Hợp Đồng
                                    </h3>
                                    <button @click="closeViewContractModal" class="text-gray-400 hover:text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div class="mt-4 space-y-6 max-h-96 overflow-y-auto">
                                    <!-- Thông tin hợp đồng -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-3">Thông tin hợp
                                            đồng</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <label class="font-medium text-gray-700">Mã hợp
                                                    đồng:</label>
                                                <p class="mt-1">{{ viewingContract.contractCode || 'N/A' }}
                                                </p>
                                            </div>
                                            <div>
                                                <label class="font-medium text-gray-700">Tên hợp
                                                    đồng:</label>
                                                <p class="mt-1">{{ viewingContract.contractName || 'N/A' }}
                                                </p>
                                            </div>
                                            <div>
                                                <label class="font-medium text-gray-700">Ngày ký:</label>
                                                <p class="mt-1">{{ formatDate(viewingContract.contractDate)
                                                    }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Thông tin bên bán -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-3">Thông tin bên bán
                                        </h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <label class="font-medium text-gray-700">Tên bên
                                                    bán:</label>
                                                <p class="mt-1">{{ viewingContract.sellerName || 'N/A' }}
                                                </p>
                                            </div>
                                            <div>
                                                <label class="font-medium text-gray-700">Số
                                                    CMND/CCCD:</label>
                                                <p class="mt-1">{{ viewingContract.sellerIdNumber || 'N/A'
                                                    }}</p>
                                            </div>
                                            <div>
                                                <label class="font-medium text-gray-700">Điện thoại:</label>
                                                <p class="mt-1">{{ viewingContract.sellerPhone || 'N/A' }}
                                                </p>
                                            </div>
                                            <div>
                                                <label class="font-medium text-gray-700">Địa chỉ:</label>
                                                <p class="mt-1">{{ viewingContract.sellerAddress || 'N/A' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Thông tin bên mua -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-3">Thông tin bên mua
                                        </h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <label class="font-medium text-gray-700">Tên bên
                                                    mua:</label>
                                                <p class="mt-1">{{ viewingContract.buyerName || 'N/A' }}</p>
                                            </div>
                                            <div>
                                                <label class="font-medium text-gray-700">Số
                                                    CMND/CCCD:</label>
                                                <p class="mt-1">{{ viewingContract.buyerIdNumber || 'N/A' }}
                                                </p>
                                            </div>
                                            <div>
                                                <label class="font-medium text-gray-700">Điện thoại:</label>
                                                <p class="mt-1">{{ viewingContract.buyerPhone || 'N/A' }}
                                                </p>
                                            </div>
                                            <div>
                                                <label class="font-medium text-gray-700">Địa chỉ:</label>
                                                <p class="mt-1">{{ viewingContract.buyerAddress || 'N/A' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Thông tin bất động sản -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-3">Thông tin bất
                                            động sản</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <label class="font-medium text-gray-700">Loại BĐS:</label>
                                                <p class="mt-1">{{ viewingContract.propertyType || 'N/A' }}
                                                </p>
                                            </div>
                                            <div>
                                                <label class="font-medium text-gray-700">Diện tích:</label>
                                                <p class="mt-1">{{ viewingContract.propertyArea ?
                                                    viewingContract.propertyArea + ' m²' : 'N/A' }}</p>
                                            </div>
                                            <div class="md:col-span-2">
                                                <label class="font-medium text-gray-700">Địa chỉ:</label>
                                                <p class="mt-1">{{ viewingContract.propertyAddress || 'N/A'
                                                    }}</p>
                                            </div>
                                            <div class="md:col-span-2">
                                                <label class="font-medium text-gray-700">Thông tin
                                                    phòng:</label>
                                                <p class="mt-1">{{ viewingContract.propertyRooms || 'N/A' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Thông tin giá cả -->
                                    <div class="border-b border-gray-200 pb-4">
                                        <h4 class="text-md font-medium text-gray-900 mb-3">Thông tin giá cả
                                            và thời hạn</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <label class="font-medium text-gray-700">Giá thuê:</label>
                                                <p class="mt-1">{{ viewingContract.rentalPrice ?
                                                    formatPrice(viewingContract.rentalPrice) + ' VND' :
                                                    'N/A' }}</p>
                                            </div>
                                            <div>
                                                <label class="font-medium text-gray-700">Tổng giá
                                                    trị:</label>
                                                <p class="mt-1">{{ viewingContract.totalPrice ?
                                                    formatPrice(viewingContract.totalPrice) + ' VND' : 'N/A'
                                                    }}</p>
                                            </div>
                                            <div>
                                                <label class="font-medium text-gray-700">Thời hạn
                                                    thuê:</label>
                                                <p class="mt-1">{{ viewingContract.rentalDuration ?
                                                    viewingContract.rentalDuration + ' tháng' : 'N/A' }}</p>
                                            </div>
                                            <div>
                                                <label class="font-medium text-gray-700">Ngày bắt
                                                    đầu:</label>
                                                <p class="mt-1">{{ formatDate(viewingContract.startDate) }}
                                                </p>
                                            </div>
                                            <div>
                                                <label class="font-medium text-gray-700">Ngày kết
                                                    thúc:</label>
                                                <p class="mt-1">{{ formatDate(viewingContract.endDate) }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Mô tả -->
                                    <div v-if="viewingContract.description">
                                        <label class="font-medium text-gray-700">Mô tả:</label>
                                        <p class="mt-1 text-sm text-gray-600">{{ viewingContract.description
                                            }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" @click="downloadContract(viewingContract)"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-4 w-4" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Tải về PDF
                        </button>
                        <button type="button" @click="closeViewContractModal"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- // moldal xoá -->
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
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
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
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <div class="ml-3">
                                            <p class="text-sm text-red-700">
                                                <span v-if="Array.isArray(buildingToDelete)">
                                                    Bạn có chắc chắn muốn xóa <strong>{{ buildingToDelete.length
                                                    }}</strong> tòa nhà đã chọn?
                                                </span>
                                                <span v-else>
                                                    Bạn có chắc chắn muốn xóa hợp đồng này?
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
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- View Contract Modal - Beautiful Design -->
    <div class="fixed z-50 inset-0 overflow-y-auto" v-if="showViewDetailContractModal" aria-labelledby="modal-title"
        role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div
                class="inline-block align-bottom bg-white rounded-2xl shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">

                <!-- Header với gradient -->
                <div class="bg-gradient-to-r from-blue-600 to-purple-700 px-6 py-4 rounded-t-2xl">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="bg-white bg-opacity-20 p-2 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-white">Xem Hợp Đồng</h3>
                                <p class="text-blue-100 text-sm mt-1">Mã: {{ viewingContract.contractCode }}</p>
                            </div>
                        </div>
                        <button @click="closeViewContractModal"
                            class="text-white hover:text-blue-200 transition-colors duration-200 p-2 rounded-lg hover:bg-white hover:bg-opacity-10">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- PDF Content -->
                <div class="bg-gray-50 p-1">
                    <div class="border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-inner">
                        <iframe v-if="contractPdfUrl" :src="contractPdfUrl" class="w-full h-[75vh]"
                            frameborder="0"></iframe>
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200 rounded-b-2xl">
                    <div class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                        <div class="text-sm text-gray-600 flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Sẵn sàng xem</span>
                        </div>

                        <div class="flex space-x-3">
                            <button type="button" @click="downloadContract(viewingContract)"
                                class="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105">
                                <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Tải về PDF
                            </button>

                            <button type="button" @click="closeViewContractModal"
                                class="inline-flex items-center px-5 py-2.5 border border-gray-300 text-sm font-medium rounded-xl shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

// Contract Table Component
const ContractTable = {
    props: ['contracts'],
    emits: ['edit', 'delete'],
    template: `
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã hợp đồng</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên hợp đồng</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày ký</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bên bán</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bên mua</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại BĐS</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng giá trị</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="contract in contracts" :key="contract.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contract.contractCode }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contract.contractName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(contract.contractDate) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contract.sellerName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contract.buyerName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contract.propertyType }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatCurrency(contract.totalPrice) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button 
                @click="$emit('edit', contract)"
                class="text-yellow-600 hover:text-yellow-900 ml-2"
                title="Sửa hợp đồng"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                @click="$emit('delete', contract)"
                class="text-red-600 hover:text-red-900 ml-2"
                title="Xóa hợp đồng"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="contracts.length === 0">
            <td colspan="8" class="px-6 py-8 text-center text-sm text-gray-500">
              Chưa có hợp đồng nào
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
    methods: {
        formatDate(dateString) {
            if (!dateString) return '';
            return new Date(dateString).toLocaleDateString('vi-VN');
        },
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);
        }
    }
};

export default {
    name: 'CustomerEdit',
    setup() {
        const toast = useToast();
        return { toast };
    },
    data() {
        return {
            loading: false,
            contractLoading: false,
            showViewContractModal: false,
            showDeleteModal: false,
            showViewDetailContractModal: false,
            showMaintenanceModal: false,
            viewingContract: {},
            contractPdfUrl: '',
            contractToDelete: null,
            isEditing: false, // Thêm flag để xác định trạng thái
            formData: {
                id: null,
                fullName: '',
                phone: '',
                email: '',
                companyName: '',
                demand: '',
                status: ''
            },
            errors: {},
            statusOptions: [
                { value: 'DANG_XU_LY', label: 'Đang xử lý' },
                { value: 'DA_XU_LY', label: 'Đã xử lý' },
                { value: 'CHUA_XU_LY', label: 'Chưa xử lý' }
            ],
            contracts: [],
            showContractModal: false,
            showEditContractModal: false,
            newContract: {
                customerId: null,
                user: 1,
                contractCode: '',
                contractName: '',
                contractDate: '',
                sellerName: '',
                sellerPhone: '',
                sellerIdNumber: '',
                sellerIssueDate: '',
                sellerIssuePlace: '',
                sellerAddress: '',
                buyerName: '',
                buyerPhone: '',
                buyerIdNumber: '',
                buyerIssueDate: '',
                buyerIssuePlace: '',
                buyerAddress: '',
                propertyType: '',
                propertyAddress: '',
                propertyArea: '',
                propertyRooms: '',
                propertyCertificate: '',
                rentalPrice: '',
                totalPrice: '',
                rentalDuration: '',
                startDate: '',
                endDate: '',
                description: '',
                pdfPath: null
            },
            editingContract: {
                id: null,
                customerId: null,
                user: 1,
                contractCode: '',
                contractName: '',
                contractDate: '',
                sellerName: '',
                sellerPhone: '',
                sellerIdNumber: '',
                sellerIssueDate: '',
                sellerIssuePlace: '',
                sellerAddress: '',
                buyerName: '',
                buyerPhone: '',
                buyerIdNumber: '',
                buyerIssueDate: '',
                buyerIssuePlace: '',
                buyerAddress: '',
                propertyType: '',
                propertyAddress: '',
                propertyArea: '',
                propertyRooms: '',
                propertyCertificate: '',
                rentalPrice: '',
                totalPrice: '',
                rentalDuration: '',
                startDate: '',
                endDate: '',
                description: '',
                pdfPath: null
            }
        };
    },
    computed: {
        isContractFormValid() {
            return this.newContract.contractCode &&
                
                this.newContract.contractDate &&
                this.newContract.sellerName &&
                this.newContract.sellerIdNumber &&
                this.newContract.buyerName &&
                this.newContract.buyerIdNumber &&
                this.newContract.propertyType &&
                this.newContract.propertyAddress &&
                this.newContract.propertyArea &&
                this.newContract.totalPrice;
        },
        isEditContractFormValid() {
            return this.editingContract.contractCode &&
                
                this.editingContract.contractDate &&
                this.editingContract.sellerName &&
                this.editingContract.sellerIdNumber &&
                this.editingContract.buyerName &&
                this.editingContract.buyerIdNumber &&
                this.editingContract.propertyType &&
                this.editingContract.propertyAddress &&
                this.editingContract.propertyArea &&
                this.editingContract.totalPrice;
        },
        modalTitle() {
            return this.isEditing ? 'Sửa Hợp Đồng' : 'Thêm Hợp Đồng Mới';
        }
    },
    async mounted() {
        await this.loadCustomerData();
        await this.loadContracts();
    },
    openMaintenanceModal() {
        this.showMaintenanceModal = true;
    },
    
    closeMaintenanceModal() {
        this.showMaintenanceModal = false;
    },
    methods: {
        async loadCustomerData() {
            const customerId = this.$route.params.id;
            if (!customerId) {
                this.toast.error('Không tìm thấy ID khách hàng');
                return;
            }

            try {
                const response = await axios.get(`/api/customers/detail/${customerId}`);
                this.formData = { ...response.data };
                // Auto-fill customer ID in new contract form
                this.newContract.customerId = this.formData.id;
            } catch (error) {
                console.error('Error loading customer data:', error);
                this.toast.error('Lỗi khi tải dữ liệu khách hàng');
            }
        },

        async loadContracts() {
            try {
                const customerId = this.$route.params.id;
                const response = await axios.get(`/api/contracts/customer/${customerId}`);
                this.contracts = response.data;
            } catch (error) {
                console.error('Error loading contracts:', error);
                this.toast.error('Lỗi khi tải danh sách hợp đồng');
            }
        },

        validateForm() {
            this.errors = {};
            let isValid = true;

            if (!this.formData.fullName?.trim()) {
                this.errors.fullName = 'Tên khách hàng là bắt buộc';
                isValid = false;
            }

            if (!this.formData.phone?.trim()) {
                this.errors.phone = 'Số điện thoại là bắt buộc';
                isValid = false;
            }

            if (!this.formData.status) {
                this.errors.status = 'Tình trạng là bắt buộc';
                isValid = false;
            }

            return isValid;
        },

        async handleSubmit() {
            if (!this.validateForm()) {
                this.toast.error('Vui lòng kiểm tra lại thông tin');
                return;
            }

            this.loading = true;

            try {
                await axios.put('/api/customers', this.formData);
                this.toast.success('Cập nhật khách hàng thành công!');
                this.$router.push('/admin/customer-manager');
            } catch (error) {
                console.error('Error updating customer:', error);
                this.toast.error('Có lỗi xảy ra khi cập nhật khách hàng');
            } finally {
                this.loading = false;
            }
        },

        generateContractCode() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

            return `HD_MBS-${year}${month}${day}-${random}`;
        },

        // Method mở modal để thêm mới
        openContractModal() {
            this.isEditing = false;
            const contractCode = this.generateContractCode();
            this.newContract = {
                customerId: this.formData.id,
                user: 1,
                contractCode: contractCode,
                contractName: '',
                contractDate: new Date().toISOString().split('T')[0],
                sellerName: '',
                sellerPhone: '',
                sellerIdNumber: '',
                sellerIssueDate: '',
                sellerIssuePlace: '',
                sellerAddress: '',
                buyerName: this.formData.fullName || '',
                buyerPhone: this.formData.phone || '',
                buyerIdNumber: '',
                buyerIssueDate: '',
                buyerIssuePlace: '',
                buyerAddress: this.formData.companyName || '',
                propertyType: '',
                propertyAddress: '',
                propertyArea: '',
                propertyRooms: '',
                propertyCertificate: '',
                rentalPrice: '',
                totalPrice: '',
                rentalDuration: '',
                startDate: '',
                endDate: '',
                description: '',
                pdfPath: null
            };
            this.showContractModal = true;
        },

        baotri() {
            this.toast.info('Chức năng đang được bảo trì.');
            this.showMaintenanceModal = true;
        },
        closeMaintenanceModal(){
            this.showMaintenanceModal = false;
        },
        // Method mở modal để chỉnh sửa
    
        openEditContractModal(contract) {
            this.isEditing = true;
            this.editingContract = {
                id: contract.id,
                customerId: contract.customerId || this.formData.id,
                user: contract.user || 1,
                contractCode: contract.contractCode || '',
                contractName: contract.contractName || '',
                contractDate: this.formatDateForInput(contract.contractDate),
                sellerName: contract.sellerName || '',
                sellerPhone: contract.sellerPhone || '',
                sellerIdNumber: contract.sellerIdNumber || '',
                sellerIssueDate: this.formatDateForInput(contract.sellerIssueDate),
                sellerIssuePlace: contract.sellerIssuePlace || '',
                sellerAddress: contract.sellerAddress || '',
                buyerName: contract.buyerName || '',
                buyerPhone: contract.buyerPhone || '',
                buyerIdNumber: contract.buyerIdNumber || '',
                buyerIssueDate: this.formatDateForInput(contract.buyerIssueDate),
                buyerIssuePlace: contract.buyerIssuePlace || '',
                buyerAddress: contract.buyerAddress || '',
                propertyType: contract.propertyType || '',
                propertyAddress: contract.propertyAddress || '',
                propertyArea: contract.propertyArea || '',
                propertyRooms: contract.propertyRooms || '',
                propertyCertificate: contract.propertyCertificate || '',
                rentalPrice: contract.rentalPrice || '',
                totalPrice: contract.totalPrice || '',
                rentalDuration: contract.rentalDuration || '',
                startDate: this.formatDateForInput(contract.startDate),
                endDate: this.formatDateForInput(contract.endDate),
                description: contract.description || '',
                pdfPath: contract.pdfPath || null
            };
            this.showEditContractModal = true;

            console.log('Editing contract data:', this.editingContract); // Debug log
        },

        formatDateForInput(dateString) {
            if (!dateString) return '';
            try {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) return '';
                return date.toISOString().split('T')[0];
            } catch (error) {
                console.error('Error formatting date:', error);
                return '';
            }
        },

        // Định dạng ngày tháng
        formatDate(dateString) {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN');
        },

        // Định dạng giá tiền
        formatPrice(price) {
            if (!price) return '0';
            return new Intl.NumberFormat('vi-VN').format(price);
        },

        // Xem hợp đồng
        viewContract(contractId) {
            this.viewingContract = this.contracts.find(c => c.id === contractId);
            this.contractPdfUrl = `/api/contracts/view/${contractId}`;
            this.showViewDetailContractModal = true;
        },

        closeViewContractModal() {
            this.showViewDetailContractModal = false;
            this.showViewContractModal = false;
            this.viewingContract = {};
            this.contractPdfUrl = '';
        },

        // Tải về hợp đồng
        async downloadContract(contract) {
            try {
                const response = await axios.get(`/api/contracts/download/${contract.id}`, {
                    responseType: 'blob'
                });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `hop-dong-${contract.contractCode}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.remove();

                this.toast.success('Đang tải hợp đồng...');
            } catch (error) {
                console.error('Lỗi khi tải về hợp đồng:', error);
                this.toast.error('Lỗi khi tải hợp đồng');
            }
        },

        closeContractModal() {
            this.showContractModal = false;
            this.resetNewContractForm();
            this.showEditContractModal = false;
        },

        closeEditContractModal() {
            this.showContractModal = false;
            this.isEditing = false;
            this.resetEditingContractForm();
        },

        resetNewContractForm() {
            this.newContract = {
                customerId: this.formData.id,
                user: 1,
                contractCode: '',
                contractName: '',
                contractDate: '',
                sellerName: '',
                sellerPhone: '',
                sellerIdNumber: '',
                sellerIssueDate: '',
                sellerIssuePlace: '',
                sellerAddress: '',
                buyerName: '',
                buyerPhone: '',
                buyerIdNumber: '',
                buyerIssueDate: '',
                buyerIssuePlace: '',
                buyerAddress: '',
                propertyType: '',
                propertyAddress: '',
                propertyArea: '',
                propertyRooms: '',
                propertyCertificate: '',
                rentalPrice: '',
                totalPrice: '',
                rentalDuration: '',
                startDate: '',
                endDate: '',
                description: '',
                pdfPath: null
            };
        },

        resetEditingContractForm() {
            this.editingContract = {
                id: null,
                customerId: null,
                user: 1,
                contractCode: '',
                contractName: '',
                contractDate: '',
                sellerName: '',
                sellerPhone: '',
                sellerIdNumber: '',
                sellerIssueDate: '',
                sellerIssuePlace: '',
                sellerAddress: '',
                buyerName: '',
                buyerPhone: '',
                buyerIdNumber: '',
                buyerIssueDate: '',
                buyerIssuePlace: '',
                buyerAddress: '',
                propertyType: '',
                propertyAddress: '',
                propertyArea: '',
                propertyRooms: '',
                propertyCertificate: '',
                rentalPrice: '',
                totalPrice: '',
                rentalDuration: '',
                startDate: '',
                endDate: '',
                description: '',
                pdfPath: null
            };
        },

        async createContract() {
            if (!this.isContractFormValid) {
                this.toast.error('Vui lòng điền đầy đủ các trường bắt buộc');
                return;
            }

            this.contractLoading = true;

            try {
                await axios.post('/api/contracts', this.newContract);
                this.toast.success('Thêm hợp đồng thành công!');
                this.closeContractModal();
                await this.loadContracts();
            } catch (error) {
                console.error('Error creating contract:', error);
                this.toast.error('Có lỗi xảy ra khi thêm hợp đồng');
            } finally {
                this.contractLoading = false;
            }
        },

        async updateContract() {
            if (!this.isEditContractFormValid) {
                this.toast.error('Vui lòng điền đầy đủ các trường bắt buộc');
                return;
            }

            this.contractLoading = true;

            try {
                await axios.post(`/api/contracts/`, this.newContract);
                this.toast.success('Cập nhật hợp đồng thành công!');
                this.closeEditContractModal();
                await this.loadContracts();
            } catch (error) {
                console.error('Error updating contract:', error);
                this.toast.error('Có lỗi xảy ra khi cập nhật hợp đồng');
            } finally {
                this.contractLoading = false;
            }
        },

        confirmDeleteContract(contractId) {
            this.contractToDelete = contractId;
            this.showDeleteModal = true;
        },

        async confirmDelete() {
            try {
                const ids = Array.isArray(this.contractToDelete)
                    ? this.contractToDelete
                    : [this.contractToDelete];

                for (const id of ids) {
                    await axios.delete(`/api/contracts/${id}`);
                }

                this.toast.success('Xóa hợp đồng thành công!');
                this.showDeleteModal = false;
                this.contractToDelete = null;
                await this.loadContracts();
            } catch (error) {
                console.error('Error deleting contract:', error);
                this.toast.error('Có lỗi xảy ra khi xóa hợp đồng');
            }
        },

        closeModal() {
            this.showDeleteModal = false;
            this.contractToDelete = null;
        },

        // Mở modal xem chi tiết hợp đồng (dạng form)
        openViewContractModal(contractId) {
            this.viewingContract = this.contracts.find(c => c.id === contractId);
            this.showViewContractModal = true;
        },

        closeViewContractModalForm() {
            this.showViewContractModal = false;
            this.viewingContract = {};
        }
    }
};
</script>