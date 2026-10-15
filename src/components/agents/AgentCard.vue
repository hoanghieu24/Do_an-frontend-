<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between">
    <div>
      <!-- Ảnh chân dung -->
      <div class="relative h-64 w-full overflow-hidden bg-slate-100">
        <img 
          :src="agent.avatar" 
          :alt="agent.name" 
          class="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
        <div class="absolute bottom-3 left-3 text-white">
          <span class="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
            {{ agent.position || 'Chuyên viên tư vấn' }}
          </span>
        </div>
      </div>

      <!-- Thông tin chuyên viên -->
      <div class="p-5">
        <h3 class="text-base font-bold text-slate-900 mb-1">{{ agent.name }}</h3>
        
        <!-- Đánh giá và số giao dịch -->
        <div class="flex items-center justify-between text-xs text-slate-500 pt-2 pb-4 border-b border-slate-100">
          <div class="flex items-center text-amber-500 font-semibold">
            <svg class="w-4 h-4 mr-1 fill-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{{ agent.rating || '5.0' }}</span>
          </div>
          <div class="flex items-center text-slate-600 font-medium">
            <svg class="w-3.5 h-3.5 mr-1 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ agent.deals || '20+' }} giao dịch</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Button -->
    <div class="p-5 pt-0">
      <button 
        @click="$emit('contact', agent.id)"
        class="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
      >
        <svg class="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span>Liên hệ chuyên viên</span>
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