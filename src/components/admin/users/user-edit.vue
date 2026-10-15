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
            Trang chủ
          </router-link>
        </li>
        <li class="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </li>
        <li class="text-gray-700 font-medium">Chỉnh sửa người dùng</li>
      </ol>
    </nav>

    <!-- Success/Error Message -->
    <div v-if="message" class="mb-6 rounded-md p-4" :class="messageClass">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg v-if="messageType === 'success'" class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium" :class="messageType === 'success' ? 'text-green-800' : 'text-red-800'">
            {{ message }}
          </p>
        </div>
        <div class="ml-auto pl-3">
          <button @click="message = ''"
            class="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="messageType === 'success' ? 'text-green-400 hover:text-green-500 focus:ring-green-500' : 'text-red-400 hover:text-red-500 focus:ring-red-500'">
            <span class="sr-only">Đóng</span>
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- User Form -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="bg-blue-600 px-6 py-4">
        <h3 class="text-lg font-semibold text-white">
          Chỉnh sửa người dùng
        </h3>
      </div>

      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Role Selection -->
          <div>
            <label for="roleCode" class="block text-sm font-medium text-gray-700 mb-2">Vai trò *</label>
            <select v-model="formData.roleCode" id="roleCode"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.roleCode }">
              <option value="">--- Chọn vai trò ---</option>
              <option v-for="role in roles" :key="role.code" :value="role.code">
                {{ role.name }}
              </option>
            </select>
            <p v-if="errors.roleCode" class="mt-1 text-sm text-red-600">{{ errors.roleCode }}</p>
          </div>

          <!-- Username (Disabled in edit mode) -->
          <div>
            <label for="userName" class="block text-sm font-medium text-gray-700 mb-2">Tên đăng nhập</label>
            <input v-model="formData.userName" type="text" id="userName" disabled
              class="block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm cursor-not-allowed"
              placeholder="Tên đăng nhập (không thể thay đổi)">
            <p class="mt-1 text-sm text-gray-500">Tên đăng nhập không thể thay đổi</p>
          </div>

          <!-- Full Name -->
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">Tên đầy đủ *</label>
            <input v-model="formData.fullName" type="text" id="fullName"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.fullName }" placeholder="Nhập tên đầy đủ">
            <p v-if="errors.fullName" class="mt-1 text-sm text-red-600">{{ errors.fullName }}</p>
          </div>
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input v-model="formData.email" type="text" id="email"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.email }" placeholder="Nhập email">
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>
          <!-- Full Name -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
            <input v-model="formData.phone" type="text" id="phone"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.phone }" placeholder="Nhập số điện thoại">
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
          </div>

          <!-- Status (if needed) -->
          <div v-if="hasStatusField">
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select v-model="formData.status" id="status"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option value="1">Hoạt động</option>
              <option value="0">Ngừng hoạt động</option>
            </select>
          </div>
          <!-- Avatar Upload -->
          <div class="flex flex-col items-center space-y-3">
            <img :src="previewAvatar || getAvatarUrl(formData.avatar)" alt="Avatar"
              class="w-24 h-24 rounded-full border-2 border-blue-400 object-cover shadow-md" />
            <input type="file" id="avatar" accept="image/*" @change="handleAvatarChange"
              class="text-sm text-gray-700" />
            <p class="text-xs text-gray-500">Chỉ hỗ trợ ảnh JPG, PNG, JPEG</p>
          </div>


          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 pt-4">
            <button type="submit" :disabled="loading"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
              <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              <svg v-else class="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Cập nhật người dùng
            </button>

            <button type="button" @click="handleResetPassword" :disabled="loading"
              class="inline-flex items-center px-4 py-2 border border-yellow-300 text-sm font-medium rounded-md shadow-sm text-yellow-700 bg-yellow-50 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed">
              <svg class="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset mật khẩu
            </button>

            <router-link to="/admin/manager-user"
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg class="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại danh sách
            </router-link>
          </div>
        </form>
      </div>
    </div>

    <!-- Reset Password Confirmation Modal -->
    <div v-if="showResetModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Xác nhận reset mật khẩu</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Bạn có chắc chắn muốn reset mật khẩu cho người dùng
                    <strong>{{ formData.fullName }}</strong> ({{ formData.userName }})?
                    Mật khẩu sẽ được đặt về mặc định.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" @click="confirmResetPassword" :disabled="loading"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
              <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Xác nhận reset
            </button>
            <button type="button" @click="showResetModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Hủy bỏ
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
const toast = useToast();

