<template>
  <section id="TestimonialsSection" class="py-20 px-6 bg-white border-t border-slate-200/80 relative">
    <div class="max-w-7xl mx-auto">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-3 border border-emerald-200/60">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Đánh giá từ khách hàng</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Khách Hàng Doanh Nghiệp Nói Gì Về Chúng Tôi
        </h2>
        <p class="text-slate-500 text-sm md:text-base leading-relaxed">
          Những trải nghiệm thực tế và phản hồi khách quan từ các đối tác, doanh nghiệp đã đồng hành cùng Hider trong quá trình khảo sát và thuê văn phòng.
        </p>
      </div>
      
      <!-- Testimonial Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TestimonialCard 
          v-for="testimonial in testimonials" 
          :key="testimonial.id" 
          :testimonial="testimonial"
        />
      </div>

      <!-- Đối tác tin cậy -->
      <div class="mt-20 pt-12 border-t border-slate-100 text-center">
        <p class="text-xs uppercase tracking-widest text-slate-400 mb-8 font-bold">
          Đối tác doanh nghiệp & Chủ đầu tư tiêu biểu
        </p>
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-14">
          <div 
            v-for="(sponsor, i) in sponsors" 
            :key="i"
            class="group relative flex items-center justify-center p-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          >
            <img 
              :src="sponsor.logo" 
              :alt="sponsor.name" 
              class="max-h-10 md:max-h-12 w-auto object-contain"
            >
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { testimonials } from '../data/testimonials'
import TestimonialCard from './TestimonialCard.vue'

const sponsors = [
  { name: 'Vingroup', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Vingroup_logo.svg/320px-Vingroup_logo.svg.png' },
  { name: 'Bitexco', logo: 'https://upload.wikimedia.org/wikipedia/vi/thumb/9/90/Bitexco_Group_logo.png/300px-Bitexco_Group_logo.png' },
  { name: 'Novaland', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Novaland_Group_logo.svg/320px-Novaland_Group_logo.svg.png' },
  { name: 'Keppel Land', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Keppel_Corporation_logo.svg/320px-Keppel_Corporation_logo.svg.png' }
]
</script>