<template>
  <nav
    class="w-full fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all duration-500 border-b border-indigo-100/30 hover:shadow-lg">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo với hiệu ứng tinh tế -->
        <router-link to="/" class="text-xl font-bold flex items-center group" @click="resetScroll">
          <span class="flex items-center">
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-300">
              <span class="inline-block transition-transform duration-300 group-hover:scale-110">Hider</span>
              <span class="inline-block transition-transform duration-300 group-hover:scale-105">verse</span>
            </span>
            <span
              class="ml-1.5 w-2 h-2 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </span>
        </router-link>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-1">
          <button v-for="item in navItems" :key="item.label" @click="handleNavClick(item.action)"
            class="relative group px-3 py-2 rounded-lg transition-all duration-200"
            :class="{ 'text-gray-700 hover:text-indigo-600': !item.highlight, 'text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600': item.highlight }">
            <span class="relative z-10 flex items-center">
              <span class="font-medium">{{ item.label }}</span>
              <svg v-if="item.icon" class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
              </svg>
            </span>
            <span v-if="!item.highlight"
              class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full group-hover:w-4/5 transition-all duration-300"></span>
          </button>
          <!-- Menu Desktop -->
          <div class="hidden md:flex space-x-6 ml-12">
            <button @click="goToHomeAndScrolllTopropertylist"
              class="relative group text-gray-600 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition duration-300">
              <span class="relative z-10">Bất động sản</span>
              <span
                class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full group-hover:w-4/5 transition-all duration-500"></span>
            </button>

            <button @click="goToHomeAndScrolllAgentsSection"
              class="relative group text-gray-600 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition duration-300">
              <span class="relative z-10">Môi giới</span>
              <span
                class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full group-hover:w-4/5 transition-all duration-500"></span>
            </button>

            <button @click="goToHomeAndScrollTestimonials"
              class="relative group text-gray-600 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition duration-300">
              <span class="relative z-10">Giới Thiệu</span>
              <span
                class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full group-hover:w-4/5 transition-all duration-500"></span>
            </button>



            <button @click="goToHomeAndScrollContactSection"
              class="relative group text-gray-600 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition duration-300">
              <span class="relative z-10">Liên Hệ</span>
              <span
                class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full group-hover:w-4/5 transition-all duration-500"></span>
            </button>

            <button @click="resetScroll">
              <router-link v-if="props.user" to="/favorites"
                class="relative group text-gray-600 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition duration-300">
                <span class="relative z-10">Yêu thích</span>
                <span
                  class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full group-hover:w-4/5 transition-all duration-500"></span>
              </router-link>
            </button>

          </div>
        </div>

        <!-- User Actions -->
        <div class="flex items-center space-x-2">
          <!-- Nút chat -->
          <button @click="openChat('support')"
            class="p-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:shadow-md relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <!-- Chưa đăng nhập -->
          <template v-if="!props.user">
            <button @click="login"
              class="hidden md:inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-sm hover:shadow-md">
              <span class="mr-2 font-medium">Đăng nhập</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14" />
              </svg>
            </button>
          </template>

          <!-- Đã đăng nhập -->
          <template v-else>
            <div class="relative group">
              <button @click="toggleUserDropdown"
                class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                <!-- Avatar với gradient đẹp hơn -->
                <div
                  class="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium shadow-sm">
                  {{ props.user.fullname.charAt(0) }}
                </div>

                <!-- Tên user với hiệu ứng -->
                <span
                  class="font-medium text-gray-700 hidden lg:inline-block group-hover:text-indigo-600 transition-colors duration-200">
                  {{ props.user.fullname.split(' ')[0] }}
                  <span
                    class="block h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-0.5"></span>
                </span>

                <!-- Icon mũi tên với hiệu ứng -->
                <svg class="w-4 h-4 text-gray-500 group-hover:text-indigo-500 transform transition-all duration-200"
                  :class="{ 'rotate-180': userDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown User với thiết kế đẹp hơn -->
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95 -translate-y-2"
                enter-to-class="transform opacity-100 scale-100 translate-y-0"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100 translate-y-0"
                leave-to-class="transform opacity-0 scale-95 -translate-y-2">
                <div v-if="userDropdownOpen"
                  class="absolute right-0 mt-2 w-64 origin-top-right bg-white rounded-xl shadow-xl ring-1 ring-gray-200 focus:outline-none z-50 divide-y divide-gray-100 overflow-hidden">
                  <!-- Header dropdown -->
                  <div class="px-5 py-4 bg-gradient-to-r from-indigo-50 to-purple-50">
                    <p class="text-sm font-semibold text-gray-900">{{ props.user.fullname }}</p>
                    <p class="text-xs text-gray-500 truncate mt-1">{{ props.user.email }}</p>
                  </div>

                  <!-- Menu items -->
                  <div class="py-1.5">
                    <router-link to="/profile"
                      class="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150 group">
                      <svg class="w-4 h-4 mr-3 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Trang cá nhân</span>
                    </router-link>

                    <div v-if="props.user.roles.includes('ROLE_MANAGER') || props.user.roles.includes('ROLE_STAFF')"
                      @click="handleAdminClick">
                      <router-link :to="{ name: 'AdminDashboard' }"
                        class="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150 group">

                        <svg class="w-4 h-4 mr-3 text-gray-400 group-hover:text-indigo-500 transition-colors"
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <!-- icon -->
                        </svg>
                        <span>Quản trị</span>
                        <span
                          class="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">Admin</span>
                      </router-link>
                    </div>

                  </div>

                  <!-- Logout button -->
                  <div class="py-1.5 bg-gray-50">
                    <button @click="logout"  
                      class="w-full flex items-center px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 group">
                      <svg class="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </template>

          <!-- Mobile Toggle -->
          <button @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200 focus:outline-none">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                :d="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-xl border-t border-gray-100">
        <div class="px-4 pt-2 pb-4 space-y-1">
          <button v-for="(item, index) in navItems" :key="index"
            @click="handleNavClick(item.action); mobileMenuOpen = false"
            class="w-full text-left block px-4 py-3 rounded-lg transition-colors duration-150"
            :class="{ 'text-gray-700 hover:bg-gray-50': !item.highlight, 'text-white bg-gradient-to-r from-indigo-500 to-purple-500': item.highlight }">
            <div class="flex items-center">
              <span class="font-medium">{{ item.label }}</span>
              <svg v-if="item.icon" class="ml-auto w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
              </svg>
            </div>
          </button>

          <div class="pt-2 border-t border-gray-200 mt-2">
            <template v-if="props.user">
              <div class="px-4 py-3 flex items-center space-x-3">
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                  {{ props.user.fullname.charAt(0) }}
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ props.user.fullname }}</p>
                  <p class="text-xs text-gray-500">{{ props.user.email }}</p>
                </div>
              </div>
              <button @click="logout; mobileMenuOpen = false"
                class="w-full text-left block px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150">
                Đăng xuất
              </button>
            </template>
            <template v-else>
              <button @click="login; mobileMenuOpen = false"
                class="w-full block px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium">
                Đăng nhập
              </button>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </nav>
  <transition name="modal-fade">
    <div v-if="showLogoutModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <transition name="fade">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900/70 backdrop-blur-sm" @click="showLogoutModal = false"></div>
          </div>
        </transition>

        <!-- Modal content -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div
          class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-6 py-5 sm:p-6">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Xác nhận đăng xuất</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">Bạn có chắc chắn muốn đăng xuất khỏi tài khoản hiện tại không?</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-2xl">
            <button type="button"
              class="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-base font-medium text-white hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 transform hover:scale-105 active:scale-95"
              @click="confirmLogout">
              Đăng xuất
            </button>
            <button type="button"
              class="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 hover:scale-105 active:scale-95"
              @click="showLogoutModal = false">
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()
const route = useRoute()
const emit = defineEmits(['open-chat', 'show-login', 'scrollToSection'])

