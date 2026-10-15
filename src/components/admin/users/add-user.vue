<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <!-- Breadcrumb -->
    <nav class="bg-white rounded-lg shadow-xs p-3 mb-6">
      <ol class="flex items-center space-x-2 text-sm">
        <li>
          <router-link to="/admin/dashboard" class="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Trang chủ
          </router-link>
        </li>
        <li class="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </li>
        <li class="text-gray-700 font-medium">Thêm mới người dùng</li>
      </ol>
    </nav>

    <!-- User Form -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="bg-green-600 px-6 py-4">
        <h3 class="text-lg font-semibold text-white">
          Thêm mới người dùng
        </h3>
      </div>
      
      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Role Selection -->
          <div>
            <label for="roleCode" class="block text-sm font-medium text-gray-700 mb-2">Vai trò *</label>
            <select 
              v-model="formData.roleCode" 
              id="roleCode" 
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.roleCode }"
            >
              <option value="">--- Chọn vai trò ---</option>
              <option v-for="role in roles" :key="role.code" :value="role.code">
                {{ role.name }}
              </option>
            </select>
            <p v-if="errors.roleCode" class="mt-1 text-sm text-red-600">{{ errors.roleCode }}</p>
          </div>

          <!-- Username -->
          <div>
            <label for="userName" class="block text-sm font-medium text-gray-700 mb-2">Tên đăng nhập *</label>
            <input 
              v-model="formData.userName" 
              type="text" 
              id="userName" 
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.userName }"
              placeholder="Nhập tên đăng nhập"
            >
            <p v-if="errors.userName" class="mt-1 text-sm text-red-600">{{ errors.userName }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu *</label>
            <input 
              v-model="formData.password" 
              type="password" 
              id="password" 
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.password }"
              placeholder="Nhập mật khẩu"
            >
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <!-- Full Name -->
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">Tên đầy đủ *</label>
            <input 
              v-model="formData.fullName" 
              type="text" 
              id="fullName" 
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.fullName }"
              placeholder="Nhập tên đầy đủ"
            >
            <p v-if="errors.fullName" class="mt-1 text-sm text-red-600">{{ errors.fullName }}</p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input 
              v-model="formData.email" 
              type="email" 
              id="email" 
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.email }"
              placeholder="Nhập email"
            >
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
            <input 
              v-model="formData.phone" 
              type="text" 
              id="phone" 
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.phone }"
              placeholder="Nhập số điện thoại"
            >
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
          </div>

          <!-- Status -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select 
              v-model="formData.status" 
              id="status" 
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="1">Hoạt động</option>
              <option value="0">Ngừng hoạt động</option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 pt-4">
            <button 
              type="submit" 
              :disabled="loading"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Thêm mới người dùng
            </button>

            <router-link 
              to="/admin/manager-user"
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại danh sách
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  name: 'UserAdd',
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      loading: false,
      formData: {
        roleCode: '',
        userName: '',
        password: '',
        fullName: '',
        email: '',
        phone: '',
        status: '1'
      },
      errors: {},
      roles: [
        { code: 'MANAGER', name: 'Quản trị viên' },
        { code: 'STAFF', name: 'Nhân viên' },
        { code: 'USER', name: 'Người Dùng' }
      ]
    };
  },
  mounted() {
    // Có thể thêm các hàm khởi tạo khác nếu cần
  },
  methods: {
    validateForm() {
      this.errors = {};
      
      if (!this.formData.roleCode) {
        this.errors.roleCode = 'Vui lòng chọn vai trò';
      }
      
      if (!this.formData.userName) {
        this.errors.userName = 'Vui lòng nhập tên đăng nhập';
      }
      
      if (!this.formData.password) {
        this.errors.password = 'Vui lòng nhập mật khẩu';
      } else if (this.formData.password.length < 6) {
        this.errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      }
      
      if (!this.formData.fullName) {
        this.errors.fullName = 'Vui lòng nhập tên đầy đủ';
      }
      
      if (!this.formData.email) {
        this.errors.email = 'Vui lòng nhập email';
      } else if (!this.isValidEmail(this.formData.email)) {
        this.errors.email = 'Email không hợp lệ';
      }
      
      if (!this.formData.phone) {
        this.errors.phone = 'Vui lòng nhập số điện thoại';
      } else if (!this.isValidPhone(this.formData.phone)) {
        this.errors.phone = 'Số điện thoại không hợp lệ';
      }
      
      return Object.keys(this.errors).length === 0;
    },
    
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    
    isValidPhone(phone) {
      const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
      return phoneRegex.test(phone);
    },
    
    async handleSubmit() {
      if (!this.validateForm()) {
        return;
      }
      
      this.loading = true;
      
      try {
        await this.addUser();
      } catch (error) {
        console.error('Error adding user:', error);
        this.toast.error('Có lỗi xảy ra khi thêm người dùng');
      } finally {
        this.loading = false;
      }
    },
    
    async addUser() {
      try {
        const response = await axios.post('/api/users', this.formData);
        
        if (response.status === 200 || response.status === 201) {
          this.toast.success('🎉 Thêm mới người dùng thành công!');
          
          // Reset form sau khi thêm thành công
          this.resetForm();
          
          // Chuyển hướng về trang danh sách sau 2 giây
          setTimeout(() => {
            this.$router.push('/admin/manager-user');
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          if (error.response.data.message && error.response.data.message.includes('username')) {
            this.errors.userName = 'Tên đăng nhập đã tồn tại';
            this.toast.error('Tên đăng nhập đã tồn tại');
          } else if (error.response.data.message && error.response.data.message.includes('email')) {
            this.errors.email = 'Email đã tồn tại';
            this.toast.error('Email đã tồn tại');
          } else {
            this.toast.error('Dữ liệu không hợp lệ');
          }
        } else {
          throw error;
        }
      }
    },
    
    resetForm() {
      this.formData = {
        roleCode: '',
        userName: '',
        password: '',
        fullName: '',
        email: '',
        phone: '',
        status: '1'
      };
      this.errors = {};
    }
  }
};
</script>

<style scoped>
/* Custom styles if needed */
</style>