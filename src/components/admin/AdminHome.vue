<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Backdrop (Mobile) -->
    <div v-if="!sidebarOpen" @click="toggleSidebar" class="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"></div>

    <!-- Sidebar -->
    <div :class="[
      sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      'fixed md:relative z-20 w-72 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white transition-all duration-300 ease-in-out transform shadow-xl'
    ]">
      <!-- Header Sidebar -->
      <div class="flex items-center justify-start h-20 px-6 border-b border-indigo-700 mt-20">
        <div class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-indigo-300" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span
            class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-cyan-300">BuildingAdmin
            Pro</span>
        </div>
      </div>

      <!-- Collapse Button -->
      <button @click="toggleSidebar"
        class="absolute top-1/2 right-[-12px] transform -translate-y-1/2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-start shadow-lg z-30 transition-all hover:scale-110">
        <svg :class="{ 'rotate-180': !sidebarOpen }" xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Sidebar Content -->
      <div class="px-4 py-6 h-[calc(100%-5rem)] flex flex-col">
        <!-- User Profile -->
        <div
          class="flex items-center mb-8 p-3 rounded-lg bg-indigo-700 bg-opacity-30 hover:bg-opacity-50 transition-all cursor-pointer group">
          <div
            class="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-xl font-bold shadow-md">
            {{ userInitials }}
          </div>
          <div class="ml-3 overflow-hidden">
            <p class="text-sm font-medium truncate">{{ currentUser.name  }}</p>
                <p class="text-sm font-medium truncate">{{ currentUser.id || 1  }}</p>
            <p class="text-xs text-indigo-200 truncate">{{ displayRole }}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-auto text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>


        <!-- Menu -->
        <nav class="flex-1">
          <div class="space-y-1">


            <router-link :to="{ name: 'ManagerBuilding' }"
              class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all"
              :class="isActive('/manager-building') ? 'bg-indigo-700 text-white shadow-md' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white hover:shadow-md'">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Quản lý tòa nhà
              <span v-if="isActive('/manager-building')"
                class="ml-auto h-2 w-2 rounded-full bg-cyan-300 animate-pulse"></span>
            </router-link>

            <router-link to="/profile" class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all"
              :class="isActive('/profile') ? 'bg-indigo-700 text-white shadow-md' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white hover:shadow-md'">
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
          <button
            class="flex items-center w-full px-4 py-3 text-sm font-medium text-indigo-200 hover:text-white rounded-lg transition-all hover:bg-indigo-700 mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Cài đặt
          </button>
        </div>

      </div>
    </div>


    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="z-10 bg-white shadow-sm">
        <div class="flex items-center justify-start h-20 px-6">
          <div class="flex items-center">
            <button @click="toggleSidebar" class="mr-4 text-gray-500 hover:text-gray-700 md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 class="text-xl font-semibold text-gray-800 flex items-center">
              {{ currentRouteName }}
              <span class="ml-2 text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">Admin</span>
            </h1>
          </div>

          <div class="flex items-center space-x-4">
            <button class="p-2 text-gray-500 hover:text-gray-700 relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
            </button>

            <div class="relative">
              <button @click="toggleUserDropdown" class="flex items-center space-x-2 focus:outline-none">
                <div
                  class="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-start text-sm font-bold text-white shadow">
                  {{ userInitials }}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- User Dropdown -->
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <div v-if="userDropdownOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Tài khoản của bạn</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Cài đặt</a>
                  <div class="border-t border-gray-100"></div>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Đăng xuất</a>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
        <router-view />
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
        role: ''
      }
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
      return this.$route.id || 'Dashboard';
    },
    displayRole() {
      if (this.currentUser.role === 'ROLE_MANAGER') return 'Admin';
      if (this.currentUser.role === 'ROLE_STAFF') return 'Nhân viên';
      return this.currentUser.role;
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
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
    loadCurrentUser() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);

        // Nếu fullname bị [""] thì xử lý tại đây
        let name = user.fullname;
        if (Array.isArray(name)) {
          name = name.join(' ');
        } else if (typeof name === 'string' && name.startsWith('[')) {
          try {
            name = JSON.parse(name).join(' ');
          } catch {
            // fallback giữ nguyên nếu lỗi
          }
        }

        this.currentUser.name = name;
        this.currentUser.role = user.roles?.[0] || 'ROLE_USER';
      }
    }

  },
  created() {
    this.loadCurrentUser() // 🚀 Gọi trước khi render
  },
  mounted() {
    document.addEventListener('click', this.closeUserDropdown)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeUserDropdown)
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
</style>