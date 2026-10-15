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
                    <li class="text-gray-700 font-medium">Quản lý hợp đồng</li>
                </ol>
            </nav>

            <!-- Header -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-gray-200">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">Quản lý hợp đồng</h1>
                            <p class="text-gray-600 mt-1">Quản lý và theo dõi tất cả hợp đồng bất động sản</p>
                        </div>
                        <!-- <button @click="openContractModal"
                            class="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Thêm hợp đồng mới
                        </button> -->
                    </div>
                </div>
            </div>

            <!-- Search and Filter Section -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <!-- Search -->
                    <div>
                        <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
                        <input v-model="searchQuery" type="text" id="search"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Mã hợp đồng, tên khách hàng...">
                    </div>

                    <!-- Status Filter -->
                    <div>
                        <label for="statusFilter" class="block text-sm font-medium text-gray-700 mb-1">Trạng
                            thái</label>
                        <select v-model="statusFilter" id="statusFilter"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                            <option value="">Tất cả trạng thái</option>
                            <option v-for="status in statusOptions" :key="status.value" :value="status.value">
                                {{ status.label }}
                            </option>
                        </select>
                    </div>

                    <!-- Date Range -->
                    <div>
                        <label for="startDate" class="block text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
                        <input v-model="startDate" type="date" id="startDate"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    </div>

                    <div>
                        <label for="endDate" class="block text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
                        <input v-model="endDate" type="date" id="endDate"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-between items-center mt-4">
                    <div class="text-sm text-gray-600">
                        Hiển thị {{ filteredContracts.length }} / {{ contracts.length }} hợp đồng
                    </div>
                    <div class="flex space-x-2">
                        <button @click="clearFilters"
                            class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Xóa bộ lọc
                        </button>
                        <button @click="exportToExcel"
                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-4 w-4" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Xuất Excel
                        </button>
                    </div>
                </div>
            </div>

            <!-- Contracts Table -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mã hợp đồng
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Khách hàng
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Loại BĐS
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Giá trị
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày ký
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="contract in paginatedContracts" :key="contract.id"
                                class="hover:bg-gray-50 cursor-pointer" @click="viewContract(contract)">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ contract.contractCode }}</div>
                                    <div class="text-sm text-gray-500">{{ contract.contractName }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ contract.buyerName }}</div>
                                    <div class="text-sm text-gray-500">{{ contract.buyerPhone }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ contract.propertyType }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ formatCurrency(contract.totalPrice) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ formatDate(contract.contractDate) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="relative">
                                        <select v-model="contract.status" @change="updateStatus(contract)"
                                            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
                                            :class="getStatusClass(contract.status)">
                                            <option v-for="status in statusOptions" :key="status.value"
                                                :value="status.value">
                                                {{ status.label }}
                                            </option>
                                        </select>
                                    </div>
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div class="flex justify-end space-x-2">
                                        <button @click.stop="editContract(contract)"
                                            class="text-blue-600 hover:text-blue-900" title="Sửa hợp đồng">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button @click.stop="deleteContract(contract)"
                                            class="text-red-600 hover:text-red-900" title="Xóa hợp đồng">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                        <button @click.stop="downloadContract(contract)"
                                            class="text-green-600 hover:text-green-900" title="Tải hợp đồng">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="filteredContracts.length === 0">
                                <td colspan="7" class="px-6 py-8 text-center text-sm text-gray-500">
                                    Không tìm thấy hợp đồng nào
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div class="flex-1 flex justify-between items-center">
                        <div>
                            <p class="text-sm text-gray-700">
                                Hiển thị
                                <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
                                đến
                                <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredContracts.length)
                                }}</span>
                                trong tổng số
                                <span class="font-medium">{{ filteredContracts.length }}</span>
                                hợp đồng
                            </p>
                        </div>
                        <div class="flex space-x-2">
                            <button @click="prevPage" :disabled="currentPage === 1"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Trước
                            </button>
                            <button @click="nextPage" :disabled="currentPage >= totalPages"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Sau
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add/Edit Contract Modal -->
        <contract-modal :show="showContractModal" :contract="editingContract" :is-editing="isEditing"
            @close="closeContractModal" @save="saveContract">
        </contract-modal>

        <!-- Contract Detail Modal -->
        <contract-detail-modal :show="showDetailModal" :contract="selectedContract" @close="closeDetailModal">
        </contract-detail-modal>
    </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
// import ContractModal from './components/ContractModal.vue';
// import ContractDetailModal from './components/ContractDetailModal.vue';