const mobileMenuOpen = ref(false)
const userDropdownOpen = ref(false)
const showLogoutModal = ref(false)

// --- Logout ---
const confirmLogout = () => {
  localStorage.removeItem('currentUser')
  localStorage.setItem('justLoggedOut', 'true') 
  showLogoutModal.value = false
  window.location.reload()
}


onMounted(() => {
  const justLoggedOut = localStorage.getItem('justLoggedOut')
  if (justLoggedOut === 'true') {
    toast.success('Bạn đã đăng xuất thành công!')
    localStorage.removeItem('justLoggedOut')
  }
})

// --- Menu toggle ---
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
    userDropdownOpen.value = false
  } else {
    document.body.style.overflow = ''
  }
}

const toggleUserDropdown = () => {
  userDropdownOpen.value = !userDropdownOpen.value
  if (userDropdownOpen.value) {
    mobileMenuOpen.value = false
  }
}

// --- Navigation ---
const handleNavClick = (action) => {
  if (['propertyList', 'agents', 'about', 'contact'].includes(action)) {
    emit('scrollToSection', action)
  } else if (action === 'favorites') {
    router.push('/favorites')
  }
}

const login = () => {
  emit('show-login')
  resetScroll()
}

const logout = () => {
  showLogoutModal.value = true
  userDropdownOpen.value = false
  localStorage.removeItem('authToken')
  goToHomeAndScrolllTopropertylist()
}

