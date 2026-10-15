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
            Home
          </router-link>
        </li>
        <li class="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </li>
        <li class="text-gray-700 font-medium">Customer-list</li>
        <li class="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </li>
        <li class="text-gray-700 font-medium">Thêm mới khách hàng</li>
      </ol>
    </nav>

    <!-- Main Content -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="bg-blue-600 px-6 py-4">
        <h1 class="text-xl font-semibold text-white text-center">
          Thêm Thông Tin Khách Hàng
        </h1>
      </div>
      
      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Full Name -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <label for="fullName" class="block text-sm font-medium text-gray-700 pt-2">
              Tên Khách Hàng *
            </label>
            <div class="md:col-span-2">
              <input 
                v-model="formData.fullName" 
                type="text" 
                id="fullName" 
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                :class="{ 'border-red-300': errors.fullName }"
                placeholder="Nhập tên khách hàng"
              >
              <p v-if="errors.fullName" class="mt-1 text-sm text-red-600">{{ errors.fullName }}</p>
            </div>
          </div>

          <!-- Phone -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <label for="phone" class="block text-sm font-medium text-gray-700 pt-2">
              Số điện thoại *
            </label>
            <div class="md:col-span-2">
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
          </div>

          <!-- Email -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <label for="email" class="block text-sm font-medium text-gray-700 pt-2">
              Email
            </label>
            <div class="md:col-span-2">
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
          </div>

          <!-- Company Name -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <label for="companyName" class="block text-sm font-medium text-gray-700 pt-2">
              Tên Công ty
            </label>
            <div class="md:col-span-2">
              <input 
                v-model="formData.companyName" 
                type="text" 
                id="companyName" 
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Nhập tên công ty"
              >
            </div>
          </div>

          <!-- Demand -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <label for="demand" class="block text-sm font-medium text-gray-700 pt-2">
              Nhu cầu
            </label>
            <div class="md:col-span-2">
              <input 
                v-model="formData.demand" 
                type="text" 
                id="demand" 
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Nhập nhu cầu khách hàng"
              >
            </div>
          </div>

          <!-- Status -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <label for="status" class="block text-sm font-medium text-gray-700 pt-2">
              Tình Trạng *
            </label>
            <div class="md:col-span-2">
              <select 
                v-model="formData.status" 
                id="status" 
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                :class="{ 'border-red-300': errors.status }"
              >
                <option value="">--- Chọn tình trạng ---</option>
                <option v-for="statusOption in statusOptions" :key="statusOption.value" :value="statusOption.value">
                  {{ statusOption.label }}
                </option>
              </select>
              <p v-if="errors.status" class="mt-1 text-sm text-red-600">{{ errors.status }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 justify-center md:justify-start pt-6">
            <button 
              type="submit" 
              :disabled="loading"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0a2 2 0 0 0-2 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h2v4H4V3zm5 0a1 1 0 0 1 1 1v4H9V3h2zM4 8v5h8V8H4z"/>
              </svg>
              Thêm Khách Hàng
            </button>

            <router-link 
              to="/admin/customer-manager"
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Hủy Thao Tác
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Error Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto" v-if="showErrorModal" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Lỗi
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Bạn đang bỏ trống trường "Tên Khách Hàng" hoặc "Số Điện thoại" hoặc "Tình trạng". Vui lòng kiểm tra lại!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button 
            type="button" 
            @click="closeErrorModal"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Đóng
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
  name: 'CustomerAdd',
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      loading: false,
      formData: {
        fullName: '',
        phone: '',
        email: '',
        companyName: '',
        demand: '',
        status: ''
      },
      errors: {},
      showErrorModal: false,
      statusOptions: [
        { value: 'CHUA_XU_LY', label: 'Chưa xử lý' },
        { value: 'DANG_XU_LY', label: 'Đang xử lý' },
        { value: 'DA_XU_LY', label: 'Đã xử lý' }
      ]
    };
  },
  methods: {
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
      } else if (!this.isValidPhone(this.formData.phone)) {
        this.errors.phone = 'Số điện thoại không hợp lệ';
        isValid = false;
      }

      if (this.formData.email && !this.isValidEmail(this.formData.email)) {
        this.errors.email = 'Email không hợp lệ';
        isValid = false;
      }

      if (!this.formData.status) {
        this.errors.status = 'Tình trạng là bắt buộc';
        isValid = false;
      }

      return isValid;
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
        this.showErrorModal = true;
        return;
      }

      this.loading = true;

      try {
        await this.addCustomer();
      } catch (error) {
        console.error('Error adding customer:', error);
        this.toast.error('Có lỗi xảy ra khi thêm khách hàng');
      } finally {
        this.loading = false;
      }
    },

    async addCustomer() {
      try {
        const response = await axios.post('/api/customers', this.formData);
        
        if (response.status === 200 || response.status === 201) {
          this.toast.success('🎉 Thêm khách hàng thành công!');
          
          // Reset form after successful submission
          this.resetForm();
          
          // Redirect to customer list after 2 seconds
          setTimeout(() => {
            this.$router.push('/admin/customer-edit');
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          if (error.response.data.message && error.response.data.message.includes('phone')) {
            this.errors.phone = 'Số điện thoại đã tồn tại';
            this.toast.error('Số điện thoại đã tồn tại');
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
        fullName: '',
        phone: '',
        email: '',
        companyName: '',
        demand: '',
        status: ''
      };
      this.errors = {};
    },

    closeErrorModal() {
      this.showErrorModal = false;
    }
  }
};
</script>

<style scoped>
/* Custom styles for better alignment */
.grid {
  display: grid;
}

@media (min-width: 768px) {
  .md\:grid-cols-3 {
    grid-template-columns: 1fr 2fr;
  }
  
  .md\:col-span-2 {
    grid-column: span 2 / span 2;
  }
}

.pt-2 {
  padding-top: 0.5rem;
}
</style>