export default {
    name: 'ContractManagement',
    components: {
        // ContractModal,
        // ContractDetailModal
    },
    setup() {
        const toast = useToast();
        return { toast };
    },
    data() {
        return {
            contracts: [],
            loading: false,
            searchQuery: '',
            statusFilter: '',
            startDate: '',
            endDate: '',
            currentPage: 1,
            pageSize: 10,
            showContractModal: false,
            showDetailModal: false,
            isEditing: false,
            editingContract: null,
            selectedContract: null,
            statusOptions: [
                { value: 'DRAFT', label: 'Bản nháp' },
                { value: 'PENDING', label: 'Đang chờ' },
                { value: 'ACTIVE', label: 'Đang hoạt động' },
                { value: 'EXPIRED', label: 'Đã hết hạn' },
                { value: 'COMPLETED', label: 'Đã hoàn thành' },
                { value: 'CANCELLED', label: 'Đã hủy' }
            ]
        };
    },
    computed: {
        filteredContracts() {
            let filtered = this.contracts;

            // Filter by search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(contract =>
                    contract.contractCode.toLowerCase().includes(query) ||
                    contract.buyerName.toLowerCase().includes(query) ||
                    contract.buyerPhone.toLowerCase().includes(query) ||
                    contract.propertyType.toLowerCase().includes(query)
                );
            }

            // Filter by status
            if (this.statusFilter) {
                filtered = filtered.filter(contract => contract.status === this.statusFilter);
            }

            // Filter by date range
            if (this.startDate) {
                filtered = filtered.filter(contract => contract.contractDate >= this.startDate);
            }

            if (this.endDate) {
                filtered = filtered.filter(contract => contract.contractDate <= this.endDate);
            }

            return filtered;
        },
        totalPages() {
            return Math.ceil(this.filteredContracts.length / this.pageSize);
        },
        paginatedContracts() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredContracts.slice(start, end);
        }
    },
    async mounted() {
        await this.loadContracts();
    },
    methods: {
        async loadContracts() {
            this.loading = true;
            try {
                const response = await axios.get('/api/contracts');
                this.contracts = response.data;
            } catch (error) {
                console.error('Error loading contracts:', error);
                this.toast.error('Lỗi khi tải danh sách hợp đồng');
            } finally {
                this.loading = false;
            }
        },
        async updateStatus(contract) {
            try {
                const response = await axios.put(`/api/contracts/${contract.id}/status`, {
                    status: contract.status
                });
                this.toast.success(`Đã cập nhật trạng thái hợp đồng ${contract.contractCode} thành công!`);
            } catch (error) {
                console.error('Lỗi khi cập nhật trạng thái:', error);
                this.toast.error('Không thể cập nhật trạng thái hợp đồng');
                // revert lại nếu lỗi
                await this.loadContracts();
            }
        },

        openContractModal() {
            this.isEditing = false;
            this.editingContract = null;
            this.showContractModal = true;
        },

        editContract(contract) {
            this.isEditing = true;
            this.editingContract = { ...contract };
            this.showContractModal = true;
        },

        viewContract(contract) {
            this.selectedContract = contract;
            this.showDetailModal = true;
        },

        closeContractModal() {
            this.showContractModal = false;
            this.editingContract = null;
        },

        closeDetailModal() {
            this.showDetailModal = false;
            this.selectedContract = null;
        },

        async saveContract(contractData) {
            try {
                if (this.isEditing) {
                    await axios.put(`/api/contracts/${contractData.id}`, contractData);
                    this.toast.success('Cập nhật hợp đồng thành công!');
                } else {
                    await axios.post('/api/contracts', contractData);
                    this.toast.success('Thêm hợp đồng thành công!');
                }
                this.closeContractModal();
                await this.loadContracts();
            } catch (error) {
                console.error('Error saving contract:', error);
                this.toast.error('Có lỗi xảy ra khi lưu hợp đồng');
            }
        },

        async deleteContract(contract) {
            if (!confirm(`Bạn có chắc chắn muốn xóa hợp đồng ${contract.contractCode}?`)) {
                return;
            }

            try {
                await axios.delete(`/api/contracts/${contract.id}`);
                this.toast.success('Xóa hợp đồng thành công!');
                await this.loadContracts();
            } catch (error) {
                console.error('Error deleting contract:', error);
                this.toast.error('Có lỗi xảy ra khi xóa hợp đồng');
            }
        },

        downloadContract(contract) {
            // Logic để tải hợp đồng PDF
            this.toast.info('Tính năng tải hợp đồng đang được phát triển');
        },

        exportToExcel() {
            // Logic để xuất Excel
            this.toast.info('Tính năng xuất Excel đang được phát triển');
        },

        clearFilters() {
            this.searchQuery = '';
            this.statusFilter = '';
            this.startDate = '';
            this.endDate = '';
            this.currentPage = 1;
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        formatDate(dateString) {
            if (!dateString) return '';
            return new Date(dateString).toLocaleDateString('vi-VN');
        },

        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount || 0);
        },

        getStatusClass(status) {
            const classes = {
                'DRAFT': 'bg-gray-100 text-gray-800',
                'PENDING': 'bg-yellow-100 text-yellow-800',
                'ACTIVE': 'bg-green-100 text-green-800',
                'EXPIRED': 'bg-red-100 text-red-800',
                'CANCELLED': 'bg-red-100 text-red-800',
                'COMPLETED': 'bg-blue-100 text-blue-800'
            };
            return classes[status] || 'bg-gray-100 text-gray-800';
        },


        getStatusText(status) {
            const texts = {
                'DRAFT': 'Bản nháp',
                'PENDING': 'Đang chờ',
                'ACTIVE': 'Đang hoạt động',
                'EXPIRED': 'Đã hết hạn',
                'CANCELLED': 'Đã hủy',
                'COMPLETED': 'Đã hoàn thành'
            };
            return texts[status] || 'Không xác định';
        }
    }
};
</script>