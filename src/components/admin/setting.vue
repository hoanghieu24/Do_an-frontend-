<template>
    <div class="min-h-screen bg-gray-50 light:bg-gray-900 transition-colors duration-300">
        <!-- Hiệu ứng lễ hội -->
        <div id="snow-container" class="fixed inset-0 pointer-events-none z-50 hidden"></div>
        <div id="fireworks-container" class="fixed inset-0 pointer-events-none z-50 hidden"></div>

        <!-- Modal upload avatar -->
        <div v-if="showAvatarModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 max-w-full mx-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Đổi avatar</h3>
                
                <div class="space-y-4">
                    <!-- Preview avatar -->
                    <div class="flex justify-center">
                        <div class="relative">
                            <img :src="avatarPreview || getAvatarUrl(currentUser.avatar)" alt="Avatar preview"
                                class="w-32 h-32 rounded-full border-4 border-indigo-400 object-cover">
                        </div>
                    </div>

                    <!-- Upload options -->
                    <div class="space-y-3">
                        <label class="block">
                            <span class="sr-only">Chọn ảnh</span>
                            <input type="file" ref="fileInput" @change="handleFileSelect" 
                                accept="image/*" class="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100
                                dark:file:bg-gray-700 dark:file:text-gray-300">
                        </label>

                        <!-- Avatar gallery -->
                        <div>
                            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Avatar mẫu</p>
                            <div class="grid grid-cols-4 gap-2">
                                <button v-for="avatar in defaultAvatars" :key="avatar"
                                    @click="selectDefaultAvatar(avatar)"
                                    class="w-12 h-12 rounded-full overflow-hidden border-2 hover:border-indigo-500 transition-colors">
                                    <img :src="avatar" alt="Default avatar" class="w-full h-full object-cover">
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3 pt-4">
                        <button @click="showAvatarModal = false"
                            class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                            Hủy
                        </button>
                        <button @click="saveAvatar" :disabled="uploadingAvatar"
                            :class="['px-4 py-2 bg-indigo-500 text-white rounded-lg transition-colors',
                                uploadingAvatar ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600']">
                            {{ uploadingAvatar ? 'Đang tải...' : 'Lưu' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal edit profile -->
        <div v-if="showEditProfileModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 max-w-full mx-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Chỉnh sửa hồ sơ</h3>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Họ và tên
                        </label>
                        <input v-model="editProfileForm.name" type="text"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input v-model="editProfileForm.email" type="email"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Số điện thoại
                        </label>
                        <input v-model="editProfileForm.phone" type="tel"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    </div>
                </div>

                <div class="flex justify-end space-x-3 pt-6">
                    <button @click="showEditProfileModal = false"
                        class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                        Hủy
                    </button>
                    <button @click="saveProfile" :disabled="savingProfile"
                        :class="['px-4 py-2 bg-indigo-500 text-white rounded-lg transition-colors',
                            savingProfile ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600']">
                        {{ savingProfile ? 'Đang lưu...' : 'Lưu thay đổi' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal change password -->
        <div v-if="showChangePasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 max-w-full mx-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Đổi mật khẩu</h3>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Mật khẩu hiện tại
                        </label>
                        <input v-model="passwordForm.currentPassword" :type="showCurrentPassword ? 'text' : 'password'"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <button @click="showCurrentPassword = !showCurrentPassword" type="button" class="text-sm text-indigo-600 mt-1">
                            {{ showCurrentPassword ? 'Ẩn' : 'Hiện' }}
                        </button>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Mật khẩu mới
                        </label>
                        <input v-model="passwordForm.newPassword" :type="showNewPassword ? 'text' : 'password'"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <button @click="showNewPassword = !showNewPassword" type="button" class="text-sm text-indigo-600 mt-1">
                            {{ showNewPassword ? 'Ẩn' : 'Hiện' }}
                        </button>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Xác nhận mật khẩu mới
                        </label>
                        <input v-model="passwordForm.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <button @click="showConfirmPassword = !showConfirmPassword" type="button" class="text-sm text-indigo-600 mt-1">
                            {{ showConfirmPassword ? 'Ẩn' : 'Hiện' }}
                        </button>
                    </div>

                    <div v-if="passwordError" class="text-red-500 text-sm">
                        {{ passwordError }}
                    </div>
                </div>

                <div class="flex justify-end space-x-3 pt-6">
                    <button @click="showChangePasswordModal = false"
                        class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                        Hủy
                    </button>
                    <button @click="savePassword" :disabled="changingPassword"
                        :class="['px-4 py-2 bg-indigo-500 text-white rounded-lg transition-colors',
                            changingPassword ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600']">
                        {{ changingPassword ? 'Đang đổi...' : 'Đổi mật khẩu' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal privacy settings -->
        <div v-if="showPrivacyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 max-w-full mx-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cài đặt quyền riêng tư</h3>
                
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-medium text-gray-900 dark:text-white">Hiển thị hồ sơ công khai</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Cho phép người khác xem hồ sơ của bạn</p>
                        </div>
                        <button @click="togglePrivacySetting('publicProfile')" 
                            :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                                privacySettings.publicProfile ? 'bg-indigo-600' : 'bg-gray-200']">
                            <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                privacySettings.publicProfile ? 'translate-x-6' : 'translate-x-1']" />
                        </button>
                    </div>

                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-medium text-gray-900 dark:text-white">Cho phép tìm kiếm</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Cho phép người khác tìm thấy bạn</p>
                        </div>
                        <button @click="togglePrivacySetting('searchable')" 
                            :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                                privacySettings.searchable ? 'bg-indigo-600' : 'bg-gray-200']">
                            <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                privacySettings.searchable ? 'translate-x-6' : 'translate-x-1']" />
                        </button>
                    </div>

                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-medium text-gray-900 dark:text-white">Thu thập dữ liệu</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Cho phép thu thập dữ liệu cải thiện trải nghiệm</p>
                        </div>
                        <button @click="togglePrivacySetting('dataCollection')" 
                            :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                                privacySettings.dataCollection ? 'bg-indigo-600' : 'bg-gray-200']">
                            <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                privacySettings.dataCollection ? 'translate-x-6' : 'translate-x-1']" />
                        </button>
                    </div>

                    <button @click="exportPersonalData"
                        class="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <p class="font-medium text-gray-900 dark:text-white">Xuất dữ liệu cá nhân</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Tải về tất cả dữ liệu của bạn</p>
                    </button>

                    <button @click="deletePersonalData"
                        class="w-full text-left p-3 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-700 dark:text-red-300">
                        <p class="font-medium">Xóa dữ liệu cá nhân</p>
                        <p class="text-sm">Xóa vĩnh viễn tất cả dữ liệu của bạn</p>
                    </button>
                </div>

                <div class="flex justify-end space-x-3 pt-6">
                    <button @click="showPrivacyModal = false"
                        class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                        Đóng
                    </button>
                </div>
            </div>
        </div>

        <main class="w-full py-8 px-4 sm:px-6 lg:px-8">
            <!-- Profile Section -->
            <div
                class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8 max-w-7xl mx-auto">
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <img :src="getAvatarUrl(currentUser.avatar) || '/img/Hoang_Hieu.png'" alt="Avatar"
                            class="w-14 h-14 rounded-full border-2 border-indigo-400 shadow-md ring-2 ring-indigo-500/30 hover:scale-105 transition-transform duration-300 object-cover" />

                        <button @click="changeAvatar"
                            class="absolute -bottom-1 -right-1 bg-indigo-500 text-white p-1 rounded-full hover:bg-indigo-600 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="flex-1">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white profile-name">{{ currentUser.name
                        }}</h2>
                        <p class="text-gray-500 dark:text-gray-400 profile-email">{{ displayRole }}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentUser.email }}</p>
                    </div>
                    <button @click="editProfile"
                        class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                        Chỉnh sửa
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <!-- Main Settings -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Theme Settings -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z">
                                </path>
                            </svg>
                            Giao diện
                        </h3>

                        <div class="space-y-4">
                            <div
                                class="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 rounded-xl shadow-md">
                                <h2 class="text-2xl font-semibold mb-6">⚙️ Cài đặt hệ thống</h2>

                                <div class="flex items-center justify-between mb-4">
                                    <span class="text-lg font-medium">Chế độ giao diện</span>

                                    <button @click="handleThemeToggle"
                                        class="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-indigo-600 transition-all">
                                        <span v-if="isDark">🌞 Sáng</span>
                                        <span v-else>🌙 Tối</span>
                                    </button>
                                </div>

                                <div class="flex items-center justify-between">
                                    <span class="text-lg font-medium">Hiệu ứng lễ hội</span>
                                    <button @click="toggleFestivalMode" 
                                        :class="['px-4 py-2 rounded-full font-medium transition-all',
                                            settings.festivalMode ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400']">
                                        {{ settings.festivalMode ? '🎉 Tắt hiệu ứng' : '🎊 Bật hiệu ứng' }}
                                    </button>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-medium text-gray-900 dark:text-white">Màu chủ đạo</p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Tuỳ chỉnh màu sắc giao diện</p>
                                </div>
                                <div class="flex space-x-2">
                                    <button @click="changePrimaryColor('#6366f1')"
                                        :class="['w-8 h-8 rounded-full border-2 transition-transform hover:scale-110',
                                            settings.primaryColor === '#6366f1' ? 'border-gray-900 dark:border-white scale-110' : 'border-gray-300']"
                                        style="background-color: #6366f1"></button>
                                    <button @click="changePrimaryColor('#3b82f6')"
                                        :class="['w-8 h-8 rounded-full border-2 transition-transform hover:scale-110',
                                            settings.primaryColor === '#3b82f6' ? 'border-gray-900 dark:border-white scale-110' : 'border-gray-300']"
                                        style="background-color: #3b82f6"></button>
                                    <button @click="changePrimaryColor('#10b981')"
                                        :class="['w-8 h-8 rounded-full border-2 transition-transform hover:scale-110',
                                            settings.primaryColor === '#10b981' ? 'border-gray-900 dark:border-white scale-110' : 'border-gray-300']"
                                        style="background-color: #10b981"></button>
                                    <button @click="changePrimaryColor('#8b5cf6')"
                                        :class="['w-8 h-8 rounded-full border-2 transition-transform hover:scale-110',
                                            settings.primaryColor === '#8b5cf6' ? 'border-gray-900 dark:border-white scale-110' : 'border-gray-300']"
                                        style="background-color: #8b5cf6"></button>
                                    <button @click="changePrimaryColor('#ec4899')"
                                        :class="['w-8 h-8 rounded-full border-2 transition-transform hover:scale-110',
                                            settings.primaryColor === '#ec4899' ? 'border-gray-900 dark:border-white scale-110' : 'border-gray-300']"
                                        style="background-color: #ec4899"></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Language Settings -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129">
                                </path>
                            </svg>
                            Ngôn ngữ & Vùng miền
                        </h3>

                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Ngôn ngữ
                                </label>
                                <select v-model="settings.language" @change="applyLanguage"
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="vi">Tiếng Việt (Tiếng Việt)</option>
                                    <option value="en">English (English)</option>
                                    <option value="zh">Chinese (中文)</option>
                                    <option value="ja">Japanese (日本語)</option>
                                    <option value="ko">Korean (한국어)</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Múi giờ
                                </label>
                                <select v-model="settings.timezone" @change="applyTimezone"
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</option>
                                    <option value="Asia/Bangkok">Asia/Bangkok</option>
                                    <option value="Asia/Singapore">Asia/Singapore</option>
                                    <option value="Asia/Tokyo">Asia/Tokyo</option>
                                    <option value="Asia/Seoul">Asia/Seoul</option>
                                    <option value="America/New_York">America/New_York</option>
                                    <option value="Europe/London">Europe/London</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Định dạng ngày giờ
                                </label>
                                <select v-model="settings.dateFormat" @change="applyDateFormat"
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="DD/MM/YYYY">DD/MM/YYYY (24/12/2023)</option>
                                    <option value="MM/DD/YYYY">MM/DD/YYYY (12/24/2023)</option>
                                    <option value="YYYY-MM-DD">YYYY-MM-DD (2023-12-24)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Notification Settings -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                                </path>
                            </svg>
                            Thông báo
                        </h3>

                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-medium text-gray-900 dark:text-white">Thông báo email</p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Nhận thông báo qua email</p>
                                </div>
                                <button @click="toggleSetting('emailNotifications')" :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                                    settings.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200']">
                                    <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                        settings.emailNotifications ? 'translate-x-6' : 'translate-x-1']" />
                                </button>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-medium text-gray-900 dark:text-white">Thông báo push</p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Thông báo trên trình duyệt</p>
                                </div>
                                <button @click="toggleSetting('pushNotifications')" :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                                    settings.pushNotifications ? 'bg-indigo-600' : 'bg-gray-200']">
                                    <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                        settings.pushNotifications ? 'translate-x-6' : 'translate-x-1']" />
                                </button>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-medium text-gray-900 dark:text-white">Thông báo SMS</p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Nhận tin nhắn SMS</p>
                                </div>
                                <button @click="toggleSetting('smsNotifications')" :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                                    settings.smsNotifications ? 'bg-indigo-600' : 'bg-gray-200']">
                                    <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                        settings.smsNotifications ? 'translate-x-6' : 'translate-x-1']" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Privacy & Security -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                                </path>
                            </svg>
                            Bảo mật & Quyền riêng tư
                        </h3>

                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-medium text-gray-900 dark:text-white">Xác thực 2 yếu tố</p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Bảo vệ tài khoản của bạn</p>
                                </div>
                                <button @click="toggleSetting('twoFactorAuth')" :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                                    settings.twoFactorAuth ? 'bg-indigo-600' : 'bg-gray-200']">
                                    <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                        settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1']" />
                                </button>
                            </div>

                            <button @click="changePassword"
                                class="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <p class="font-medium text-gray-900 dark:text-white">Đổi mật khẩu</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Cập nhật mật khẩu mới</p>
                            </button>

                            <button @click="showPrivacySettings"
                                class="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <p class="font-medium text-gray-900 dark:text-white">Cài đặt quyền riêng tư</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Quản lý dữ liệu cá nhân</p>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions Sidebar -->
                <div class="space-y-6">
                    <!-- Save Settings -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lưu cài đặt</h3>
                        <button @click="saveSettings" :disabled="isSaving"
                            :class="['w-full py-3 px-4 rounded-lg font-medium transition-colors',
                                isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 text-white']">
                            <span v-if="isSaving" class="flex items-center justify-center">
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                Đang lưu...
                            </span>
                            <span v-else>Lưu thay đổi</span>
                        </button>
                    </div>

                    <!-- Quick Actions -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hành động nhanh</h3>
                        <div class="space-y-3">
                            <button @click="exportData"
                                class="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center">
                                <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10">
                                    </path>
                                </svg>
                                Xuất dữ liệu
                            </button>

                            <button @click="clearCache"
                                class="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center">
                                <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                    </path>
                                </svg>
                                Xoá bộ nhớ đệm
                            </button>

                            <button @click="showHelp"
                                class="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center">
                                <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                    </path>
                                </svg>
                                Trợ giúp & Hỗ trợ
                            </button>
                        </div>
                    </div>

                    <!-- Danger Zone -->
                    <div
                        class="bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-sm border border-red-200 dark:border-red-800 p-6">
                        <h3 class="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">Khu vực nguy hiểm</h3>
                        <div class="space-y-3">
                            <button @click="deleteAccount"
                                class="w-full text-left p-3 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors text-red-700 dark:text-red-300">
                                Xoá tài khoản
                            </button>

                            <button @click="logout"
                                class="w-full text-left p-3 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors text-red-700 dark:text-red-300">
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Toast Notification -->
    <div id="toast" :class="['fixed top-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 text-white hidden z-50',
        toastType === 'success' ? 'bg-green-500' : 'bg-red-500']">
        <div class="flex items-center">
            <svg id="toastIcon" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="toastType === 'success'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 13l4 4L19 7"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                </path>
            </svg>
            <span id="toastMessage">{{ toastMessage }}</span>
        </div>
    </div>
