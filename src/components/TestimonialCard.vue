<template>
  <div class="h-full bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 flex flex-col justify-between">
    <div>
      <!-- Rating Stars -->
      <div class="flex items-center gap-1 mb-4">
        <svg 
          v-for="i in 5" 
          :key="i" 
          class="w-4 h-4 fill-amber-400 text-amber-400" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      </div>

      <!-- Testimonial Quote -->
      <p class="text-slate-600 text-sm leading-relaxed mb-6 italic">
        "{{ testimonial.comment }}"
      </p>
    </div>

    <!-- Author Info -->
    <div class="flex items-center pt-4 border-t border-slate-100">
      <img 
        :src="testimonial.avatar" 
        :alt="testimonial.name" 
        class="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-xs"
      />
      <div class="ml-3.5">
        <h4 class="font-bold text-sm text-slate-900">{{ testimonial.name }}</h4>
        <p class="text-xs text-emerald-700 font-medium">{{ testimonial.position }}</p>
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