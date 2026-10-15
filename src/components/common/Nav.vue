<template>
  <nav
    class="w-full fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300 border-b border-slate-200/80">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="text-xl font-bold flex items-center group" @click="resetScroll">
          <span class="flex items-center">
            <img src="@/assets/logo.png" alt="Logo"
              class="w-10 h-10 object-contain mr-2 transition-transform duration-300 group-hover:scale-105" />
            <span class="text-slate-900 font-extrabold text-xl tracking-tight">
              <span class="inline-block text-slate-900">HIDER</span>
              <span class="inline-block text-emerald-600 font-bold ml-1">VERSE</span>
            </span>
            <span class="ml-1 w-2 h-2 rounded-full bg-emerald-500"></span>
          </span>
        </router-link>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-1">
          <button @click="goToHomeAndScrolllTopropertylist"
            class="relative group text-slate-700 hover:text-emerald-700 px-3.5 py-2 text-sm font-semibold transition duration-200 cursor-pointer">
            <span class="relative z-10">Bất động sản</span>
            <span
              class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-emerald-600 rounded-full group-hover:w-4/5 transition-all duration-300"></span>
          </button>

          <button @click="goToHomeAndScrolllAgentsSection"
            class="relative group text-slate-700 hover:text-emerald-700 px-3.5 py-2 text-sm font-semibold transition duration-200 cursor-pointer">
            <span class="relative z-10">Môi giới</span>
            <span
              class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-emerald-600 rounded-full group-hover:w-4/5 transition-all duration-300"></span>
          </button>

          <button @click="goToHomeAndScrollTestimonials"
            class="relative group text-slate-700 hover:text-emerald-700 px-3.5 py-2 text-sm font-semibold transition duration-200 cursor-pointer">
            <span class="relative z-10">Giới thiệu</span>
            <span
              class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-emerald-600 rounded-full group-hover:w-4/5 transition-all duration-300"></span>
          </button>

          <button @click="goToHomeAndScrollContactSection"
            class="relative group text-slate-700 hover:text-emerald-700 px-3.5 py-2 text-sm font-semibold transition duration-200 cursor-pointer">
            <span class="relative z-10">Liên hệ</span>
            <span
              class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-emerald-600 rounded-full group-hover:w-4/5 transition-all duration-300"></span>
          </button>

          <router-link v-if="isLoggedIn" to="/favorites"
            class="relative group text-slate-700 hover:text-emerald-700 px-3.5 py-2 text-sm font-semibold transition duration-200 cursor-pointer"
            @click="resetScroll">
            <span class="relative z-10">Yêu thích</span>
            <span
              class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-emerald-600 rounded-full group-hover:w-4/5 transition-all duration-300"></span>
          </router-link>
        </div>

        <!-- User Actions -->
        <div class="flex items-center space-x-2">
          <!-- Nút chat support -->
          <button @click="openChat('support')"
            class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all duration-200 shadow-xs relative cursor-pointer"
            title="Chat với môi giới BĐS (Kafka Live Stream)">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
          </button>

          <!-- Chưa đăng nhập -->
          <template v-if="!isLoggedIn">
            <button
              type="button"
              @click="login"
              class="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-xs cursor-pointer select-none">
              <span class="mr-2">Đăng nhập</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14" />
              </svg>
            </button>
          </template>

          <!-- Đã đăng nhập -->
          <template v-else>
            <!-- Backdrop for Notification Dropdown -->
            <div
              v-if="notificationDropdownOpen"
              class="fixed inset-0 z-40 bg-transparent"
              @click="notificationDropdownOpen = false"
            ></div>

            <!-- Notification Bell -->
            <div class="relative z-50">
              <button
                type="button"
                @click="toggleNotificationDropdown"
                class="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-slate-100 transition-all duration-200 relative cursor-pointer"
                title="Thông báo">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <!-- Badge cho thông báo mới -->
                <span v-if="unreadNotifications > 0"
                  class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {{ unreadNotifications > 9 ? '9+' : unreadNotifications }}
                </span>
              </button>

              <!-- Notification Dropdown -->
              <div
                v-if="notificationDropdownOpen"
                class="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl ring-1 ring-slate-200 focus:outline-none z-50 divide-y divide-slate-100 max-h-96 overflow-hidden">
                <!-- Header -->
                <div class="px-5 py-4 bg-slate-50">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-bold text-slate-900">Thông báo</p>
                    <button v-if="unreadNotifications > 0" @click="markAllAsRead"
                      class="text-xs text-emerald-600 hover:text-emerald-800 font-semibold cursor-pointer">
                      Đánh dấu đã đọc
                    </button>
                  </div>
                </div>

                <!-- Notifications List -->
                <div class="overflow-y-auto max-h-64">
                  <div v-if="loadingNotifications" class="p-4 text-center">
                    <div class="spinner-small mx-auto"></div>
                    <p class="text-sm text-slate-500 mt-2">Đang tải thông báo...</p>
                  </div>

                  <div v-else-if="notifications.length === 0" class="p-6 text-center">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
                      <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <p class="text-sm text-slate-500">Không có thông báo nào</p>
                  </div>

                  <div v-else>
                    <div v-for="notification in notifications" :key="notification.id"
                      @click="handleNotificationClick(notification)" :class="[
                        'px-5 py-3 cursor-pointer transition-colors duration-150 hover:bg-slate-50 border-l-4',
                        notification.read ? 'border-transparent bg-white' : 'border-emerald-500 bg-emerald-50/20'
                      ]">
                      <div class="flex items-start space-x-3">
                        <div :class="[
                          'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                          getNotificationIconClass(notification.type)
                        ]">
                          <span class="text-xs font-semibold">{{ getNotificationIcon(notification.type) }}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-slate-900 truncate">
                            {{ notification.title }}
                          </p>
                          <p class="text-xs text-slate-500 mt-1">
                            {{ notification.message }}
                          </p>
                          <div class="flex items-center justify-between mt-2">
                            <span class="text-xs text-slate-400">
                              {{ formatTimeAgo(notification.createdAt) }}
                            </span>
                            <span v-if="!notification.read"
                              class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Footer -->
                <div class="px-5 py-3 bg-slate-50">
                  <button @click="viewAllNotifications"
                    class="w-full text-center text-sm text-emerald-600 hover:text-emerald-800 transition-colors font-medium cursor-pointer">
                    Xem tất cả thông báo
                  </button>
                </div>
              </div>
            </div>

            <!-- Backdrop for User Dropdown (Closes dropdown on outside click) -->
            <div
              v-if="userDropdownOpen"
              class="fixed inset-0 z-40 bg-transparent"
              @click="userDropdownOpen = false"
            ></div>

            <!-- User Profile Dropdown Button -->
            <div class="relative z-50">
              <button
                type="button"
                @click="toggleUserDropdown"
                class="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors duration-200 cursor-pointer focus:outline-none select-none"
                :class="{ 'bg-slate-100 ring-1 ring-slate-200': userDropdownOpen }">
                <!-- Avatar -->
                <img
                  :src="getAvatarUrl(props.user?.avatar) || '/img/Hoang_Hieu.png'"
                  alt="Avatar"
                  class="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs pointer-events-none"
                />

                <!-- Tên user -->
                <span class="font-semibold text-slate-800 text-sm hidden lg:inline-block max-w-[140px] truncate pointer-events-none">
                  {{ userDisplayName }}
                </span>

                <!-- Icon mũi tên xoay -->
                <svg
                  class="w-4 h-4 text-slate-500 transition-transform duration-200 pointer-events-none"
                  :class="{ 'rotate-180': userDropdownOpen }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="userDropdownOpen"
                class="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl ring-1 ring-slate-200 focus:outline-none z-50 divide-y divide-slate-100 overflow-hidden">
                <!-- Header dropdown -->
                <div class="px-5 py-4 bg-slate-50">
                  <p class="text-sm font-bold text-slate-900 truncate">{{ userDisplayName }}</p>
                  <p class="text-xs text-slate-500 truncate mt-0.5">{{ props.user?.email || '' }}</p>

                  <!-- Seller Request Status -->
                  <div v-if="sellerRequestStatus" class="mt-2">
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getSellerStatusClass(sellerRequestStatus)
                    ]">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ getSellerStatusText(sellerRequestStatus) }}
                    </span>
                  </div>
                </div>

                <!-- Menu items -->
                <div class="py-1.5">
                  <router-link
                    to="/profile"
                    @click="userDropdownOpen = false"
                    class="flex items-center px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700 transition-colors duration-150 group">
                    <svg class="w-4 h-4 mr-3 text-slate-400 group-hover:text-emerald-600 transition-colors" fill="none"
                      stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Trang cá nhân</span>
                  </router-link>

                  <!-- View Seller Dashboard -->
                  <router-link
                    v-if="hasRole('ROLE_SELLER')"
                    to="/seller/dashboard"
                    @click="userDropdownOpen = false"
                    class="flex items-center px-5 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-150 group">
                    <svg class="w-4 h-4 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>Dashboard Seller</span>
                  </router-link>

                  <!-- Admin / Staff link -->
                  <router-link
                    v-if="hasRole('ROLE_MANAGER') || hasRole('ROLE_STAFF') || hasRole('ROLE_ADMIN')"
                    :to="{ name: 'AdminDashboard' }"
                    @click="handleAdminClick"
                    class="flex items-center px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700 transition-colors duration-150 group">
                    <svg class="w-4 h-4 mr-3 text-slate-400 group-hover:text-emerald-600 transition-colors"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Quản trị</span>
                    <span class="ml-auto bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold">Admin</span>
                  </router-link>
                </div>

                <!-- Logout button -->
                <div class="py-1.5 bg-slate-50/60">
                  <button
                    type="button"
                    @click="logout"
                    class="w-full flex items-center px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 group cursor-pointer">
                    <svg class="w-4 h-4 mr-3 text-red-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            </div>
          </template>

          <!-- Mobile Toggle -->
          <button @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors duration-200 focus:outline-none cursor-pointer">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                :d="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2">
      <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-xl border-t border-slate-100">
        <div class="px-4 pt-2 pb-4 space-y-1">
          <button @click="goToHomeAndScrolllTopropertylist(); mobileMenuOpen = false"
            class="w-full text-left block px-4 py-2.5 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Bất động sản
          </button>
          <button @click="goToHomeAndScrolllAgentsSection(); mobileMenuOpen = false"
            class="w-full text-left block px-4 py-2.5 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Môi giới
          </button>
          <button @click="goToHomeAndScrollTestimonials(); mobileMenuOpen = false"
            class="w-full text-left block px-4 py-2.5 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Giới thiệu
          </button>
          <button @click="goToHomeAndScrollContactSection(); mobileMenuOpen = false"
            class="w-full text-left block px-4 py-2.5 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Liên hệ
          </button>
          <router-link v-if="props.user" to="/favorites" @click="mobileMenuOpen = false"
            class="w-full text-left block px-4 py-2.5 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Yêu thích
          </router-link>

          <div class="pt-2 border-t border-slate-200 mt-2">
            <template v-if="isLoggedIn">
              <!-- User info in Mobile -->
              <div class="px-4 py-3 flex items-center space-x-3 bg-slate-50 rounded-xl mb-2">
                <div class="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                  {{ userInitial }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-slate-900 truncate">{{ userDisplayName }}</p>
                  <p class="text-xs text-slate-500 truncate">{{ props.user.email }}</p>
                </div>
              </div>

              <!-- Admin / Staff in Mobile -->
              <router-link
                v-if="hasRole('ROLE_MANAGER') || hasRole('ROLE_STAFF') || hasRole('ROLE_ADMIN')"
                :to="{ name: 'AdminDashboard' }"
                @click="mobileMenuOpen = false"
                class="w-full text-left flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl">
                <span>Trang Quản trị</span>
                <span class="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold">Admin</span>
              </router-link>

              <!-- Seller Registration in Mobile -->
              <button
                v-if="!hasSellerRequest && !hasRole('ROLE_SELLER')"
                @click="registerAsSeller(); mobileMenuOpen = false"
                class="w-full text-left block px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors">
                Đăng ký trở thành Seller
              </button>

              <button
                type="button"
                @click="logout(); mobileMenuOpen = false"
                class="w-full text-left block px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer">
                Đăng xuất
              </button>
            </template>
            <template v-else>
              <button
                type="button"
                @click="login(); mobileMenuOpen = false"
                class="w-full block px-4 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-center hover:bg-slate-800 transition-colors">
                Đăng nhập
              </button>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </nav>

  <!-- Logout Modal -->
  <div v-if="showLogoutModal" class="fixed inset-0 z-[100] overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
      <!-- Backdrop -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="showLogoutModal = false">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"></div>
      </div>

      <!-- Modal Dialog -->
      <div
        class="inline-block relative z-10 align-middle bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-md sm:w-full border border-slate-100 p-6">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-2xl bg-red-50 text-red-600">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-slate-900">Xác nhận đăng xuất</h3>
            <p class="text-sm text-slate-500 mt-1">Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?</p>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-end space-x-3">
          <button
            type="button"
            class="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            @click="showLogoutModal = false">
            Hủy bỏ
          </button>
          <button
            type="button"
            class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-sm font-semibold text-white shadow-xs transition-colors cursor-pointer"
            @click="confirmLogout">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const toast = useToast()