</template>

<script>
import { useSettingsStore } from '@/store/useSettingsStore'

export default {
    data() {
        return {
            // Modal states
            showAvatarModal: false,
            showEditProfileModal: false,
            showChangePasswordModal: false,
            showPrivacyModal: false,
            
            // Avatar upload
            avatarPreview: null,
            selectedAvatarFile: null,
            uploadingAvatar: false,
            defaultAvatars: [
                'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                'https://cdn-icons-png.flaticon.com/512/4140/4140047.png',
                'https://cdn-icons-png.flaticon.com/512/4333/4333609.png',
                'https://cdn-icons-png.flaticon.com/512/2202/2202112.png',
                'https://cdn-icons-png.flaticon.com/512/3011/3011270.png',
                'https://cdn-icons-png.flaticon.com/512/6997/6997662.png',
                'https://cdn-icons-png.flaticon.com/512/4322/4322991.png',
                'https://cdn-icons-png.flaticon.com/512/1999/1999625.png'
            ],

            // Edit profile
            editProfileForm: {
                name: '',
                email: '',
                phone: ''
            },
            savingProfile: false,

            // Change password
            passwordForm: {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            passwordError: '',
            changingPassword: false,
            showCurrentPassword: false,
            showNewPassword: false,
            showConfirmPassword: false,

            // Privacy settings
            privacySettings: {
                publicProfile: true,
                searchable: true,
                dataCollection: false
            },

            // Original data
            sidebarOpen: true,
            userDropdownOpen: false,
            currentUser: {
                name: '',
                role: '',
                avatar: '',
                email: '',
                phone: ''
            },
            isDark: false,
            isSaving: false,
            toastMessage: '',
            toastType: 'success',
            settings: {
                language: 'vi',
                timezone: 'Asia/Ho_Chi_Minh',
                dateFormat: 'DD/MM/YYYY',
                emailNotifications: true,
                pushNotifications: true,
                smsNotifications: false,
                twoFactorAuth: false,
                primaryColor: '#6366f1',
                festivalMode: false
            },
            snowInterval: null,
            fireworksInterval: null
        };
    },

    computed: {
        userInitials() {
            return this.currentUser.name
                ? this.currentUser.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()
                : '';
        },
        currentRouteName() {
            return this.$route?.name || 'Dashboard';
        },
        displayRole() {
            switch (this.currentUser.role) {
                case 'ROLE_MANAGER': return 'Admin';
                case 'ROLE_STAFF': return 'Nhân viên';
                default: return this.currentUser.role || 'Người dùng';
            }
        }
    },

    methods: {
        // === AVATAR METHODS ===
        changeAvatar() {
            this.showAvatarModal = true;
            this.avatarPreview = null;
            this.selectedAvatarFile = null;
        },

        handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) {
                    this.showToast('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB.', 'error');
                    return;
                }

                if (!file.type.startsWith('image/')) {
                    this.showToast('Vui lòng chọn file ảnh.', 'error');
                    return;
                }

                this.selectedAvatarFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.avatarPreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },

        selectDefaultAvatar(avatarUrl) {
            this.avatarPreview = avatarUrl;
            this.selectedAvatarFile = null;
        },

        async saveAvatar() {
            if (!this.avatarPreview) {
                this.showToast('Vui lòng chọn ảnh đại diện', 'error');
                return;
            }

            this.uploadingAvatar = true;

            try {
                await new Promise(resolve => setTimeout(resolve, 2000));

                let newAvatarUrl;
                if (this.selectedAvatarFile) {
                    newAvatarUrl = URL.createObjectURL(this.selectedAvatarFile);
                } else {
                    newAvatarUrl = this.avatarPreview;
                }

                this.currentUser.avatar = newAvatarUrl;
                
                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                userData.avatar = newAvatarUrl;
                localStorage.setItem('user', JSON.stringify(userData));

                this.showAvatarModal = false;
                this.showToast('Avatar đã được cập nhật thành công!', 'success');
            } catch (error) {
                console.error('Lỗi khi upload avatar:', error);
                this.showToast('Có lỗi xảy ra khi upload avatar', 'error');
            } finally {
                this.uploadingAvatar = false;
            }
        },

        // === PROFILE METHODS ===
        editProfile() {
            this.editProfileForm = {
                name: this.currentUser.name,
                email: this.currentUser.email,
                phone: this.currentUser.phone || ''
            };
            this.showEditProfileModal = true;
        },

        async saveProfile() {
            if (!this.editProfileForm.name.trim()) {
                this.showToast('Vui lòng nhập họ và tên', 'error');
                return;
            }

            this.savingProfile = true;

            try {
                await new Promise(resolve => setTimeout(resolve, 1500));

                this.currentUser.name = this.editProfileForm.name;
                this.currentUser.email = this.editProfileForm.email;
                this.currentUser.phone = this.editProfileForm.phone;

                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                userData.fullname = this.editProfileForm.name;
                userData.email = this.editProfileForm.email;
                userData.phone = this.editProfileForm.phone;
                localStorage.setItem('user', JSON.stringify(userData));

                this.showEditProfileModal = false;
                this.showToast('Thông tin hồ sơ đã được cập nhật!', 'success');
            } catch (error) {
                console.error('Lỗi khi cập nhật hồ sơ:', error);
                this.showToast('Có lỗi xảy ra khi cập nhật hồ sơ', 'error');
            } finally {
                this.savingProfile = false;
            }
        },

        // === PASSWORD METHODS ===
        changePassword() {
            this.passwordForm = {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            };
            this.passwordError = '';
            this.showChangePasswordModal = true;
        },

        validatePassword() {
            if (!this.passwordForm.currentPassword) {
                this.passwordError = 'Vui lòng nhập mật khẩu hiện tại';
                return false;
            }

            if (!this.passwordForm.newPassword) {
                this.passwordError = 'Vui lòng nhập mật khẩu mới';
                return false;
            }

            if (this.passwordForm.newPassword.length < 6) {
                this.passwordError = 'Mật khẩu mới phải có ít nhất 6 ký tự';
                return false;
            }

            if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
                this.passwordError = 'Mật khẩu xác nhận không khớp';
                return false;
            }

            this.passwordError = '';
            return true;
        },

        async savePassword() {
            if (!this.validatePassword()) {
                return;
            }

            this.changingPassword = true;

            try {
                await new Promise(resolve => setTimeout(resolve, 2000));

                this.showChangePasswordModal = false;
                this.showToast('Mật khẩu đã được thay đổi thành công!', 'success');
            } catch (error) {
                console.error('Lỗi khi đổi mật khẩu:', error);
                this.showToast('Có lỗi xảy ra khi đổi mật khẩu', 'error');
            } finally {
                this.changingPassword = false;
            }
        },

        // === PRIVACY METHODS ===
        showPrivacySettings() {
            const savedPrivacy = localStorage.getItem('privacySettings');
            if (savedPrivacy) {
                try {
                    this.privacySettings = { ...this.privacySettings, ...JSON.parse(savedPrivacy) };
                } catch (error) {
                    console.error('Lỗi khi tải cài đặt quyền riêng tư:', error);
                }
            }
            this.showPrivacyModal = true;
        },

        togglePrivacySetting(setting) {
            this.privacySettings[setting] = !this.privacySettings[setting];
            localStorage.setItem('privacySettings', JSON.stringify(this.privacySettings));
        },

        async exportPersonalData() {
            try {
                this.showToast('Đang chuẩn bị dữ liệu của bạn...', 'success');
                
                const userData = {
                    profile: this.currentUser,
                    settings: this.settings,
                    privacy: this.privacySettings,
                    exportDate: new Date().toISOString()
                };

                const dataStr = JSON.stringify(userData, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `personal-data-${new Date().toISOString().split('T')[0]}.json`;
                link.click();
                URL.revokeObjectURL(url);

                this.showToast('Dữ liệu đã được xuất thành công!', 'success');
            } catch (error) {
                console.error('Lỗi khi xuất dữ liệu:', error);
                this.showToast('Có lỗi xảy ra khi xuất dữ liệu', 'error');
            }
        },

        deletePersonalData() {
            if (confirm('Bạn có chắc chắn muốn xóa tất cả dữ liệu cá nhân? Hành động này không thể hoàn tác!')) {
                localStorage.removeItem('userSettings');
                localStorage.removeItem('privacySettings');
                localStorage.removeItem('appCache');
                
                this.showToast('Dữ liệu cá nhân đã được xóa!', 'success');
                this.showPrivacyModal = false;
            }
        },

        // === CÀI ĐẶT HỆ THỐNG ===
        handleThemeToggle() {
            this.isDark = !this.isDark;
            this.toggleTheme();
        },

        getAvatarUrl(avatarPath) {
            if (!avatarPath) {
                return "https://cdn-icons-png.flaticon.com/512/847/847969.png";
            }
            if (avatarPath.startsWith("http")) {
                return avatarPath;
            }
            return `${avatarPath}`;
        },

        toggleTheme() {
            const html = document.documentElement;
            const isDark = html.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            window.dispatchEvent(new CustomEvent('theme-changed', { 
                detail: { isDark } 
            }));
        },

        applySavedTheme() {
            const savedTheme = localStorage.getItem('theme');
            const html = document.documentElement;
            if (savedTheme === 'dark') {
                html.classList.add('dark');
                this.isDark = true;
            } else {
                html.classList.remove('dark');
                this.isDark = false;
            }
        },

        toggleSetting(setting) {
            this.settings[setting] = !this.settings[setting];
            if (setting === 'festivalMode') {
                this.settings.festivalMode ? this.startFestivalEffects() : this.stopFestivalEffects();
            }
        },

        changePrimaryColor(color) {
            this.settings.primaryColor = color;
            
            document.documentElement.style.setProperty('--primary-color', color);
            
            const root = document.documentElement;
            root.style.setProperty('--color-primary', color);
            
            const darkerColor = this.lightenDarkenColor(color, -20);
            const lighterColor = this.lightenDarkenColor(color, 20);
            root.style.setProperty('--color-primary-dark', darkerColor);
            root.style.setProperty('--color-primary-light', lighterColor);
            
            window.dispatchEvent(new CustomEvent('primary-color-changed', { 
                detail: { color } 
            }));
        },

        lightenDarkenColor(col, amt) {
            let usePound = false;
            if (col[0] === "#") {
                col = col.slice(1);
                usePound = true;
            }
            const num = parseInt(col, 16);
            let r = (num >> 16) + amt;
            if (r > 255) r = 255;
            else if (r < 0) r = 0;
            let b = ((num >> 8) & 0x00FF) + amt;
            if (b > 255) b = 255;
            else if (b < 0) b = 0;
            let g = (num & 0x0000FF) + amt;
            if (g > 255) g = 255;
            else if (g < 0) g = 0;
            return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
        },

        // === NGÔN NGỮ & VÙNG MIỀN ===
        applyLanguage() {
            localStorage.setItem('userLanguage', this.settings.language);
            
            window.dispatchEvent(new CustomEvent('language-changed', { 
                detail: { language: this.settings.language } 
            }));
            
            this.showToast(`Đã chuyển ngôn ngữ sang: ${this.getLanguageName(this.settings.language)}`);
        },

        applyTimezone() {
            localStorage.setItem('userTimezone', this.settings.timezone);
            window.dispatchEvent(new CustomEvent('timezone-changed', { 
                detail: { timezone: this.settings.timezone } 
            }));
            this.showToast(`Đã đổi múi giờ sang: ${this.settings.timezone}`);
        },

        applyDateFormat() {
            localStorage.setItem('userDateFormat', this.settings.dateFormat);
            window.dispatchEvent(new CustomEvent('date-format-changed', { 
                detail: { dateFormat: this.settings.dateFormat } 
            }));
            this.showToast(`Đã đổi định dạng ngày: ${this.settings.dateFormat}`);
        },

        getLanguageName(code) {
            const languages = {
                'vi': 'Tiếng Việt',
                'en': 'English',
                'zh': '中文',
                'ja': '日本語',
                'ko': '한국어'
            };
            return languages[code] || code;
        },

        // === LƯU CÀI ĐẶT ===
        async saveSettings() {
            this.isSaving = true;
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                localStorage.setItem('userSettings', JSON.stringify(this.settings));
                
                if (this.$pinia) {
                    const settingsStore = useSettingsStore();
                    settingsStore.updateSettings(this.settings);
                }
                
                this.showToast('Tất cả cài đặt đã được lưu thành công!', 'success');
                 window.location.reload() // reload để App.vue re-check
            } catch (error) {
                console.error('Lỗi khi lưu cài đặt:', error);
                this.showToast('Có lỗi xảy ra khi lưu cài đặt', 'error');
            } finally {
                this.isSaving = false;
            }
        },

        // === HIỆU ỨNG LỄ HỘI ===
        toggleFestivalMode() {
            this.settings.festivalMode = !this.settings.festivalMode;
            this.settings.festivalMode ? this.startFestivalEffects() : this.stopFestivalEffects();
        
        },

        startFestivalEffects() {
            this.startSnowEffect();
            this.startFireworksEffect();
        },

        stopFestivalEffects() {
            const snow = document.getElementById('snow-container');
            const fire = document.getElementById('fireworks-container');

            if (snow) {
                snow.classList.add('hidden');
                snow.innerHTML = '';
            }
            if (fire) {
                fire.classList.add('hidden');
                fire.innerHTML = '';
            }

            clearInterval(this.snowInterval);
            clearInterval(this.fireworksInterval);
            this.snowInterval = null;
            this.fireworksInterval = null;
        },

        startSnowEffect() {
            const container = document.getElementById('snow-container');
            if (!container) return;
            container.classList.remove('hidden');

            this.snowInterval = setInterval(() => {
                const flake = document.createElement('div');
                flake.innerHTML = '❄';
                flake.classList.add('absolute', 'text-white', 'text-xl', 'opacity-70');
                flake.style.left = Math.random() * 100 + 'vw';
                flake.style.top = '-20px';
                flake.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
                container.appendChild(flake);

                setTimeout(() => flake.remove(), 5000);
                if (container.children.length > 50) container.removeChild(container.children[0]);
            }, 200);
        },

        startFireworksEffect() {
            const container = document.getElementById('fireworks-container');
            if (!container) return;
            container.classList.remove('hidden');

            this.fireworksInterval = setInterval(() => this.createFirework(), 1500);
        },

        createFirework() {
            const container = document.getElementById('fireworks-container');
            if (!container) return;

            const firework = document.createElement('div');
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight / 2;

            Object.assign(firework.style, {
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: this.getRandomColor(),
                boxShadow: '0 0 5px 2px rgba(255,255,255,0.7)'
            });

            container.appendChild(firework);

            setTimeout(() => {
                firework.style.transition = 'all 0.5s ease-out';
                firework.style.transform = 'scale(0)';
                firework.style.opacity = '0';
                this.createParticles(x, y);
                setTimeout(() => firework.remove(), 500);
            }, 500);
        },

        createParticles(x, y) {
            const container = document.getElementById('fireworks-container');
            if (!container) return;
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

            for (let i = 0; i < 30; i++) {
                const p = document.createElement('div');
                Object.assign(p.style, {
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    width: '2px',
                    height: '2px',
                    borderRadius: '50%',
                    background: colors[Math.floor(Math.random() * colors.length)]
                });
                container.appendChild(p);

                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 50 + 20;
                p.style.transition = `all ${Math.random() * 0.5 + 0.5}s ease-out`;
                p.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                p.style.opacity = '0';

                setTimeout(() => p.remove(), 1000);
            }
        },

        getRandomColor() {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
            return colors[Math.floor(Math.random() * colors.length)];
        },

        // === TẢI CÀI ĐẶT ĐÃ LƯU ===
        loadSavedSettings() {
            const saved = localStorage.getItem('userSettings');
            if (saved) {
                try {
                    const parsedSettings = JSON.parse(saved);
                    Object.assign(this.settings, parsedSettings);
                    
                    if (this.settings.primaryColor) {
                        this.changePrimaryColor(this.settings.primaryColor);
                    }
                    
                    if (this.settings.festivalMode) {
                        this.startFestivalEffects();
                    }
                    
                    if (this.settings.language) {
                        this.applyLanguage();
                    }
                        
                    
                } catch (error) {
                    console.error('Lỗi khi tải cài đặt:', error);
                }
            }

            this.applySavedTheme();
        },

        // === CÁC PHƯƠNG THỨC KHÁC ===
        showToast(message, type = 'success') {
            this.toastMessage = message;
            this.toastType = type;

            const toast = document.getElementById('toast');
            if (!toast) return;

            toast.classList.remove('hidden');
            setTimeout(() => toast.classList.add('hidden'), 3000);
        },

        loadCurrentUser() {
            const storedUser = localStorage.getItem('user');
            if (!storedUser) return;

            try {
                const user = JSON.parse(storedUser);
                let name = user.fullname;

                if (Array.isArray(name)) {
                    name = name.join(' ');
                } else if (typeof name === 'string' && name.startsWith('[')) {
                    try {
                        name = JSON.parse(name).join(' ');
                    } catch {
                        // giữ nguyên
                    }
                }

                this.currentUser.name = name || 'Người dùng';
                this.currentUser.role = user.roles?.[0] || 'ROLE_USER';
                this.currentUser.avatar = user.avatar || '';
                this.currentUser.email = user.email || '';
                this.currentUser.phone = user.phone || '';
            } catch {
                console.error('Lỗi khi load user từ localStorage');
            }
        },

        // Các phương thức hành động
        exportData() {
            const exportData = {
                user: this.currentUser,
                settings: this.settings,
                privacy: this.privacySettings,
                exportTime: new Date().toISOString()
            };

            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `user-data-export-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            this.showToast('Dữ liệu đã được xuất thành công!', 'success');
        },

        clearCache() {
            localStorage.removeItem('appCache');
            this.showToast('Bộ nhớ đệm đã được xoá!');
        },

        showHelp() {
            this.showToast('Đang chuyển hướng đến trang trợ giúp...');
        },

        deleteAccount() {
            if (confirm('Bạn có chắc chắn muốn xoá tài khoản? Hành động này không thể hoàn tác!')) {
                this.showToast('Tài khoản đã được đánh dấu để xoá!');
            }
        },

        logout() {
            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                this.showToast('Đăng xuất thành công!');
                this.$router.push('/login');
            }
        },

        closeUserDropdown(event) {
            if (!event.target.closest('.user-dropdown')) {
                this.userDropdownOpen = false;
            }
        }
    },

    created() {
        this.loadCurrentUser();
        this.loadSavedSettings();
    },

    mounted() {
        document.addEventListener('click', this.closeUserDropdown);
    },

    beforeUnmount() {
        document.removeEventListener('click', this.closeUserDropdown);
        this.stopFestivalEffects();
    },

    watch: {
        'settings.festivalMode'(val) {
            localStorage.setItem('festivalMode', val);
        }
    }
};
</script>

<style>
#snow-container,
#fireworks-container {
    pointer-events: none;
}

@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}

:root {
    --color-primary: #6366f1;
    --color-primary-dark: #4f46e5;
    --color-primary-light: #818cf8;
}

.bg-indigo-500 {
    background-color: var(--color-primary);
}

.hover\:bg-indigo-600:hover {
    background-color: var(--color-primary-dark);
}

.text-indigo-500 {
    color: var(--color-primary);
}

.border-indigo-500 {
    border-color: var(--color-primary);
}

.focus\:ring-indigo-500:focus {
    --tw-ring-color: var(--color-primary);
}



.inset-0 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.bg-opacity-50 {
    background-color: rgba(0, 0, 0, 0.5);
}

.z-50 {
    z-index: 50;
}

.object-cover {
    object-fit: cover;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
    transition: all 0.3s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>