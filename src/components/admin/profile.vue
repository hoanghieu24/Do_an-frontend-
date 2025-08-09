<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Profile Card -->
      <div class="bg-white shadow-xl rounded-lg overflow-hidden">
        <!-- Cover Photo -->
        <div class="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <!-- Profile Info -->
        <div class="px-6 py-4 relative">
          <!-- Avatar -->
          <div class="absolute -top-16 left-6 border-4 border-white rounded-full overflow-hidden">
            <img 
              src="https://randomuser.me/api/portraits/women/65.jpg" 
              alt="Profile" 
              class="h-32 w-32 object-cover"
            >
          </div>
          
          <!-- Name and Title -->
          <div class="ml-40">
            <h1 class="text-3xl font-bold text-gray-800">Nguyễn Thị Mai</h1>
            <p class="text-gray-600">Frontend Developer | Vue.js Specialist</p>
            
            <!-- Stats -->
            <div class="flex mt-4 space-x-6">
              <div>
                <p class="text-gray-500 text-sm">Followers</p>
                <p class="font-bold text-gray-800">1,234</p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">Following</p>
                <p class="font-bold text-gray-800">567</p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">Projects</p>
                <p class="font-bold text-gray-800">42</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Bio -->
        <div class="px-6 py-4 border-t border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">About Me</h2>
          <p class="text-gray-600">
            Passionate frontend developer with 5 years of experience building modern web applications. 
            Specialized in Vue.js ecosystem. Love to create beautiful, responsive and accessible interfaces.
          </p>
        </div>
        
        <!-- Skills -->
        <div class="px-6 py-4 border-t border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Skills</h2>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in skills" :key="skill" 
                  class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {{ skill }}
            </span>
          </div>
        </div>
        
        <!-- Contact -->
        <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Contact</h2>
          <div class="space-y-2">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-gray-600">mai.nguyen@example.com</span>
            </div>
            <div class="flex items-center">
              <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-gray-600">+84 123 456 789</span>
            </div>
            <div class="flex items-center">
              <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-gray-600">Hanoi, Vietnam</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="mt-6 flex space-x-4">
        <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Follow
        </button>
        <button class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
          Message
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        'Vue.js', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 
        'Vuex', 'Vue Router', 'API Integration', 'Responsive Design'
      ]
    }
  }
}
</script>

<style>
/* Additional custom styles if needed */
</style>