const router = useRouter()
const route = useRoute()
const emit = defineEmits(['open-chat', 'show-login', 'scrollToSection', 'logout'])

// --- Props ---
const props = defineProps({
  user: {
    type: Object,
    default: () => null
  }
})

const mobileMenuOpen = ref(false)
const userDropdownOpen = ref(false)
const notificationDropdownOpen = ref(false)
const showLogoutModal = ref(false)

// Toggle User dropdown
const toggleUserDropdown = () => {
  userDropdownOpen.value = !userDropdownOpen.value
  notificationDropdownOpen.value = false
  mobileMenuOpen.value = false
}

// Toggle Notification dropdown
const toggleNotificationDropdown = () => {
  notificationDropdownOpen.value = !notificationDropdownOpen.value
  userDropdownOpen.value = false
  mobileMenuOpen.value = false
  if (notificationDropdownOpen.value) {
    loadNotifications()
  }
}

// User display helpers
const isLoggedIn = computed(() => {
  return !!(props.user && (props.user.id || props.user.username))
})

const userDisplayName = computed(() => {
  if (!isLoggedIn.value) return ''
  if (Array.isArray(props.user.fullname)) return props.user.fullname.join(' ')
  return props.user.fullname || props.user.username || 'Người dùng'
})

const userInitial = computed(() => {
  const name = userDisplayName.value
  return name && name.length > 0 ? name.charAt(0).toUpperCase() : 'U'
})

