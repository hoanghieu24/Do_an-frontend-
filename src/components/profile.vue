<template>
  <!-- Loading overlay -->
  <div v-if="isLoading" class="fixed inset-0 bg-indigo-900/90 flex items-center justify-center z-50">
    <div class="flex flex-col items-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      <p class="mt-4 text-white text-lg font-medium">Đang tải thông tin...</p>
    </div>
  </div>

  <div
    class="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 flex items-center justify-center p-6 transition-opacity duration-300"
    :class="{ 'opacity-50': isLoading }">
    <div
      class="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-3xl text-white border border-indigo-500/30 transform transition-all duration-500 hover:shadow-indigo-500/20 hover:shadow-xl">
      <div class="flex flex-col items-center space-y-4">
        <!-- Avatar -->
        <div class="relative group">
          <div
            class="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200">
          </div>
          <div class="relative">
            <img :src="getAvatarUrl(user.avatar)" alt="avatar"
              class="rounded-full w-32 h-32 object-cover border-2 border-indigo-400 shadow-md" />

            <span
              class="absolute bottom-0 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-indigo-800 animate-pulse"></span>
          </div>
        </div>

        <!-- Info -->
        <div class="text-center">
          <h2
            class="text-2xl font-bold tracking-wide bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            {{ user.fullName || 'Người dùng chưa có tên' }}
          </h2>
          <p class="text-indigo-300 text-sm mt-1">@{{ user.userName }}</p>
          <div class="flex items-center justify-center space-x-2 text-sm mt-2">
            <span
              class="bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 rounded-full border border-indigo-500 shadow-md">
              {{
                user.roleCode === 'MANAGER' ? 'Quản lý' :
                  user.roleCode === 'STAFF' ? 'Nhân viên' :
                    user.roleCode === 'USER' ? 'Khách hàng' :
                      user.roleCode
              }}
            </span>
          </div>
        </div>

        <div class="mt-6 w-full border-t border-indigo-500/20"></div>

        <!-- Detail Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full text-indigo-200">
          <div
            class="bg-white/5 p-4 rounded-xl border border-indigo-500/10 transition-all duration-300 hover:bg-white/10">
            <h3 class="font-semibold text-indigo-300 mb-1">Họ và tên:</h3>
            <p class="text-white">{{ user.fullName || 'Chưa cập nhật' }}</p>
          </div>
          <div
            class="bg-white/5 p-4 rounded-xl border border-indigo-500/10 transition-all duration-300 hover:bg-white/10">
            <h3 class="font-semibold text-indigo-300 mb-1">Email:</h3>
            <p class="text-white">{{ user.email || 'Chưa có' }}</p>
          </div>
          <div
            class="bg-white/5 p-4 rounded-xl border border-indigo-500/10 transition-all duration-300 hover:bg-white/10">
            <h3 class="font-semibold text-indigo-300 mb-1">Số Điện thoại:</h3>
            <p class="text-white">{{ user.phone || 'Chưa có' }}</p>
          </div>

          <div
            class="bg-white/5 p-4 rounded-xl border border-indigo-500/10 transition-all duration-300 hover:bg-white/10">
            <h3 class="font-semibold text-indigo-300 mb-1">Số lần giao dịch:</h3>
            <p class="text-white">{{ user.transactionCount || 0 }}</p>
          </div>
          <div
            class="bg-white/5 p-4 rounded-xl border border-indigo-500/10 transition-all duration-300 hover:bg-white/10">
            <h3 class="font-semibold text-indigo-300 mb-1">Ngày tham gia:</h3>
            <p class="text-white">{{ formatDate(user.createdDate) }}</p>
          </div>
        </div>

        <div class="mt-8 flex justify-center space-x-4">
          <button @click="showEditModal = true"
            class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Cập nhật hồ sơ</span>
          </button>
          <button @click="logout"
            class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal sửa hồ sơ -->
  <div v-if="showEditModal"
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
    <div
      class="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-95 hover:scale-100">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-800">Cập nhật hồ sơ</h3>
        <button @click="closeEditModal" class="text-gray-500 hover:text-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="updateProfile" class="space-y-4">
        <!-- Avatar -->
        <div class="flex flex-col items-center">
          <div class="relative mb-4 group">
            <div
              class="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200">
            </div>
            <div class="relative">
              <img :src="avatarPreview || getAvatarUrl(user.avatar)" alt="Avatar"
                class="w-24 h-24 rounded-full border-4 border-indigo-400 shadow-lg transition-transform duration-300 group-hover:scale-105 object-cover" />
              <label for="avatarInput"
                class="absolute bottom-0 right-0 bg-indigo-500 text-white p-1 rounded-full cursor-pointer shadow-md hover:bg-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
              <input id="avatarInput" type="file" accept="image/*" class="hidden" @change="handleAvatarChange" />
            </div>
          </div>
        </div>

        <!-- id -->
        <div style="display: none;">
          <label class="block text-sm font-medium text-gray-700 mb-1">ID</label>
          <input v-model="editForm.id" type="text" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
        </div>

        <!-- Họ và tên -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
          <input v-model="editForm.fullName" type="text" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="editForm.email" type="email" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
        </div>

        <!-- Username -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
          <input v-model="editForm.userName" type="text" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
          <input v-model="editForm.phone" type="text" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
        </div>

        <!-- Mật khẩu hiện tại -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
          <input v-model="editForm.currentPassword" type="password" placeholder="Nhập mật khẩu hiện tại của bạn" class="w-full px-4 py-2 border border-gray-300 rounded-lg 
           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
           transition-colors" />
        </div>

        <!-- Mật khẩu mới -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu mới (để trống nếu không đổi)
          </label>
          <input v-model="editForm.newPassword" type="password" :disabled="!editForm.currentPassword"
            placeholder="Nhập mật khẩu mới" class="w-full px-4 py-2 border border-gray-300 rounded-lg 
           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
           transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed" />
        </div>

        <!-- Xác nhận mật khẩu mới -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Xác nhận mật khẩu mới
          </label>
          <input v-model="editForm.confirmPassword" type="password" :disabled="!editForm.currentPassword"
            placeholder="Nhập lại mật khẩu mới" class="w-full px-4 py-2 border border-gray-300 rounded-lg 
           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
           transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed" />
        </div>

        <!-- Nút hành động -->
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" @click="closeEditModal"
            class="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-300">
            Hủy
          </button>
          <button type="submit" :disabled="isUpdating"
            class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg transition-all duration-300 flex items-center disabled:opacity-70">
            <span v-if="isUpdating">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </span>
            {{ isUpdating ? 'Đang cập nhật...' : 'Cập nhật' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, onBeforeUnmount } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import { useToast } from "vue-toastification"

const router = useRouter()
const toast = useToast()

const user = ref({})
const defaultAvatar = "https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg"
const showEditModal = ref(false)
const isUpdating = ref(false)
const isLoading = ref(true)

// Thêm biến để lưu preview URL
const avatarPreview = ref('')

// Form sửa hồ sơ
const editForm = reactive({
  id: '',
  fullName: '',
  email: '',
  userName: '',
  phone: '',
  avatar: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const getAvatarUrl = (avatarPath) => {
  if (!avatarPath) {
    return "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  }
  if (avatarPath.startsWith("http")) {
    return avatarPath
  }
  return `${avatarPath}`
}

const formatDate = (dateStr) => {
  if (!dateStr) return "Không xác định"
  return new Date(dateStr).toLocaleDateString("vi-VN")
}

// ✅ Gọi API lấy current user
onMounted(async () => {
  const stored = localStorage.getItem('currentUser') || localStorage.getItem('user')
  if (!stored) {
    isLoading.value = false
    toast.info("Vui lòng đăng nhập để xem thông tin cá nhân")
    router.push('/')
    return
  }

  try {
    const currentUserRes = await axios.get("/api/users/me")
    const currentUsername = currentUserRes.data.username

    // lấy thêm thông tin chi tiết user
    const detailRes = await axios.get(`/api/users?userName=${currentUsername}`)
    user.value = detailRes.data[0] || {}

    // Giả sử backend có trường transactionCount, nếu chưa thì set 0
    if (!user.value.transactionCount) user.value.transactionCount = 0

    // Điền dữ liệu vào form sửa
    Object.assign(editForm, {
      id: user.value.id || '',
      fullName: user.value.fullName || '',
      email: user.value.email || '',
      userName: user.value.userName || '',
      phone: user.value.phone || '',
      avatar: user.value.avatar || ''
    })

  } catch (err) {
    console.error(err)
    toast.error("Không thể tải thông tin người dùng")
  } finally {
    isLoading.value = false
  }
})

// Xử lý thay đổi avatar
const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Tạo URL preview cho file đã chọn
    avatarPreview.value = URL.createObjectURL(file)
    editForm.avatar = file // Lưu file vào form
  }
}

// Đóng modal và reset preview
const closeEditModal = () => {
  showEditModal.value = false
  // Reset preview khi đóng modal
  if (avatarPreview.value) {
    URL.revokeObjectURL(avatarPreview.value)
    avatarPreview.value = ''
  }
}

// Cập nhật cả 2 mục trong localStorage
// Cập nhật cả 2 mục trong localStorage
const updateLocalStorage = (updatedUser) => {
  try {
    // Lấy thông tin hiện tại từ localStorage
    const currentUserData = JSON.parse(localStorage.getItem('user') || '{}')
    const currentCurrentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    
    // QUAN TRỌNG: Giữ nguyên roles từ dữ liệu hiện tại
    const currentRoles = currentUserData.roles || ['ROLE_USER']
    const currentCurrentUserRoles = currentCurrentUser.roles || ['ROLE_USER']
    
    // Cập nhật mục 'user'
    const updatedUserData = {
      ...currentUserData,
      id: updatedUser.id || currentUserData.id,
      username: updatedUser.userName || currentUserData.username,
      fullname: updatedUser.fullName || currentUserData.fullname,
      email: updatedUser.email || currentUserData.email,
      phone: updatedUser.phone || currentUserData.phone,
      avatar: updatedUser.avatar || currentUserData.avatar || defaultAvatar,
      roles: currentRoles // GIỮ NGUYÊN ROLES
    }
    
    // Cập nhật mục 'currentUser'
    const updatedCurrentUser = {
      ...currentCurrentUser,
      defaultUsername: updatedUser.userName || currentCurrentUser.defaultUsername,
      fullname: updatedUser.fullName || currentCurrentUser.fullname,
      avatar: updatedUser.avatar || currentCurrentUser.avatar || defaultAvatar,
      roles: currentCurrentUserRoles // GIỮ NGUYÊN ROLES
    }
    
    // Lưu cả 2 vào localStorage
    localStorage.setItem('user', JSON.stringify(updatedUserData))
    localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser))
    
    console.log('✅ Đã cập nhật user trong localStorage:', updatedUserData)
    console.log('✅ Đã cập nhật currentUser trong localStorage:', updatedCurrentUser)
    
    // Trigger storage event để các component khác (như navbar) cập nhật
    window.dispatchEvent(new Event('storage'))
    
    return true
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật localStorage:', error)
    return false
  }
}

