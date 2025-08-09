<template>
  <section id="TestimonialsSection" class="relative py-24 px-6 bg-gradient-to-b from-indigo-100/50 to-indigo-50/30 overflow-hidden">
    <!-- Floating 3D background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 left-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-float-slow"></div>
      <div class="absolute bottom-20 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-float-medium animation-delay-2000"></div>
      <div class="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-15 animate-float-fast animation-delay-4000"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Animated header -->
      <div class="text-center mb-20 animate-fade-in-up">
        <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          <span class="relative inline-block">
            <span class="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Khách hàng nói gì về chúng tôi
            </span>
            <span class="absolute bottom-0 left-0 w-full h-3 bg-indigo-200/50 rounded-full -z-0 animate-underline-expand"></span>
          </span>
        </h2>
        <p class="text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-100">
          Những phản hồi chân thực từ khách hàng đã sử dụng dịch vụ của chúng tôi
        </p>
      </div>
      
      <!-- 3D Testimonial Cards with Parallax Effect -->
      <div 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <TestimonialCard 
          v-for="(testimonial, index) in testimonials" 
          :key="testimonial.id" 
          :testimonial="testimonial"
          class="transition-all duration-500 ease-out transform hover:scale-[1.03] hover:shadow-xl hover:z-10"
          :style="{
            'transition-delay': `${index * 50}ms`,
            'animation-delay': `${index * 100}ms`,
            'transform-style': 'preserve-3d',
            'transform': 'perspective(1000px)'
          }"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
          data-aos-duration="600"
        />
      </div>

      <!-- Animated Trust Badges -->
      <div class="mt-20 text-center animate-fade-in-up animation-delay-300">
        <p class="text-sm uppercase tracking-wider text-gray-500 mb-8 font-medium">
          <span class="inline-block relative">
            Được tin tưởng bởi
            <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-300/50 animate-line-expand origin-left"></span>
          </span>
        </p>
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div 
            v-for="(sponsor, i) in sponsors" 
            :key="i"
            class="group relative w-40 h-20 flex items-center justify-center transform transition-all duration-500 hover:-translate-y-2"
            data-aos="zoom-in"
            :data-aos-delay="i * 100 + 300"
          >
            <!-- 3D Logo with Hover Effect -->
            <div class="relative w-full h-full flex items-center justify-center perspective-1000">
              <div class="relative w-full h-full transition-all duration-700 group-hover:rotate-y-20">
                <img 
                  :src="sponsor.logo" 
                  :alt="sponsor.name" 
                  class="max-h-12 md:max-h-16 w-auto opacity-80 group-hover:opacity-100 transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:drop-shadow-lg"
                >
              </div>
            </div>
            
            <!-- Animated Tooltip -->
            <span class="absolute bottom-full mb-3 hidden group-hover:block px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md whitespace-nowrap shadow-lg animate-tooltip-fade">
              {{ sponsor.name }}
              <span class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-gray-900 border-l-transparent border-r-transparent"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { testimonials } from '../data/testimonials';
import TestimonialCard from './TestimonialCard.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { onMounted } from 'vue';

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-quart',
    once: true,
    offset: 50
  });
});

const sponsors = [
  {
    name: "CLB CHELSEA",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/640px-Chelsea_FC.svg.png"
  },
  {
    name: "KTS GROUP",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-tw6vzNkPwZhMmKWEXYmsuqHT9RzJ3zqDmA&s"
  },
  {
    name: "Ngân hàng Techcombank",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMxEk9d0Cczb9L6GQooIVyd3eq7AFzBu0K5g&s"
  },
  {
    name: "Tập đoàn FPT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/1200px-FPT_logo_2010.svg.png"
  }
];
</script>

<style scoped>
/* Floating background animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

.animate-float-slow {
  animation: float 12s ease-in-out infinite;
}

.animate-float-medium {
  animation: float 8s ease-in-out infinite;
}

.animate-float-fast {
  animation: float 6s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Text animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

/* Underline animation */
@keyframes underlineExpand {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.animate-underline-expand {
  animation: underlineExpand 1s ease-out forwards;
  transform-origin: left;
}

/* Line animation */
@keyframes lineExpand {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.animate-line-expand {
  animation: lineExpand 0.8s ease-out forwards;
  animation-delay: 0.4s;
}

/* Tooltip animation */
@keyframes tooltipFade {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-tooltip-fade {
  animation: tooltipFade 0.3s ease-out forwards;
}

/* 3D Perspective */
.perspective-1000 {
  perspective: 1000px;
}

.rotate-y-20 {
  transform: rotateY(20deg);
}

/* Gradient text */
.text-transparent {
  color: transparent;
}

/* Custom easing for AOS */
[data-aos] {
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}
</style>