// Safe role checking (supports string 'ROLE_MANAGER' or object {code: 'ROLE_MANAGER'} or without ROLE_ prefix)
const hasRole = (role) => {
  if (!isLoggedIn.value || !props.user || !props.user.roles) return false
  const roles = Array.isArray(props.user.roles) ? props.user.roles : [props.user.roles]
  const cleanTarget = role.replace(/^ROLE_/, '').toUpperCase()
  return roles.some(r => {
    if (typeof r === 'string') {
      const cleanR = r.replace(/^ROLE_/, '').toUpperCase()
      return cleanR === cleanTarget
    }
    if (typeof r === 'object' && r !== null) {
      const code = (r.code || r.name || '').replace(/^ROLE_/, '').toUpperCase()
      return code === cleanTarget
    }
    return false
  })
}

const isNormalUser = computed(() => {
  return !hasRole('ROLE_ADMIN')
      && !hasRole('ROLE_MANAGER')
      && !hasRole('ROLE_STAFF')
      && !hasRole('ROLE_SELLER')
})

const handleAdminClick = () => {
  userDropdownOpen.value = false
  mobileMenuOpen.value = false
}

// Notification states
const notifications = ref([])
const loadingNotifications = ref(false)
const unreadNotifications = ref(0)
const sellerRequestStatus = ref(null)
const hasSellerRequest = ref(false)

