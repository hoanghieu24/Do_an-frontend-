<template>
  <button 
    v-show="isVisible"
    @click="scrollToTop"
    class="fixed bottom-6 left-6 p-3 bg-slate-900/90 hover:bg-slate-800 text-white rounded-full shadow-lg border border-slate-700/80 backdrop-blur-md transition-all duration-300 focus:outline-none z-50 hover:scale-105 active:scale-95"
    title="Lên đầu trang"
    aria-label="Back to top"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>