export default {
  name: 'UserEdit',
  data() {
    return {
      loading: false,
      message: '',
      messageType: 'success',
      showResetModal: false,
      previewAvatar: null,
      formData: {
        id: null,
        roleCode: '',
        userName: '',
        email: '',
        fullName: '',
        phone: '',
        status: '1',
        avatarFile: null,
      },
      errors: {},
      roles: [
        { code: 'MANAGER', name: 'Quản trị viên' },
        { code: 'STAFF', name: 'Nhân viên' },
        { code: 'USER', name: 'Người Dùng' }
      ]
    };
  },
  computed: {
    hasStatusField() {
      return this.formData.status !== undefined;
    }
  },
  mounted() {
    this.loadUserData();
    this.checkMessageFromQuery();
  },
  methods: {
    // ✅ Load dữ liệu user
    async loadUserData() {
      const userId = this.$route.params.id;
      if (!userId) {
        this.showMessage('Không tìm thấy ID người dùng', 'error');
        return;
      }

      try {
        this.loading = true;
        const response = await axios.get(`/api/users/${userId}`);
        const user = response.data;

        this.formData = {
          id: user.id,
          userName: user.userName,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          status: user.status ? String(user.status) : '1',
          roleCode: user.roleCode || (user.roles?.[0]?.code ?? ''),
          avatarFile: null,
        };

        this.previewAvatar = this.getAvatarUrl(user.avatar);

      } catch (error) {
        console.error('Error loading user data:', error);
        this.showMessage('Lỗi khi tải dữ liệu người dùng', 'error');
      } finally {
        this.loading = false;
      }
    },

    checkMessageFromQuery() {
      const message = this.$route.query.message;
      if (message) {
        switch (message) {
          case 'reset_password_success':
            toast.success('🗑️ Đổi mật khẩu thành công !');
            break;
          case 'role_require':
            toast.error('Vui lòng chọn vai trò');
            break;
          case 'error_system':
            toast.error('Có lỗi xảy ra trong hệ thống');
            break;
        }
        this.$router.replace({ query: {} });
      }
    },

    validateForm() {
      this.errors = {};

      if (!this.formData.roleCode) {
        this.errors.roleCode = 'Vui lòng chọn vai trò';
      }

      if (!this.formData.fullName) {
        this.errors.fullName = 'Vui lòng nhập tên đầy đủ';
      }

      return Object.keys(this.errors).length === 0;
    },

    // ✅ Submit form
    async handleSubmit() {
      if (!this.validateForm()) return;
      this.loading = true;

      try {
        await this.updateUser();
      } catch (error) {
        console.error('Error updating user:', error);
        toast.error('Có lỗi xảy ra khi cập nhật người dùng');
      } finally {
        this.loading = false;
      }
    },

    // ✅ Gửi request multipart/form-data
    async updateUser() {
      try {
        const formDataToSend = new FormData();

        // Phần user (để backend nhận @RequestPart("user"))
        formDataToSend.append(
          'user',
          new Blob([JSON.stringify({
            id: this.formData.id,
            roleCode: this.formData.roleCode,
            fullName: this.formData.fullName,
            email: this.formData.email,
            phone: this.formData.phone,
            status: this.formData.status
          })], { type: 'application/json' })
        );

        // Phần avatar nếu có
        if (this.formData.avatarFile) {
          formDataToSend.append('avatarFile', this.formData.avatarFile);
        }

        await axios.put(`/api/users/${this.formData.id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        toast.success('🧩 Đã cập nhật thông tin người dùng!');
        this.loadUserData();

      } catch (error) {
        console.error('Error updating user:', error);
        if (error.response && error.response.status === 400) {
          toast.error('Dữ liệu không hợp lệ');
        } else {
          toast.error('Lỗi hệ thống khi cập nhật người dùng');
        }
      }
    },

    // ✅ Xử lý chọn avatar
    handleAvatarChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        toast.error('Vui lòng chọn tệp ảnh hợp lệ (JPG, PNG, JPEG)');
        return;
      }

      this.formData.avatarFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewAvatar = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    getAvatarUrl(fileName) {
      if (!fileName) return '/img/default-avatar.png';
      return `/uploads/avatars/${fileName}`;
    },

    // ✅ Reset mật khẩu
    handleResetPassword() {
      this.showResetModal = true;
    },

    async confirmResetPassword() {
      this.loading = true;
      try {
        await axios.put(`/api/users/password/${this.formData.id}/reset`);
        this.showResetModal = false;
        toast.success('🗑️ Đổi mật khẩu thành công !');
      } catch (error) {
        console.error('Error resetting password:', error);
        toast.error('Có lỗi xảy ra khi reset mật khẩu');
      } finally {
        this.loading = false;
      }
    },

    showMessage(message, type = 'success') {
      this.message = message;
      this.messageType = type;
      setTimeout(() => {
        this.message = '';
      }, 5000);
    }
  }
};
</script>