const loadNotifications = async () => {
  if (!props.user) return

  loadingNotifications.value = true
  try {
    await checkSellerRequestStatus()

    const response = await axios.get('/api/user/notifications', {
      headers: getAuthHeaders()
    })

    notifications.value = response.data || []
    unreadNotifications.value = notifications.value.filter(n => !n.read).length

    if (sellerRequestStatus.value === 'PENDING') {
      addSellerRequestNotification()
    }
  } catch (error) {
    console.error('Error loading notifications:', error)
  } finally {
    loadingNotifications.value = false
  }
}

const checkSellerRequestStatus = async () => {
  try {
    const response = await axios.get('/api/user/seller-request/status', {
      headers: getAuthHeaders()
    })

    sellerRequestStatus.value = response.data?.status
    hasSellerRequest.value = response.data?.hasRequest

    if (sellerRequestStatus.value === 'PENDING') {
      unreadNotifications.value = Math.max(1, unreadNotifications.value)
    }
  } catch (error) {
    console.error('Error checking seller request status:', error)
  }
}

const addSellerRequestNotification = () => {
  const existingNotification = notifications.value.find(n => n.type === 'SELLER_REQUEST')

  if (!existingNotification) {
    notifications.value.unshift({
      id: 'seller-request-' + Date.now(),
      type: 'SELLER_REQUEST',
      title: 'Yêu cầu trở thành Seller',
      message: 'Yêu cầu của bạn đang được xem xét. Chúng tôi sẽ thông báo khi có kết quả.',
      createdAt: new Date().toISOString(),
      read: false,
      data: { requestId: sellerRequestStatus.value }
    })
  }
}

