<template>
  <section id="agent-section" class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200/80">
    <div class="max-w-7xl mx-auto">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-3 border border-emerald-200/60">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Đội ngũ chuyên môn</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chuyên Viên Môi Giới & Tư Vấn Dự Án
        </h2>
        <p class="text-slate-500 text-sm md:text-base leading-relaxed">
          Đội ngũ chuyên gia am hiểu thị trường, hỗ trợ khách hàng từ giai đoạn khảo sát Tour VR 360°, đàm phán hợp đồng đến bàn giao mặt bằng hoàn thiện.
        </p>
      </div>

      <!-- Agent Grid -->
      <div class="flex flex-wrap justify-center gap-7">
        <div 
          v-for="agent in agents" 
          :key="agent.id"
          class="w-full sm:w-72 lg:w-80 flex"
        >
          <AgentCard :agent="agent" @contact="openChat" class="w-full" />
        </div>
      </div>

      <!-- Trust Indicators -->
      <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-16 pt-10 border-t border-slate-200 text-slate-600 text-xs sm:text-sm font-semibold">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            ✓
          </div>
          <span>Chứng chỉ hành nghề BĐS hợp pháp</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            ✓
          </div>
          <span>Hỗ trợ khảo sát thực địa & VR 360°</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            ✓
          </div>
          <span>Bảo mật tuyệt đối thông tin khách thuê</span>
        </div>
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