const openChat = (type) => {
  emit('open-chat', type)
}

const resetScroll = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// --- Props ---
const props = defineProps({
  user: {
    type: Object,
    default: () => null
  }
})

// --- Scroll các section ---
const scrollToOffsetElement = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const header = document.querySelector('nav')
    const offset = element.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 20
    window.scrollTo({ top: offset, behavior: 'smooth' })
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
    await delay(1000)
    window.location.reload()
  } else {
    scrollContactSection()
  }
}

const goToHomeAndScrolllTopropertylist = async () => {
  if (route.path !== '/') {
    await router.push({ path: '/', query: { scrollTo: 'propertylist' } })
    await delay(1000)
    window.location.reload()
  } else {
    scrollTopropertylist()
  }
}

const goToHomeAndScrollTestimonials = async () => {
  if (route.path !== '/') {
    await router.push({ path: '/', query: { scrollTo: 'testimonials' } })
    await delay(1000)
    window.location.reload()
  } else {
    scrollTestimonials()
  }
}

const goToHomeAndScrolllAgentsSection = async () => {
  if (route.path !== '/') {
    await router.push({ path: '/', query: { scrollTo: 'agents' } })
    await delay(1000)
    window.location.reload()
  } else {
    scrollAgentsSection()
  }
}



function handleAdminClick() {
  alert("Đã bấm vào Quản trị rồi đấy!")
}
</script>


<style scoped>
/* Hiệu ứng nâng cao cho gradient */
.bg-gradient-to-r {
  background-size: 200% 200%;
  transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
}

.bg-gradient-to-r:hover {
  background-position: 100% 50%;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
}

/* Hiệu ứng cho logo */
.logo-text {
  position: relative;
  display: inline-block;
}

.logo-text::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  transition: width 0.4s ease;
}

.logo-text:hover::after {
  width: 100%;
}

/* Hiệu ứng đẹp hơn cho dropdown */
.dropdown-enter-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-15px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

/* Hiệu ứng nút chat nổi bật hơn */
.chat-button {
  box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3), 0 2px 4px -1px rgba(16, 185, 129, 0.2);
  transition: all 0.3s ease;
}

.chat-button:hover {
  transform: translateY(-3px) rotate(5deg);
  box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.4);
}

/* Hiệu ứng đẹp cho mobile menu */
.mobile-menu-enter-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Hiệu ứng đẹp cho modal */
.modal-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.36, 0.66, 0.04, 1);
}

.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Hiệu ứng khi scroll */
.scrolled-nav {
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(236, 239, 241, 0.7);
}
</style>