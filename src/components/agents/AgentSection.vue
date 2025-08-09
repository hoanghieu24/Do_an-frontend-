<template>
  <section id="agent-section" class="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/4 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float1"></div>
      <div class="absolute top-1/3 right-1/4 w-40 h-40 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float2"></div>
      <div class="absolute bottom-0 left-1/2 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float3"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section header with animation -->
      <div class="text-center mb-16 opacity-0 animate-fade-in" style="animation-delay: 0.2s">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Đội ngũ môi giới chuyên nghiệp
          </span>
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Những chuyên gia bất động sản giàu kinh nghiệm luôn sẵn sàng hỗ trợ bạn 24/7
        </p>
      </div>
      
      <!-- Agent grid with staggered animations -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(agent, index) in agents"
          :key="agent.id"
          class="opacity-0 animate-fade-in-up"
          :style="`animation-delay: ${0.3 + index * 0.1}s`"
        >
          <AgentCard 
            :agent="agent"
            @contact="openChat"
          />
        </div>
      </div>

      <!-- View all button -->
      <div class="text-center mt-12 opacity-0 animate-fade-in" style="animation-delay: 0.8s">
        <button
          @click="$emit('view-all')"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          Xem tất cả môi giới
          <svg class="ml-3 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
  
  <script setup>
  import AgentCard from './AgentCard.vue'
  
  defineProps({
    agents: {
      type: Array,
      required: true
    }
  })
  
  const emit = defineEmits(['contact'])
  
  const openChat = (agentId) => {
    emit('contact', agentId)
  }
  </script>

<style scoped>
/* Floating background elements */
@keyframes float1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(15px, 20px) rotate(5deg); }
}

@keyframes float2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-15px, 15px) rotate(-5deg); }
}

@keyframes float3 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(10px, -15px) rotate(3deg); }
}

.animate-float1 {
  animation: float1 15s ease-in-out infinite;
}

.animate-float2 {
  animation: float2 18s ease-in-out infinite;
}

.animate-float3 {
  animation: float3 12s ease-in-out infinite;
}

/* Fade in animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

/* Fade in up animation for cards */
@keyframes fadeInUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Gradient underline */
.gradient-underline {
  position: relative;
}

.gradient-underline::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 3px;
}
</style>