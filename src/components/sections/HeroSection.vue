<template>
  <section class="relative w-full h-screen bg-indigo-900 text-white flex items-center justify-center overflow-hidden">
    <!-- Dynamic Gradient Background with Parallax -->
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-700 opacity-95">
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"
        :style="{ 'transform': `translateY(${parallaxOffset * 0.5}px)` }"></div>
    </div>

    <!-- 3D Floating Particles -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div v-for="(particle, index) in particles" :key="index" class="absolute rounded-full" :class="particle.color"
        :style="{
          top: `${particle.top}%`,
          left: `${particle.left}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          animation: `float${particle.animation} ${8 + index}s ease-in-out infinite`,
          transform: `translateY(${parallaxOffset * particle.parallaxFactor}px)`
        }"></div>
    </div>

    <!-- Main Content with 3D Perspective -->
    <div class="w-full px-8 sm:px-16 lg:px-64 py-32 relative z-10 text-center"
      :style="{ 'transform': `perspective(1000px) rotateX(${tiltY * 2}deg) rotateY(${-tiltX * 2}deg)` }">
      <div class="max-w-5xl mx-auto transform transition-all duration-1000 ease-out"
        :class="{ 'translate-y-0 opacity-100': loaded, 'translate-y-10 opacity-0': !loaded }">

        <!-- 3D Text Effect -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span v-for="(char, index) in titleChars" :key="index" class="inline-block relative" :style="{
            animation: `textWave 1.5s ease-in-out ${index * 0.05}s infinite`,
            textShadow: `${-tiltX * 2}px ${tiltY * 2}px 10px rgba(0,0,0,0.3)`
          }">
            {{ char === ' ' ? '&nbsp;' : char }}
          </span>
        </h1>

        <!-- Gradient Text with Glow -->
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          <span class="inline-block opacity-0 animate-fade-in text-4xl md:text-5xl font-bold mb-4 tracking-wider"
            style="animation-delay: 1s" :style="{
              background: `linear-gradient(45deg, #ffffff, ${glowColor})`,
              textShadow: `0 0 20px ${glowColor}`
            }">
            HIDEVERSE
          </span>
          <br>
          <span v-for="(text, index) in subtitleTexts" :key="index" class="inline-block opacity-0 animate-fade-in"
            :style="`animation-delay: ${1.3 + index * 0.3}s`">
            {{ text }}
          </span>
        </p>

        <!-- 3D Buttons with Hover Effects -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">


          <button
  class="relative z-10 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
  @click="scrollTopropertylist"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path
      fill-rule="evenodd"
      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 010-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
      clip-rule="evenodd"
    />
  </svg>
  Xem bất động sản
</button>

          <span
            class="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>


          <button @click="$emit('openChat')"
            class="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-indigo-700 transition-all duration-300 shadow-lg text-center transform hover:-translate-y-1 hover:shadow-xl active:scale-95 animate-button-pop relative overflow-hidden group"
            style="animation-delay: 1.8s" :style="{
              transform: `translate3d(0,0,0) perspective(1000px) rotateX(${tiltY * 0.5}deg) rotateY(${-tiltX * 0.5}deg)`
            }">
            <span class="relative z-10 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clip-rule="evenodd" />
              </svg>
              Tư vấn ngay
            </span>
            <span
              class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Animated Bottom Border -->
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-white transform translate-y-1/2 flex justify-center"
      :style="{ 'transform': `translateY(50%) rotateX(${tiltY * 0.3}deg)` }">
      <div class="w-24 h-1 bg-indigo-400 rounded-full mt-2 animate-pulse"
        :style="{ 'transform': `scaleX(${1 + Math.abs(tiltX) * 0.1})` }"></div>
    </div>

    <!-- Interactive Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" @click="scrollDown"
      :style="{ 'transform': `translateX(-50%) translateY(${tiltY * 2}px)` }">
      <svg class="w-6 h-6 text-white hover:text-indigo-300 transition-colors" fill="none" stroke="currentColor"
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const loaded = ref(false)
const tiltX = ref(0)
const tiltY = ref(0)
const parallaxOffset = ref(0)

const title = "Tìm ngôi nhà mơ ước"
const titleChars = ref(title.split(''))
const subtitleTexts = ["Hàng ngàn bất động sản cao cấp đang chờ đón bạn.", " Khám phá ngay!"]

const particles = ref([
  { top: 20, left: 10, size: 64, color: 'bg-purple-400 opacity-20', animation: 1, parallaxFactor: 0.3 },
  { top: 30, left: 80, size: 96, color: 'bg-white opacity-10', animation: 2, parallaxFactor: 0.2 },
  { top: 70, left: 25, size: 80, color: 'bg-indigo-300 opacity-15', animation: 3, parallaxFactor: 0.4 },
  { top: 40, left: 60, size: 40, color: 'bg-pink-300 opacity-15', animation: 1, parallaxFactor: 0.5 },
  { top: 60, left: 70, size: 60, color: 'bg-blue-300 opacity-10', animation: 2, parallaxFactor: 0.3 }
])

const glowColors = ['#a5b4fc', '#818cf8', '#c7d2fe', '#a78bfa']
const glowColor = ref(glowColors[0])

onMounted(() => {
  setTimeout(() => {
    loaded.value = true
  }, 100)

  // Change glow color every 3 seconds
  const glowInterval = setInterval(() => {
    const currentIndex = glowColors.indexOf(glowColor.value)
    const nextIndex = (currentIndex + 1) % glowColors.length
    glowColor.value = glowColors[nextIndex]
  }, 3000)

  // Mouse move effect
  const handleMouseMove = (e) => {
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight
    tiltX.value = (x - 0.5) * 10
    tiltY.value = (y - 0.5) * 10
  }

  // Scroll effect for parallax
  const handleScroll = () => {
    parallaxOffset.value = window.scrollY
  }

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    clearInterval(glowInterval)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('scroll', handleScroll)
  })
})

const scrollDown = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  })
}

const scrollTopropertylist = () => {
  const element = document.getElementById('property-section')
  if (element) {
    const header = document.querySelector('nav')
    const offset = element.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 20
    window.scrollTo({ top: offset, behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Particle Animations */
@keyframes float1 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  50% {
    transform: translate(20px, 30px) rotate(5deg);
  }
}

@keyframes float2 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  50% {
    transform: translate(-15px, 20px) rotate(-3deg);
  }
}

@keyframes float3 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  50% {
    transform: translate(10px, -15px) rotate(2deg);
  }
}

/* Text Wave Animation */
@keyframes textWave {

  0%,
  100% {
    transform: translateY(0) translateZ(0);
    text-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }

  50% {
    transform: translateY(-10px) translateZ(20px);
    text-shadow: 0 10px 20px rgba(255, 255, 255, 0.3);
  }
}

/* Fade In Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px) translateZ(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* Button Pop Animation */
@keyframes buttonPop {
  0% {
    opacity: 0;
    transform: scale(0.8) translateZ(0);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateZ(0);
  }
}

.animate-button-pop {
  opacity: 0;
  animation: buttonPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* Gradient Background Animation */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

/* Pulse Animation for Bottom Line */
@keyframes pulse {

  0%,
  100% {
    opacity: 0.7;
    transform: scaleX(1);
  }

  50% {
    opacity: 1;
    transform: scaleX(1.2);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Bounce Animation for Scroll Indicator */
@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 1.5s infinite;
}

/* 3D Perspective Container */
.perspective-container {
  transform-style: preserve-3d;
}
</style>