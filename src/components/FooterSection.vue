<template>
  <footer class="relative bg-gray-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <!-- Gradient background overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 opacity-90"></div>
    
    <!-- Floating particles -->
    <div class="absolute inset-0 overflow-hidden opacity-20">
      <div v-for="i in 15" :key="i" 
           class="absolute rounded-full bg-white"
           :class="`particle-${i}`"
           :style="{
             width: `${Math.random() * 4 + 1}px`,
             height: `${Math.random() * 4 + 1}px`,
             top: `${Math.random() * 100}%`,
             left: `${Math.random() * 100}%`,
             animationDelay: `${Math.random() * 5}s`
           }"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
        <!-- Brand Column -->
        <div class="md:col-span-4 lg:col-span-3">
          <div class="mb-8 transform transition-all duration-500 hover:scale-[1.02]">
            <div class="relative inline-block">
              <h3 class="text-3xl font-bold text-white mb-2">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                  Hider<span class="text-white">Verse</span>
                </span>
              </h3>
              <div class="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
            </div>
            
            <p class="text-gray-400 mt-6 text-lg leading-relaxed">
              Chúng tôi cung cấp giải pháp bất động sản toàn diện với đội ngũ chuyên nghiệp và công nghệ hiện đại.
            </p>
          </div>
          
          <div class="flex space-x-4">
            <a 
              v-for="(social, index) in socials" 
              :key="social.name" 
              :href="social.href" 
              class="text-gray-400 hover:text-white p-3 bg-gray-800 rounded-full hover:bg-gradient-to-br transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
              :class="[
                index === 0 ? 'hover:from-blue-600 hover:to-blue-800' : '',
                index === 1 ? 'hover:from-sky-500 hover:to-sky-700' : '',
                index === 2 ? 'hover:from-pink-600 hover:to-purple-800' : '',
                index === 3 ? 'hover:from-blue-700 hover:to-blue-900' : ''
              ]"
              :aria-label="social.name"
            >
              <component 
                :is="social.icon" 
                class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
              />
            </a>
          </div>
        </div>
        
        <!-- Links Column -->
        <div class="md:col-span-2 lg:col-span-2">
          <h4 class="text-lg font-semibold mb-6 relative inline-block group">
            <span class="relative z-10">Liên kết</span>
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-500"></span>
          </h4>
          <ul class="space-y-3">
            <li v-for="(link, index) in links" :key="link.name">
              <router-link 
                :to="link.href" 
                class="text-gray-400 hover:text-white flex items-center group transition-all duration-300"
              >
                <span class="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span class="relative">
                  {{ link.name }}
                  <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                </span>
              </router-link>
            </li>
          </ul>
        </div>
        
        <!-- Contact Column -->
        <div class="md:col-span-3 lg:col-span-3">
          <h4 class="text-lg font-semibold mb-6 relative inline-block group">
            <span class="relative z-10">Liên hệ</span>
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-500"></span>
          </h4>
          
          <ul class="space-y-4">
            <li class="flex items-start">
              <div class="flex-shrink-0 mt-1 mr-4 text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-gray-400">123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM</span>
            </li>
            <li class="flex items-start">
              <div class="flex-shrink-0 mt-1 mr-4 text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <span class="text-gray-400">(+84) 123 456 789</span>
            </li>
            <li class="flex items-start">
              <div class="flex-shrink-0 mt-1 mr-4 text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <span class="text-gray-400">info@hiderverse.com</span>
            </li>
            <li class="flex items-start">
              <div class="flex-shrink-0 mt-1 mr-4 text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-gray-400">Thứ 2 - Thứ 7: 8:00 - 18:00</span>
            </li>
          </ul>
        </div>
        
        <!-- Newsletter Column -->
        <div class="md:col-span-3 lg:col-span-4">
          <h4 class="text-lg font-semibold mb-6 relative inline-block group">
            <span class="relative z-10">Nhận bản tin</span>
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-500"></span>
          </h4>
          <p class="text-gray-400 mb-6 leading-relaxed">
            Đăng ký để nhận thông tin mới nhất về bất động sản và các ưu đãi đặc biệt
          </p>
          
          <div class="flex flex-col space-y-4">
            <div class="relative">
              <input 
                type="email" 
                placeholder="Email của bạn"
                class="w-full px-5 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 transition-all duration-300"
              >
            </div>
            
            <button class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:-translate-y-0.5">
              <span>Đăng ký ngay</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div class="mt-6 flex items-center">
            <input id="privacy-check" type="checkbox" class="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-700 rounded focus:ring-indigo-500">
            <label for="privacy-check" class="ml-2 text-sm text-gray-400">
              Tôi đồng ý với <a href="#" class="text-indigo-400 hover:underline">Chính sách bảo mật</a>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Divider -->
      <div class="border-t border-gray-800 mt-16"></div>
      
      <!-- Bottom Section -->
      <div class="pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-500 text-sm mb-4 md:mb-0">
          © 2025 <span class="text-indigo-400 font-medium">Hiderverse</span>. All rights reserved.
        </p>
        
        <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <a 
            v-for="(item, index) in footerLinks" 
            :key="index"
            href="#" 
            class="text-gray-500 hover:text-white transition-colors duration-300 relative group"
          >
            {{ item }}
            <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { 
  FacebookIcon, 
  TwitterIcon, 
  InstagramIcon, 
  LinkedinIcon 
} from 'lucide-vue-next'

const socials = [
  { name: 'Facebook', href: '#', icon: FacebookIcon },
  { name: 'Twitter', href: '#', icon: TwitterIcon },
  { name: 'Instagram', href: '#', icon: InstagramIcon },
  { name: 'LinkedIn', href: '#', icon: LinkedinIcon }
]

const links = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Bất động sản', href: '/properties' },
  { name: 'Môi giới', href: '/agents' },
  { name: 'Về chúng tôi', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Liên hệ', href: '/contact' }
]

const footerLinks = [
  'Chính sách bảo mật',
  'Điều khoản sử dụng',
  'FAQ',
  'Hỗ trợ',
  'Sitemap'
]
</script>

<style scoped>
/* Floating particles animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

.particle-1, .particle-2, .particle-3, .particle-4, .particle-5,
.particle-6, .particle-7, .particle-8, .particle-9, .particle-10,
.particle-11, .particle-12, .particle-13, .particle-14, .particle-15 {
  animation: float 8s ease-in-out infinite;
  opacity: 0.6;
}

/* Delay animations */
.particle-1 { animation-delay: 0s; }
.particle-2 { animation-delay: 0.5s; }
.particle-3 { animation-delay: 1s; }
.particle-4 { animation-delay: 1.5s; }
.particle-5 { animation-delay: 2s; }
.particle-6 { animation-delay: 2.5s; }
.particle-7 { animation-delay: 3s; }
.particle-8 { animation-delay: 3.5s; }
.particle-9 { animation-delay: 4s; }
.particle-10 { animation-delay: 4.5s; }
.particle-11 { animation-delay: 5s; }
.particle-12 { animation-delay: 5.5s; }
.particle-13 { animation-delay: 6s; }
.particle-14 { animation-delay: 6.5s; }
.particle-15 { animation-delay: 7s; }

/* Smooth transitions */
a, button, input {
  transition: all 0.3s ease;
}

/* Custom checkbox style */
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #4B5563;
  border-radius: 0.25rem;
  outline: none;
  cursor: pointer;
  position: relative;
}

input[type="checkbox"]:checked {
  background-color: #6366F1;
  border-color: #6366F1;
}

input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 45%;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -50%) rotate(45deg);
}
</style>