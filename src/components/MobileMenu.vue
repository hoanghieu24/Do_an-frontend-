<template>
  <transition name="slide">
    <div v-if="isOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 md:hidden">
      <div class="flex items-center justify-end h-20 px-4">
        <button @click="$emit('close')" class="text-white">
          <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="bg-white h-full p-4">
        <div class="flex flex-col space-y-4">
          <!-- Dùng phương thức handleNavClick để đợi chuyển route rồi mới đóng menu -->
          <router-link 
            v-for="item in navItems" 
            :key="item.name" 
            :to="item.href"
            class="text-gray-700 hover:text-indigo-600 px-3 py-2 text-lg font-medium"
            @click="handleNavClick(item)"  
          >
            {{ item.name }}
          </router-link>
          <button 
            @click="$emit('close'); $emit('openChat')"
            class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Chat với môi giới
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isOpen: Boolean
})

defineEmits(['close', 'openChat'])

const navItems = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Bất động sản', href: '/properties' },
  { name: 'Môi giới', href: '/agents' },
  { name: 'Về chúng tôi', href: '/about' },
  { name: 'Liên hệ', href: '/contact' },
]

// Thêm một phương thức handleNavClick để xử lý chuyển route
const handleNavClick = (item) => {
  if (!item || !item.href) return
  // Đóng menu trước khi chuyển trang
  $emit('close')
  // Chuyển route
  router.push(item.href)
}
</script>