const markAllAsRead = async () => {
  try {
    await axios.post('/api/user/notifications/mark-all-read', {}, {
      headers: getAuthHeaders()
    })

    notifications.value = notifications.value.map(n => ({ ...n, read: true }))
    unreadNotifications.value = 0
  } catch (error) {
    console.error('Error marking notifications as read:', error)
  }
}

const handleNotificationClick = (notification) => {
  if (!notification.read) {
    markNotificationAsRead(notification.id)
  }

  switch (notification.type) {
    case 'SELLER_REQUEST':
      router.push('/profile?tab=seller-requests')
      break
    case 'NEW_MESSAGE':
      emit('open-chat', notification.data?.chatId)
      break
  }

  notificationDropdownOpen.value = false
}

const markNotificationAsRead = async (notificationId) => {
  try {
    await axios.put(`/api/user/notifications/${notificationId}/read`, {}, {
      headers: getAuthHeaders()
    })

    const index = notifications.value.findIndex(n => n.id === notificationId)
    if (index !== -1) {
      notifications.value[index].read = true
      unreadNotifications.value = Math.max(0, unreadNotifications.value - 1)
    }
  } catch (error) {
    console.error('Error marking notification as read:', error)
  }
}

const viewAllNotifications = () => {
  router.push('/notifications')
  notificationDropdownOpen.value = false
  mobileMenuOpen.value = false
}

const getNotificationIcon = (type) => {
  const icons = {
    'SELLER_REQUEST': 'S',
    'NEW_MESSAGE': 'M',
    'SYSTEM': '⚙️',
    'INFO': 'i',
    'SUCCESS': '✓',
    'WARNING': '⚠️',
    'ERROR': '✕'
  }
  return icons[type] || '●'
}

