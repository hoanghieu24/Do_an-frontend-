<template>
  <footer class="bg-slate-950 text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
        
        <!-- Brand Column -->
        <div class="md:col-span-4 lg:col-span-4">
          <div class="mb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-2xl font-extrabold text-white tracking-tight">
                HIDER<span class="text-emerald-400 font-bold ml-1">VERSE</span>
              </span>
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed max-w-sm">
              Hệ sinh thái quản lý và kết nối thuê bất động sản văn phòng cao cấp. Tiên phong áp dụng mô hình khảo sát thực tế ảo VR 360° mang đến trải nghiệm minh bạch và tối ưu chi phí cho doanh nghiệp.
            </p>
          </div>

          <div class="flex items-center space-x-3 text-slate-400">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Hỗ trợ 24/7 qua Hotline & Zalo</span>
          </div>
        </div>

        <!-- Links Column -->
        <div class="md:col-span-3 lg:col-span-3">
          <h4 class="text-sm font-bold uppercase tracking-wider text-slate-200 mb-5">
            Danh mục tra cứu
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li v-for="link in links" :key="link.name">
              <router-link :to="link.href" class="text-slate-400 hover:text-emerald-400 transition-colors">
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Column -->
        <div class="md:col-span-5 lg:col-span-5">
          <h4 class="text-sm font-bold uppercase tracking-wider text-slate-200 mb-5">
            Thông tin liên hệ
          </h4>

          <ul class="space-y-3.5 text-sm text-slate-400">
            <li class="flex items-start">
              <svg class="w-5 h-5 mr-3 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Trụ sở: Tòa nhà Hider Building, TP. Vinh & TP. Hồ Chí Minh</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="font-mono text-white font-semibold">(+84) 0867 198 647 (Mr. Hiếu)</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>hvan8677@gmail.com</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Giờ làm việc: Thứ 2 - Thứ 7 (8:00 - 18:00)</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-slate-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <p>
          © 2025 - 2026 <span class="text-slate-300 font-semibold">Hiderverse Real Estate</span>. Đồ án tốt nghiệp hệ thống quản lý & khảo sát Bất động sản VR 360°.
        </p>

        <div class="flex flex-wrap items-center gap-6">
          <span v-for="(item, index) in footerLinks" :key="index" class="hover:text-slate-300 cursor-pointer transition-colors">
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const links = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Danh sách tòa nhà', href: '/PropertyList' },
  { name: 'Khảo sát Tour VR 360°', href: '/PropertyList' },
  { name: 'Chuyên viên môi giới', href: '/#agents-section' },
  { name: 'Đăng ký tư vấn', href: '/#contact-section' }
]

const footerLinks = [
  'Chính sách bảo mật',
  'Điều khoản dịch vụ',
  'Quy trình khảo sát VR',
  'Hỗ trợ khách thuê'
]
</script>