// Cập nhật hồ sơ
// Cập nhật hồ sơ
const updateProfile = async () => {
  // Kiểm tra mật khẩu
  if (editForm.newPassword && editForm.newPassword !== editForm.confirmPassword) {
    toast.error("Mật khẩu xác nhận không khớp")
    return
  }

  // Kiểm tra nếu có mật khẩu mới thì phải có mật khẩu hiện tại
  if (editForm.newPassword && !editForm.currentPassword) {
    toast.error("Vui lòng nhập mật khẩu hiện tại để đổi mật khẩu")
    return
  }

  isUpdating.value = true

  try {
    // Tạo FormData
    const formData = new FormData()

    // Thông tin user dưới dạng JSON blob - QUAN TRỌNG: Giữ nguyên role
    const userPayload = {
      id: editForm.id,
      fullName: editForm.fullName,
      email: editForm.email,
      userName: editForm.userName,
      phone: editForm.phone,
      roleCode: user.value.roleCode, // GIỮ NGUYÊN ROLE HIỆN TẠI
      status: '1'
      // Không gửi avatar qua JSON vì sẽ gửi qua file
    }
    
    // Chỉ thêm password nếu người dùng nhập mật khẩu mới
    if (editForm.newPassword) {
      userPayload.password = editForm.newPassword
    }
    
    formData.append(
      "user",
      new Blob([JSON.stringify(userPayload)], { type: "application/json" })
    )

    // Nếu có avatar mới (file input)
    if (editForm.avatar instanceof File) {
      formData.append("file", editForm.avatar)
    }

    // Gọi API dạng multipart/form-data
    const res = await axios.put(`/api/users/${user.value.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })

    // Cập nhật lại user local
    const updated = res.data
    user.value.fullName = updated.fullName
    user.value.email = updated.email
    user.value.userName = updated.userName
    user.value.phone = updated.phone
    user.value.avatar = updated.avatar
    // QUAN TRỌNG: Giữ nguyên roleCode
    user.value.roleCode = user.value.roleCode

    // Cập nhật cả 2 mục trong localStorage - ĐẢM BẢO GIỮ NGUYÊN ROLE
    const updateStorageSuccess = updateLocalStorage({
      ...updated,
      roleCode: user.value.roleCode // GIỮ NGUYÊN ROLE
    })
    
    if (updateStorageSuccess) {
      // Reset form và preview
      editForm.newPassword = ''
      editForm.confirmPassword = ''
      editForm.currentPassword = ''
      
      if (avatarPreview.value) {
        URL.revokeObjectURL(avatarPreview.value)
        avatarPreview.value = ''
      }

      showEditModal.value = false
      toast.success("Cập nhật hồ sơ thành công!")
      
      // Reload trang để cập nhật toàn bộ dữ liệu
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } else {
      toast.warning("Cập nhật hồ sơ thành công nhưng có lỗi khi cập nhật localStorage")
    }

  } catch (error) {
    console.error(error)
    toast.error("Cập nhật hồ sơ thất bại. Vui lòng thử lại.")
  } finally {
    isUpdating.value = false
  }
}

const logout = () => {
  localStorage.clear()
  toast.info("Đã đăng xuất")
  router.push("/login")
}

// Cleanup preview URL khi component unmount
onBeforeUnmount(() => {
  if (avatarPreview.value) {
    URL.revokeObjectURL(avatarPreview.value)
  }
})
</script>