const getNotificationIconClass = (type) => {
  const classes = {
    'SELLER_REQUEST': 'bg-purple-100 text-purple-600',
    'NEW_MESSAGE': 'bg-blue-100 text-blue-600',
    'SYSTEM': 'bg-gray-100 text-gray-600',
    'INFO': 'bg-blue-100 text-blue-600',
    'SUCCESS': 'bg-emerald-100 text-emerald-600',
    'WARNING': 'bg-yellow-100 text-yellow-600',
    'ERROR': 'bg-red-100 text-red-600'
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Vừa xong'
  if (diffMins < 60) return `${diffMins} phút trước`
  if (diffHours < 24) return `${diffHours} giờ trước`
  if (diffDays < 7) return `${diffDays} ngày trước`

  return date.toLocaleDateString('vi-VN')
}

// --- Seller Request Functions ---
const registerAsSeller = () => {
  router.push('/become-seller')
  userDropdownOpen.value = false
  mobileMenuOpen.value = false
}

const getSellerStatusText = (status) => {
  const statusMap = {
    'PENDING': 'Đang chờ duyệt',
    'APPROVED': 'Đã trở thành Seller',
    'REJECTED': 'Yêu cầu bị từ chối',
    'NONE': 'Chưa đăng ký'
  }
  return statusMap[status] || status
}

const getSellerStatusClass = (status) => {
  const classes = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'APPROVED': 'bg-emerald-100 text-emerald-800',
    'REJECTED': 'bg-red-100 text-red-800',
    'NONE': 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// --- Logout ---
const logout = () => {
  showLogoutModal.value = true
  userDropdownOpen.value = false
  notificationDropdownOpen.value = false
}

const confirmLogout = async () => {
  try {
    await axios.post('/api/auth/logout')
  } catch (e) {
    // ignore
  }
  localStorage.removeItem('token')
  localStorage.removeItem('currentUser')
  localStorage.removeItem('user')
  localStorage.removeItem('authToken')
  localStorage.removeItem('access_token')
  localStorage.removeItem('favorites')
  localStorage.removeItem('hiderai_chat_history')
  localStorage.setItem('justLoggedOut', 'true')
  showLogoutModal.value = false
  emit('logout')
  window.location.href = '/'
}

onMounted(() => {
  const justLoggedOut = localStorage.getItem('justLoggedOut')
  if (justLoggedOut === 'true') {
    toast.success('Bạn đã đăng xuất thành công!')
    localStorage.removeItem('justLoggedOut')
  }

  if (props.user) {
    checkSellerRequestStatus()
  }
})

// Watch for user changes
watch(() => props?.user, (newUser) => {
  if (newUser) {
    checkSellerRequestStatus()
  } else {
    notifications.value = []
    unreadNotifications.value = 0
    sellerRequestStatus.value = null
    hasSellerRequest.value = false
  }
}, { immediate: true })

// --- Menu toggle ---
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
    userDropdownOpen.value = false
    notificationDropdownOpen.value = false
  } else {
    document.body.style.overflow = ''
  }
}

const login = () => {
  mobileMenuOpen.value = false
  userDropdownOpen.value = false
  notificationDropdownOpen.value = false
  document.body.style.overflow = ''
  emit('show-login')
}

const openChat = (type) => {
  emit('open-chat', type)
}

const resetScroll = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// --- Scroll các section ---
const scrollToOffsetElement = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const header = document.querySelector('nav')
    const offset = element.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 64) - 20
    window.scrollTo({ top: offset, behavior: 'smooth' })
  }
}

const getAvatarUrl = (avatarPath) => {
  if (!avatarPath) {
    return "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  }
  if (avatarPath.startsWith("http")) {
    return avatarPath
  }
  return `${avatarPath}`
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token') || ''
  return {
    'Authorization': `Bearer ${token}`
  }
}

const scrollTopropertylist = () => scrollToOffsetElement('property-section')
const scrollTestimonials = () => scrollToOffsetElement('TestimonialsSection')
const scrollContactSection = () => scrollToOffsetElement('ContactSection')
const scrollAgentsSection = () => scrollToOffsetElement('agent-section')

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const goToHomeAndScrollContactSection = async () => {
  if (route.path !== '/') {
    await router.push({ path: '/', query: { scrollTo: 'contact' } })
    await delay(500)
  }
  scrollContactSection()
}

const goToHomeAndScrolllTopropertylist = async () => {
  if (route.path !== '/') {
    await router.push({ path: '/', query: { scrollTo: 'propertylist' } })
    await delay(500)
  }
  scrollTopropertylist()
}

const goToHomeAndScrollTestimonials = async () => {
  if (route.path !== '/') {
    await router.push({ path: '/', query: { scrollTo: 'testimonials' } })
    await delay(500)
  }
  scrollTestimonials()
}

const goToHomeAndScrolllAgentsSection = async () => {
  if (route.path !== '/') {
    await router.push({ path: '/', query: { scrollTo: 'agents' } })
    await delay(500)
  }
  scrollAgentsSection()
}
</script>

<style scoped>
.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>