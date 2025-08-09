<template>
  <div class="relative h-full group">
    <!-- Glow effect background -->
    <div class="absolute -inset-1 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl blur opacity-0 group-hover:opacity-40 transition-all duration-300"></div>
    
    <!-- Card content -->
    <div class="relative h-full bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      <!-- Decorative corner accent -->
      <div class="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-bl-full transform translate-x-6 -translate-y-6"></div>
      
      <!-- Rating stars with animated pulse -->
      <div class="flex mb-5">
        <svg 
          v-for="i in 5" 
          :key="i" 
          class="w-5 h-5 transform hover:scale-110 transition-transform" 
          :class="i <= testimonial.rating ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-200'" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      </div>

      <!-- Testimonial quote with decorative quotes -->
      <p class="text-gray-600 mb-6 relative pl-6 italic">
        <span class="absolute top-0 left-0 text-3xl text-indigo-100 font-serif leading-none">"</span>
        {{ testimonial.comment }}
      </p>

      <!-- Author info with better spacing -->
      <div class="flex items-center">
        <div class="relative">
          <img 
            :src="testimonial.avatar" 
            :alt="testimonial.name" 
            class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
          >
          <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div class="ml-4">
          <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
          <p class="text-indigo-600 text-sm">{{ testimonial.position }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  testimonial: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* Smooth hover elevation effect */
.group:hover .group-hover\:shadow-lg {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Animation for stars */
svg {
  transition: all 0.2s ease;
}
</style>