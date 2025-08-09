<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow text-center">
      <img :src="agent.avatar" :alt="agent.name" class="w-full h-64 object-cover">
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-900">{{ agent.name }}</h3>
        <p class="text-indigo-600">{{ agent.position }}</p>
        <div class="flex justify-center mt-4">
          <div class="flex items-center text-gray-600 mr-4">
            <svg class="w-5 h-5 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{{ agent.rating }}</span>
          </div>
          <div class="flex items-center text-gray-600">
            <svg class="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ agent.deals }} giao dịch</span>
          </div>
        </div>
        <button 
          @click="$emit('contact', agent.id)"
          class="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors w-full"
        >
          Liên hệ
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    agent: {
      type: Object,
      required: true
    }
  })
  
  defineEmits(['contact'])
  </script>