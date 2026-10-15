<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="flex items-center">
          <router-link to="/admin/home" class="text-2xl font-bold text-indigo-600">
            <i class="fas fa-building mr-2"></i>BuildingAdmin Pro
          </router-link>
        </div>
        <div class="flex items-center space-x-4">
          <button class="p-2 rounded-full hover:bg-gray-100">
            <i class="fas fa-bell text-gray-600"></i>
          </button>
          <button @click="logout" class="p-2 rounded-full hover:bg-gray-100">
            <i class="fas fa-sign-out-alt text-gray-600"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- Breadcrumb -->
    <nav class="bg-gray-50 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol class="flex items-center space-x-2">
          <li>
            <router-link to="/admin/home" class="text-indigo-600 hover:text-indigo-500">
              <i class="fas fa-home mr-1"></i> Trang chủ
            </router-link>
          </li>
          <li class="flex items-center">
            <span class="text-gray-400 mx-2">/</span>
            <span class="text-gray-600">Danh sách người dùng</span>
          </li>
        </ol>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Alert Message -->
      <div v-if="message" :class="['mb-6 p-4 rounded-lg', alertClass]">
        <div class="flex items-center">
          <i :class="['mr-3', alertIcon]"></i>
          <span>{{ message }}</span>
          <button @click="message = ''" class="ml-auto text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Search Panel -->
      <div class="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
        <div class="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">
            <i class="fas fa-search mr-2"></i>Tìm kiếm
          </h3>
          <button @click="toggleSearch" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-chevron-up" v-if="showSearch"></i>
            <i class="fas fa-chevron-down" v-else></i>
          </button>
        </div>
        <div v-if="showSearch" class="px-6 py-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
              <input type="text" v-model="searchCriteria.userName"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <input type="text" v-model="searchCriteria.fullName"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" v-model="searchCriteria.email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <button @click="searchUsers"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              <i class="fas fa-search mr-2"></i>Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Danh sách người dùng</h2>
        <div class="flex space-x-3">
          <router-link to="/admin/add-user"
            class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
            <i class="fas fa-plus-circle mr-2"></i>Thêm người dùng
          </router-link>
          <button @click="deleteSelected" :disabled="selectedUsers.length === 0"
            :class="['px-4 py-2 rounded-md transition', selectedUsers.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700']">
            <i class="fas fa-trash mr-2"></i>Xóa
          </button>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"
                    class="rounded text-indigo-600 focus:ring-indigo-500">
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên đăng nhập
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Họ và tên
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" :value="user.id" v-model="selectedUsers"
                    class="rounded text-indigo-600 focus:ring-indigo-500">
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ user.userName }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.fullName }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getRoleClass(user.roles)">
                    {{ getRoleName(user.roles) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
                  <router-link :to="`/admin/user-edit/${user.id}`"
                    class="text-indigo-600 hover:text-indigo-900 flex items-center space-x-1">
                    <i class="fas fa-edit"></i>
                    <span>Sửa</span>
                  </router-link>

                  <button @click="confirmDelete(user.id)"
                    class="text-red-600 hover:text-red-900 flex items-center space-x-1">
                    <i class="fas fa-trash"></i>
                    <span>Xóa</span>
                  </button>
                </td>
              </tr>
              <tr v-if="users.length === 0 && !loading">
                <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                  Không có người dùng nào được tìm thấy
                </td>
              </tr>
              <tr v-if="loading">
                <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                  <i class="fas fa-spinner fa-spin mr-2"></i> Đang tải dữ liệu...
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="users.length > 0"
          class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Hiển thị
                <span class="font-medium">{{ pagination.from }}</span>
                đến
                <span class="font-medium">{{ pagination.to }}</span>
                của
                <span class="font-medium">{{ pagination.total }}</span>
                kết quả
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button @click="prevPage" :disabled="pagination.currentPage === 1"
                  :class="['relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50', pagination.currentPage === 1 ? 'cursor-not-allowed opacity-50' : '']">
                  <span class="sr-only">Previous</span>
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button v-for="page in pagination.pages" :key="page" @click="goToPage(page)"
                  :class="['relative inline-flex items-center px-4 py-2 border text-sm font-medium', page === pagination.currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50']">
                  {{ page }}
                </button>
                <button @click="nextPage" :disabled="pagination.currentPage === pagination.totalPages"
                  :class="['relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50', pagination.currentPage === pagination.totalPages ? 'cursor-not-allowed opacity-50' : '']">
                  <span class="sr-only">Next</span>
                  <i class="fas fa-chevron-right"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
          </div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 text-center mt-3">Xác nhận xóa</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500 text-center">
              Bạn có chắc chắn muốn xóa {{ selectedUsers.length }} người dùng đã chọn? Hành động này không thể hoàn tác.
            </p>
          </div>
          <div class="items-center px-4 py-3 flex justify-center space-x-3">
            <button @click="showDeleteModal = false"
              class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
              Hủy
            </button>
            <button @click="deleteUsers" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
const toast = useToast()
export default {
  name: 'UserManagement',
  data() {
    return {
      message: '',
      alertType: 'success',
      showSearch: true,
      showDeleteModal: false,
      loading: false,
      selectedUsers: [],
      selectAll: false,
      searchCriteria: {
        userName: '',
        fullName: '',
        email: ''
      },
      users: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        total: 0,
        from: 0,
        to: 0,
        pages: []
      }
    }
  },
  computed: {
    alertClass() {
      return {
        'success': 'bg-green-100 text-green-800 border border-green-200',
        'error': 'bg-red-100 text-red-800 border border-red-200',
        'warning': 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      }[this.alertType]
    },
    alertIcon() {
      return {
        'success': 'fas fa-check-circle text-green-500',
        'error': 'fas fa-exclamation-circle text-red-500',
        'warning': 'fas fa-exclamation-triangle text-yellow-500'
      }[this.alertType]
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await axios.get('/api/users', {
          params: {
            page: this.pagination.currentPage,
            size: 10,
            userName: this.searchCriteria.userName,   // dùng key đúng
            fullName: this.searchCriteria.fullName,
            email: this.searchCriteria.email
          }
        });

        this.users = response.data.content || response.data.users || response.data;

        // Cập nhật thông tin phân trang
        if (response.data.totalPages !== undefined) {
          this.pagination = {
            currentPage: response.data.currentPage || response.data.number || 1,
            totalPages: response.data.totalPages || Math.ceil(response.data.total / 10),
            total: response.data.total,
            from: ((response.data.currentPage || 1) - 1) * 10 + 1,
            to: Math.min((response.data.currentPage || 1) * 10, response.data.total),
            pages: this.generatePageArray(response.data.totalPages || Math.ceil(response.data.total / 10))
          };
        }
      } catch (error) {
        console.error('Lỗi khi tải danh sách người dùng:', error);
        this.message = 'Không thể tải danh sách người dùng';
        this.alertType = 'error';
      } finally {
        this.loading = false;
      }
    },

    generatePageArray(totalPages) {
      const pages = [];
      const currentPage = this.pagination.currentPage;
      const maxVisiblePages = 5;

      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    },

    toggleSearch() {
      this.showSearch = !this.showSearch
    },

    searchUsers() {
      this.pagination.currentPage = 1;
      this.fetchUsers();
    },

    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedUsers = this.users.map(user => user.id)
      } else {
        this.selectedUsers = []
      }
    },

    getRoleClass(roles) {
      if (!roles || roles.length === 0) return 'bg-gray-100 text-gray-800';

      if (roles.some(r => r.code === 'MANAGER')) return 'bg-purple-100 text-purple-800';
      if (roles.some(r => r.code === 'STAFF')) return 'bg-blue-100 text-blue-800';

      return 'bg-green-100 text-green-800';
    },

    getRoleName(roles) {
      if (!roles || roles.length === 0) return 'Chưa xác định';

      if (roles.some(r => r.code === 'MANAGER')) return 'Quản trị viên';
      if (roles.some(r => r.code === 'STAFF')) return 'Nhân viên';

      return 'Người dùng';
    },


    confirmDelete(userId) {
      this.selectedUsers = [userId];
      this.showDeleteModal = true;
    },

    deleteSelected() {
      if (this.selectedUsers.length === 0) return;
      this.showDeleteModal = true;
    },

    async deleteUsers() {
      try {
        await axios.delete('/api/users', {
          data: this.selectedUsers
        });

        this.showDeleteModal = false;
        toast.success('🗑️ Đã xoá Người dùng khỏi hệ thống !')
        this.alertType = 'success';
        this.selectedUsers = [];
        this.fetchUsers();
      } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        this.message = 'Không thể xóa người dùng';
        this.alertType = 'error';
      }
    },

    prevPage() {
      if (this.pagination.currentPage > 1) {
        this.pagination.currentPage--;
        this.fetchUsers();
      }
    },

    nextPage() {
      if (this.pagination.currentPage < this.pagination.totalPages) {
        this.pagination.currentPage++;
        this.fetchUsers();
      }
    },

    goToPage(page) {
      this.pagination.currentPage = page;
      this.fetchUsers();
    },

    logout() {
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  },
  watch: {
    selectedUsers: {
      handler(newVal) {
        this.selectAll = newVal.length === this.users.length && this.users.length > 0;
      },
      deep: true
    }
  }
}
</script>

<style scoped>
/* Custom styles can be added here */
</style>