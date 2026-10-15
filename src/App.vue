<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
    <!-- Navbar + Chat -->
    <NavBar
      :user="currentUser"
      @open-chat="toggleChat"
      @show-login="openLoginModal"
      @logout="handleLogout"
    />

  
    <MobileMenu :is-open="isMobileMenuOpen" @close="toggleMobileMenu" />

    <!-- Main Content -->
    <main class="flex-grow">
      <component :is="isHomePage ? HomePageContent : 'router-view'" />
    </main>

    <!-- Footer + Chat Box -->
    <FooterSection />
    <ChatBox
      :is-open="isChatOpen"
      :user="currentUser"
      :target-building="selectedChatBuilding"
      @close="toggleChat"
      @request-login="openLoginModal"
      @open-building="handleOpenBuildingFromChat"
    />

    <!-- ================== MODALS ================== -->

    <!-- 🔹 Login Modal -->
    <transition name="fade">
      <LoginModal
        v-if="isLoginOpen"
        @closed="closeLoginModal"
        @login-success="handleLoginSuccess"
        @open-register="openRegisterModal"
        @open-forgot="openForgotPassword"
      />
    </transition>

    <!-- 🔹 Register Modal -->
    <transition name="fade">
      <RegisterModal
        v-if="isRegisterOpen"
        @close="isRegisterOpen = false"
        @switch-to-login="openLoginModal"
      />
    </transition>

    <transition name="fade">
      <ForgotPasswordForm
        v-if="showForgot"
        @close="showForgot = false"
        @switch-to-login="openLoginModal"
      />
    </transition>

    <PropertyModal
      v-if="showModal"
      :property="selectedProperty"
      @close="closeModal"
      @chat-with-broker="handleChatWithBroker"
    />
    
    <!-- Snow Container -->
    <div id="snow-container" class="hidden pointer-events-none fixed inset-0 z-[9998]"></div>
  </div>
</template>


<script setup>
import { ref, computed, watch, onMounted, provide } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { onUnmounted } from 'vue'

const isDark = ref(false)
const snowContainer = ref(null)
let snowInterval = null

const toggleTheme = () => {
  const html = document.documentElement
  if (html.classList.contains('dark')) {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
    isDark.value = false
  } else {
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
    isDark.value = true
  }
}

function createSnowflake() {
  if (!snowContainer.value) return
  const snowflake = document.createElement('div')
  snowflake.classList.add('snowflake')
  snowflake.textContent = '❄'
  snowflake.style.left = Math.random() * 100 + 'vw'
  snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's'
  snowflake.style.opacity = Math.random()
  snowflake.style.fontSize = Math.random() * 16 + 10 + 'px'
  snowContainer.value.appendChild(snowflake)

  setTimeout(() => {
    snowflake.remove()
  }, 5000)
}

function startSnowEffect() {
  if (!snowContainer.value) return
  if (snowInterval) return // tránh lặp
  snowContainer.value.classList.remove('hidden')
  snowInterval = setInterval(createSnowflake, 150)
}

function stopSnowEffect() {
  if (!snowContainer.value) return
  snowContainer.value.classList.add('hidden')
  clearInterval(snowInterval)
  snowInterval = null
}
onMounted(() => {
  snowContainer.value = document.getElementById('snow-container')
  const mode = localStorage.getItem('festivalMode')
  if (mode === 'true') startSnowEffect()
  else stopSnowEffect()

  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
    isDark.value = true
  }

  if (currentUser.value) fetchFavourites()
})

// Components
import NavBar from './components/common/Nav.vue'
import MobileMenu from './components/MobileMenu.vue'
import FooterSection from './components/FooterSection.vue'
import ChatBox from './components/ChatBox.vue'
import LoginModal from './views/login.vue'
import RegisterModal from './views/signup.vue'
import PropertyModal from './components/property/PropertyModal.vue'
import HiderAI from './components/HiderAI.vue'
import HomePageContent from './components/page/HomePageContent.vue'
import { properties } from './data/properties'
import ForgotPasswordForm from './views/ForgotPasswordForm.vue'
import PropertySearchWrapper from './components/property/PropertySearchWrapper.vue'

// Route & Page
const route = useRoute()
const isHomePage = computed(() => route.path === '/')
const showForgot = ref(false)
// State
const currentUser = ref(null)
const favoriteIds = ref([])
const favourites = ref([])
const isMobileMenuOpen = ref(false)
const isChatOpen = ref(false)
const isLoginOpen = ref(false)
const isRegisterOpen = ref(false)
const chatMessages = ref([])
const searchCriteria = ref({})
const propertiesData = ref(properties)
const showModal = ref(false)
const selectedProperty = ref(null)

