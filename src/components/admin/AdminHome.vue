<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Backdrop (Mobile) -->
    <div v-if="!sidebarOpen && isMobile" @click="closeSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden transition-opacity duration-300"></div>

    <!-- Sidebar -->
    <div :class="[
      sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      'fixed md:relative z-20 w-72 bg-gradient-to-b from-indigo-900 via-indigo-800 to-purple-900 text-white transition-all duration-300 ease-in-out transform shadow-2xl'
    ]">
      <!-- Header Sidebar -->
      <div class="flex items-center justify-start h-20 px-6 border-b border-indigo-700 mt-20">
        <div class="flex items-center space-x-2">
          <img src="@/assets/logo.png" alt="Logo"
            class="w-24 h-24 mr-2 transition-transform duration-300 group-hover:scale-110 filter brightness-0 invert" />

          <span
            class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-cyan-300 tracking-tight">HiderAdmin</span>
        </div>
      </div>

      <!-- Collapse Button - ĐÃ SỬA TRIỆT ĐỂ -->
      <button @click.stop="toggleSidebar"
        class="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg z-30 transition-all hover:scale-110 hover:shadow-xl border-2 border-white">
        <svg :class="{ 'rotate-180': !sidebarOpen }" xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Sidebar Content -->
      <div class="px-4 py-6 h-[calc(100%-5rem)] flex flex-col">
        <!-- User Profile -->
        <div
          class="flex items-center mb-8 p-3 rounded-sm bg-indigo-700 bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 cursor-pointer group border border-indigo-600 border-opacity-30 hover:border-opacity-50 shadow-md hover:shadow-lg">
          <img :src="getAvatarUrl(currentUser.avatar) || '/img/Hoang_Hieu.png'" alt="Avatar"
            class="w-14 h-14 rounded-full border-2 border-indigo-400 shadow-md ring-2 ring-indigo-500/30 hover:scale-105 transition-transform duration-300" />


          <div class="ml-3 overflow-hidden flex-1">
            <p class="text-sm font-semibold truncate">{{ currentUser.name }}</p>
            <p class="text-xs text-indigo-200 truncate mt-1">{{ displayRole }}</p>
            <p class="text-sm font-semibold truncate">{{ currentUser.username }}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-2 text-indigo-300 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>

        <!-- Menu -->
        <nav class="flex-1">
          <div class="space-y-2">
            <router-link :to="{ name: 'AdminDashboard' }" @click="handleMobileMenuClick"
              class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden"
              :class="isActive('/admin-dashboard') ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white hover:shadow-md'">
              <div
                class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Dashboard
              <span v-if="isActive('/admin-dashboard')"
                class="ml-auto h-2 w-2 rounded-full bg-cyan-300 animate-pulse"></span>
            </router-link>
            <router-link v-if="currentUser.role !== 'ROLE_STAFF'" :to="{ name: 'SellerRequest' }" @click="handleMobileMenuClick"
              class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden"
              :class="isActive('/seller-request') ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white hover:shadow-md'">
              <div
                class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Duyệt Người dùng
              <span v-if="isActive('/seller-request')"
                class="ml-auto h-2 w-2 rounded-full bg-cyan-300 animate-pulse"></span>
            </router-link>
            <router-link :to="{ name: 'ManagerBuilding' }" @click="handleMobileMenuClick"
              class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden"
              :class="isActive('/manager-building') ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white hover:shadow-md'">
              <div
                class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Quản lý tòa nhà
              <span v-if="isActive('/manager-building')"
                class="ml-auto h-2 w-2 rounded-full bg-cyan-300 animate-pulse"></span>
            </router-link>

            <router-link v-if="currentUser.role !== 'ROLE_STAFF'" :to="{ name: 'ManagerUser' }"
              @click="handleMobileMenuClick"
              class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden"
              :class="isActive('/manager-user') ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white hover:shadow-md'">
              <div
                class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              Quản lý Người Dùng
              <span v-if="isActive('/manager-user')"
                class="ml-auto h-2 w-2 rounded-full bg-cyan-300 animate-pulse"></span>
            </router-link>

            <router-link :to="{ name: 'customerManager' }" @click="handleMobileMenuClick"
              class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden"
              :class="isActive('/customer-manager') ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white hover:shadow-md'">
              <div
                class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Quản lý Khách Hàng
              <span v-if="isActive('/customer-manager')"
                class="ml-auto h-2 w-2 rounded-full bg-cyan-300 animate-pulse"></span>
            </router-link>

            <router-link :to="{ name: 'contracts' }" @click="handleMobileMenuClick"
              class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden"
              :class="isActive('/contracts') ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white hover:shadow-md'">
              <div
                class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Quản lý Hợp đồng
              <span v-if="isActive('/contracts')" class="ml-auto h-2 w-2 rounded-full bg-cyan-300 animate-pulse"></span>
            </router-link>

            <router-link :to="{ name: 'vr360' }" @click="handleMobileMenuClick"
              class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden"
              :class="isActive('/vr360') ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white hover:shadow-md'">
              <div
                class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Quản lý VR360
              <span v-if="isActive('/contracts')" class="ml-auto h-2 w-2 rounded-full bg-cyan-300 animate-pulse"></span>
            </router-link>
          

            <router-link to="profile" @click="handleMobileMenuClick"
              class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden"
              :class="isActive('/profile') ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white hover:shadow-md'">
              <div
                class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Hồ sơ cá nhân
              <span v-if="isActive('/profile')" class="ml-auto h-2 w-2 rounded-full bg-cyan-300 animate-pulse"></span>
            </router-link>
          </div>
        </nav>

        <!-- Footer/Settings -->
        <div class="mt-10 pt-4 border-t border-indigo-700 mb-20">
          <router-link to="/admin/setting" @click="handleMobileMenuClick"
            class="flex items-center w-full px-4 py-3 text-sm font-medium text-indigo-200 hover:text-white rounded-xl transition-all duration-300 hover:bg-indigo-700 mt-4 group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Cài đặt
            <svg xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>

      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="z-10 bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between h-20 px-6">
          <div class="flex items-center">
            <!-- Mobile menu button - ĐÃ SỬA -->
            <button @click="toggleSidebar"
              class="mr-4 text-gray-500 hover:text-indigo-600 transition-colors duration-300 md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 class="text-xl font-semibold text-gray-800 flex items-center">
              {{ currentRouteName }}
              <span
                class="ml-2 text-xs px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full font-medium shadow-sm">Admin</span>
            </h1>
          </div>

          <div class="flex items-center space-x-4">
            <button class="p-2 text-gray-500 hover:text-indigo-600 relative transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span
                class="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white shadow-sm"></span>
            </button>

            <div class="relative">
              <button @click="toggleUserDropdown" class="flex items-center space-x-2 focus:outline-none group">
                <div
                  class="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-sm font-bold text-white shadow-md ring-2 ring-white ring-opacity-50 group-hover:ring-opacity-100 transition-all duration-300">
                  {{ userInitials }}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-500 group-hover:text-indigo-600 transition-colors duration-300" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- User Dropdown -->
              <transition enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-150" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <div v-if="userDropdownOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-1 z-20 border border-gray-100 overflow-hidden">
                  <a href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-indigo-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Tài khoản của bạn
                  </a>
                  <a href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-indigo-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Cài đặt
                  </a>
                  <div class="border-t border-gray-100 my-1"></div>
                  <a href="#" @click="logout"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-indigo-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Đăng xuất
                  </a>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 md:p-6">
        <div class="bg-white rounded-2xl shadow-sm p-6 min-h-full border border-gray-100">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: true,
      userDropdownOpen: false,
      currentUser: {
        name: '',
        role: '',
        avatar: '',
        username: ''
      },
      isMobile: false
    }
  },
  computed: {
    userInitials() {
      return this.currentUser.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
    },
    currentRouteName() {
      return this.$route.name || 'Dashboard';
    },
    displayRole() {
      if (this.currentUser.role === 'ROLE_MANAGER') return 'Admin';
      if (this.currentUser.role === 'ROLE_STAFF') return 'Nhân viên';
      return this.currentUser.role;
    }
  },
  methods: {
    getAvatarUrl(avatarPath) {
      if (!avatarPath) {
        return "https://cdn-icons-png.flaticon.com/512/847/847969.png"
      }
      if (avatarPath.startsWith("http")) {
        return avatarPath
      }
      return `${avatarPath}`
    },

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },

    closeSidebar() {
      this.sidebarOpen = false
    },

    openSidebar() {
      this.sidebarOpen = true
    },

    handleMobileMenuClick() {
      if (this.isMobile) this.closeSidebar()
    },

    toggleUserDropdown() {
      this.userDropdownOpen = !this.userDropdownOpen
    },

    isActive(path) {
      return this.$route.path.startsWith(path)
    },

    closeUserDropdown(event) {
      if (!this.$el.contains(event.target)) {
        this.userDropdownOpen = false
      }
    },

    checkMobile() {
      this.isMobile = window.innerWidth < 768
    },

    loadCurrentUser() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        let name = user.fullname;

        if (Array.isArray(name)) {
          name = name.join(' ');
        } else if (typeof name === 'string' && name.startsWith('[')) {
          try {
            name = JSON.parse(name).join(' ');
          } catch { }
        }

        this.currentUser.name = name;
        this.currentUser.role = user.roles?.[0] || 'ROLE_USER';
        this.currentUser.avatar = user.avatar || '';
        this.currentUser.username = user.username || '';
      }
    },

    handleResize() {
      this.checkMobile();
      this.sidebarOpen = window.innerWidth >= 768;
    },

    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  },
  created() {
    this.loadCurrentUser();
    this.checkMobile();
    window.addEventListener('resize', this.handleResize);

    if (window.innerWidth < 768) this.sidebarOpen = false;
  },
  mounted() {
    document.addEventListener('click', this.closeUserDropdown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeUserDropdown);
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>


<style>
/* Smooth transitions */
.router-view-transition {
  transition: all 0.3s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Animation for active menu item */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Glow effect for sidebar */
.sidebar-glow {
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
}

/* Ensure smooth sidebar transitions */
.sidebar-transition {
  transition: transform 0.3s ease-in-out;
}

/* Mobile optimizations */
@media (max-width: 767px) {
  .sidebar-mobile {
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
  }
}

/* Fix for button events */
button {
  cursor: pointer;
}

/* Prevent text selection */
.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>