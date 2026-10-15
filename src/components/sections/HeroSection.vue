<template>
  <section class="relative w-full min-h-[92vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden pt-16">
    <!-- Background Image với hiệu ứng Dark Architectural Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        alt="Luxury Modern Architecture"
        class="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
      />
      <!-- Multi-layer gradient để chữ đọc siêu rõ nét và sang trọng -->
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/60"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
    </div>

    <!-- Architectural Grid Lines (tinh tế, mờ nhẹ) -->
    <div class="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:32px_32px]"></div>

    <!-- Main Hero Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
      <div class="max-w-3xl">
        
        <!-- Premium Brand Pill -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 backdrop-blur-md mb-6 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-xs font-semibold tracking-wider uppercase text-slate-300">
            Hider Real Estate · Khảo sát thực tế ảo 360°
          </span>
        </div>

        <!-- Headline chính -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          Khám Phá Không Gian Làm Việc <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
            & Tòa Nhà Đẳng Cấp
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-base sm:text-lg lg:text-xl text-slate-300 mb-10 leading-relaxed font-normal max-w-2xl">
          Nền tảng quản lý và kết nối thuê bất động sản văn phòng hàng đầu. Trực quan hóa từng góc nhìn với công nghệ
          <span class="text-emerald-400 font-semibold">Tour VR 360°</span> chân thực, giúp doanh nghiệp tiết kiệm 80% thời gian khảo sát thực địa.
        </p>

        <!-- CTA Buttons Row -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
          <!-- Button 1: Xem bất động sản -->
          <button
            @click="scrollTopropertylist"
            class="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-950/40 hover:shadow-emerald-900/60 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg class="w-5 h-5 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Khám phá danh mục tòa nhà</span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <!-- Button 2: Trải nghiệm VR 360 -->
          <button
            @click="openFlagshipVR"
            class="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-base border border-slate-700/80 backdrop-blur-md shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg class="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Trải nghiệm VR 360° mẫu</span>
          </button>

          <!-- Button 3: Tư vấn ngay -->
          <button
            @click="goToHomeAndScrollContactSection"
            class="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 font-medium text-base transition-colors"
          >
            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Tư vấn trực tiếp</span>
          </button>
        </div>

        <!-- Real Estate Trust Metrics Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
          <div class="border-l-2 border-emerald-500 pl-4 py-1">
            <div class="text-2xl sm:text-3xl font-extrabold text-white">15+</div>
            <div class="text-xs text-slate-400 uppercase tracking-wider font-medium mt-0.5">Tòa nhà tiêu biểu</div>
          </div>
          <div class="border-l-2 border-emerald-500 pl-4 py-1">
            <div class="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</div>
            <div class="text-xs text-slate-400 uppercase tracking-wider font-medium mt-0.5">Khảo sát VR 360°</div>
          </div>
          <div class="border-l-2 border-emerald-500 pl-4 py-1">
            <div class="text-2xl sm:text-3xl font-extrabold text-white">0 đ</div>
            <div class="text-xs text-slate-400 uppercase tracking-wider font-medium mt-0.5">Phí dịch vụ khách thuê</div>
          </div>
          <div class="border-l-2 border-emerald-500 pl-4 py-1">
            <div class="text-2xl sm:text-3xl font-extrabold text-white">24/7</div>
            <div class="text-xs text-slate-400 uppercase tracking-wider font-medium mt-0.5">Đồng hành pháp lý</div>
          </div>
        </div>

      </div>
    </div>

    <!-- Subtle Scroll Down Indicator -->
    <div
      class="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer z-10 text-slate-400 hover:text-white transition-colors"
      @click="scrollDown"
      title="Cuộn xuống"
    >
      <div class="flex flex-col items-center gap-1.5">
        <span class="text-[11px] tracking-widest uppercase font-medium">Cuộn xem</span>
        <svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const scrollDown = () => {
  window.scrollTo({
    top: window.innerHeight * 0.85,
    behavior: 'smooth'
  })
}

const openFlagshipVR = () => {
  // Mở VR của tòa nhà tiêu biểu (building 101 hoặc 1)
  window.open('/vtour/pannellum.html?buildingId=101', '_blank')
}

const goToHomeAndScrollContactSection = async () => {
  if (route.path !== '/') {
    await router.push({ path: '/', query: { scrollTo: 'contact' } })
    setTimeout(scrollContactSection, 500)
  } else {
    scrollContactSection()
  }
}

const scrollContactSection = () => {
  const element = document.getElementById('contact-section')
  if (element) {
    const header = document.querySelector('nav')
    const offset = element.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0) - 20
    window.scrollTo({ top: offset, behavior: 'smooth' })
  }
}

const scrollTopropertylist = () => {
  const element = document.getElementById('property-section') || document.getElementById('propertylist-section')
  if (element) {
    const header = document.querySelector('nav')
    const offset = element.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0) - 20
    window.scrollTo({ top: offset, behavior: 'smooth' })
  }
}
</script>