// Load user từ localStorage an toàn
const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('currentUser') || localStorage.getItem('user')
    if (raw && raw !== 'undefined' && raw !== 'null') {
      return JSON.parse(raw)
    }
  } catch (e) {
    console.error('Lỗi parse stored user:', e)
  }
  return null
}
currentUser.value = getStoredUser()

// Favorite logic
const toggleFavorite = async (buildingId) => {
  const uid = currentUser.value?.id
  if (!uid) {
    console.warn('❌ Không có userId để toggle favorite')
    return
  }
  const isCurrentlyFavorite = favoriteIds.value.includes(buildingId)
  try {
    const payload = { userId: uid, customerId: uid, buildingId }
    if (isCurrentlyFavorite) {
      await axios.post('/api/buildings/favorites/remove', payload)
      favoriteIds.value = favoriteIds.value.filter(id => id !== buildingId)
      favourites.value = favourites.value.filter(b => b.id !== buildingId)
    } else {
      await axios.post('/api/buildings/favorites', payload)
      favoriteIds.value.push(buildingId)
    }
  } catch (error) {
    console.error('❌ Lỗi toggle favorite:', error)
  }
}

const refreshFavorites = async () => fetchFavourites()

provide('toggleFavorite', toggleFavorite)
provide('refreshFavorites', refreshFavorites)
provide('favoriteIds', favoriteIds)
provide('customerId', computed(() => currentUser.value?.id || null))
provide('openPropertyModal', (property) => {
  selectedProperty.value = property
  showModal.value = true
})

const fetchFavourites = async () => {
  const uid = currentUser.value?.id
  if (!uid) return
  try {
    const response = await axios.get(`/api/buildings/favorites/${uid}`)
    const favs = response.data || []
    favoriteIds.value = favs.map(f => f.buildingId)
  } catch (error) {
    console.error('❌ Fetch favourite lỗi:', error)
  }
}

const filteredProperties = computed(() => {
  return propertiesData.value.filter(property => {
    return Object.entries(searchCriteria.value).every(([key, value]) => {
      if (!value) return true
      return property[key]?.toString().toLowerCase().includes(value.toLowerCase())
    })
  })
})

const propertiesList = computed(() =>
  filteredProperties.value.map(property => ({
    ...property,
    isFavorite: favoriteIds.value.includes(property.id)
  }))
)

// UI & Chat
watch(isLoginOpen, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : 'auto'
})


const selectedChatBuilding = ref(null)

const toggleMobileMenu = () => isMobileMenuOpen.value = !isMobileMenuOpen.value
const toggleChat = () => {
  if (isChatOpen.value) {
    selectedChatBuilding.value = null
  }
  isChatOpen.value = !isChatOpen.value
}

const handleChatWithBroker = (buildingData) => {
  if (!currentUser.value) {
    openLoginModal()
    return
  }
  showModal.value = false
  selectedChatBuilding.value = { ...buildingData, _ts: Date.now() }
  isChatOpen.value = true
}

const handleOpenBuildingFromChat = async (buildingId) => {
  try {
    const res = await axios.get(`/api/buildings/${buildingId}`)
    selectedProperty.value = res.data || { id: buildingId }
  } catch (e) {
    selectedProperty.value = { id: buildingId }
  }
  showModal.value = true
}

provide('openBrokerChat', handleChatWithBroker)

// 🔹 Modal logic
const openLoginModal = () => {
  isRegisterOpen.value = false
  showForgot.value = false
  isLoginOpen.value = true
}

const closeLoginModal = () => {
  isLoginOpen.value = false
}

const handleSearch = (criteria) => searchCriteria.value = criteria

const openRegisterModal = () => {
  isLoginOpen.value = false
  isRegisterOpen.value = true
}

const closeRegisterModal = () => {
  isRegisterOpen.value = false
}

const openForgotPassword = () => {
  isLoginOpen.value = false
  showForgot.value = true
}

const handleLoginSuccess = (userData) => {
  const { id, username, roles, fullname, avatar, email, phone, token } = userData
  if (token) {
    localStorage.setItem('token', token)
  }
  const user = { id, username, roles, fullname, avatar, email, phone }
  localStorage.setItem('currentUser', JSON.stringify(user))
  localStorage.setItem('user', JSON.stringify(user))
  currentUser.value = user
  isLoginOpen.value = false
  fetchFavourites()
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('currentUser')
  localStorage.removeItem('user')
  localStorage.removeItem('authToken')
  localStorage.removeItem('access_token')
  localStorage.removeItem('favorites')
  currentUser.value = null
  favoriteIds.value = []
  favourites.value = []
}

const closeModal = () => showModal.value = false
onUnmounted(() => {
  stopSnowEffect()
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.snowflake {
  position: fixed;
  top: -10px;
  color: white;
  user-select: none;
  pointer-events: none;
  animation: fall linear forwards;
  z-index: 9999;
}

@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
}

</style>
