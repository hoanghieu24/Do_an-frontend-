<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-cyan-50">
  <PropertyCard
  v-for="property in propertiesList"
  :key="property.id"
  :property="property"
  :currentUser="currentUser"
  @favorite-updated="refreshFavorites"
/>
    <NavBar :user="currentUser" @open-chat="toggleChat" @show-login="toggleLogin" @logout="handleLogout" />
    <HiderAI ref="chatbot" />
    <MobileMenu :is-open="isMobileMenuOpen" @close="toggleMobileMenu" />

    <main class="flex-grow">
      <component :is="isHomePage ? HomePageContent : 'router-view'" />
    </main>

    <FooterSection />
    <ChatBox :is-open="isChatOpen" :messages="chatMessages" @send-message="sendMessage" @close="toggleChat" />

    <transition name="fade">
      <LoginModal v-if="isLoginOpen" @closed="toggleLogin" @login-success="handleLoginSuccess" />
    </transition>

    <PropertyModal v-if="showModal" :property="selectedProperty" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, provide } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// Components
import NavBar from './components/common/Nav.vue'
import MobileMenu from './components/MobileMenu.vue'
import FooterSection from './components/FooterSection.vue'
import ChatBox from './components/ChatBox.vue'
import LoginModal from './views/login.vue'
import PropertyModal from './components/property/PropertyModal.vue'
import ResetButton from './components/common/reset.vue'
import HiderAI from './components/HiderAI.vue'
import HomePageContent from './components/page/HomePageContent.vue'
import { properties } from './data/properties'

// Route & Page
const route = useRoute()
const isHomePage = computed(() => route.path === '/')
const user = JSON.parse(localStorage.getItem("user"))

// State
const currentUser = ref(null)
const favoriteIds = ref([]) // ⭐ Đây là state trung tâm để track favorite IDs
const favourites = ref([])

const isMobileMenuOpen = ref(false)
const isChatOpen = ref(false)
const isLoginOpen = ref(false)
const chatMessages = ref([])
const searchCriteria = ref({})
const propertiesData = ref(properties)
const showModal = ref(false)
const selectedProperty = ref(null)
const chatbot = ref(null)

// Load user từ localStorage
const savedUser = localStorage.getItem('currentUser')
if (savedUser) {
  currentUser.value = JSON.parse(savedUser)
}

// ⭐ Hàm toggleFavorite chính - cập nhật favoriteIds reactive
const toggleFavorite = async (buildingId) => {
  if (!currentUser.value?.id) {
    console.warn('❌ Không có customerId để toggle favorite')
    return
  }

  const customerId = currentUser.value.id
  const isCurrentlyFavorite = favoriteIds.value.includes(buildingId)

  try {
    if (isCurrentlyFavorite) {
      // Xóa khỏi yêu thích
      await axios.post('http://localhost:8080/api/buildings/favorites/remove', {
        customerId,
        buildingId
      })
      
      // Cập nhật local state
      favoriteIds.value = favoriteIds.value.filter(id => id !== buildingId)
      favourites.value = favourites.value.filter(b => b.id !== buildingId)
      
      console.log('✅ Đã xóa khỏi yêu thích:', buildingId)
    } else {
      // Thêm vào yêu thích
      await axios.post('http://localhost:8080/api/buildings/favorites', {
        customerId,
        buildingId
      })
      
      // Cập nhật local state
      favoriteIds.value.push(buildingId)
      
      console.log('✅ Đã thêm vào yêu thích:', buildingId)
    }
    
    return !isCurrentlyFavorite // Trả về trạng thái mới
  } catch (error) {
    console.error('❌ Lỗi toggle favorite:', error)
    throw error
  }
}

// ⭐ Hàm để force refresh favorites từ server
const refreshFavorites = async () => {
  await fetchFavourites()
}

// ⭐ provide xuống các component con
provide('toggleFavorite', toggleFavorite)
provide('refreshFavorites', refreshFavorites)
provide('favoriteIds', favoriteIds) // Provide reactive favoriteIds
provide('customerId', computed(() => currentUser.value?.id || null))
provide('openPropertyModal', (property) => {
  selectedProperty.value = property
  showModal.value = true
})

// Fetch danh sách toà nhà yêu thích
const fetchFavourites = async () => {
  if (!currentUser.value?.id) {
    favoriteIds.value = []
    favourites.value = []
    return
  }
  
  try {
    const response = await axios.get(`http://localhost:8080/api/buildings/favorites/${currentUser.value.id}`)
    const favs = response.data || []
    
    // Cập nhật favoriteIds
    favoriteIds.value = favs.map(f => f.buildingId)

    // Lấy chi tiết tòa nhà
    const buildingDetails = await Promise.all(
      favs.map(async (fav) => {
        try {
          const res = await axios.get(`http://localhost:8080/api/buildings/${fav.buildingId}`)
          return res.data
        } catch (error) {
          console.error(`❌ Lỗi lấy chi tiết building ${fav.buildingId}:`, error)
          return null
        }
      })
    )
    
    favourites.value = buildingDetails.filter(b => b && b.id)
    console.log('✅ Đã load favorites:', favoriteIds.value)
  } catch (error) {
    console.error('❌ Fetch favourite lỗi:', error)
    favoriteIds.value = []
    favourites.value = []
  }
}

// Computed properties
const filteredProperties = computed(() => {
  return propertiesData.value.filter(property => {
    return Object.entries(searchCriteria.value).every(([key, value]) => {
      if (!value) return true
      if (key === 'price') {
        const price = parseFloat(property.price.replace(/[^\d.]/g, ''))
        const [min, max] = value.split('-').map(Number)
        return price >= min && (!max || price <= max)
      }
      return property[key].toString().toLowerCase().includes(value.toLowerCase())
    })
  })
})

// Computed để tính danh sách properties với trạng thái favorite
const propertiesList = computed(() => {
  return filteredProperties.value.map(property => ({
    ...property,
    isFavorite: favoriteIds.value.includes(property.id)
  }))
})

// Watcher
watch(isLoginOpen, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : 'auto'
})

// Mounted
onMounted(() => {
  if (currentUser.value) {
    fetchFavourites()
  }
})

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}

const toggleLogin = () => {
  isLoginOpen.value = !isLoginOpen.value
}

const handleSearch = (criteria) => {
  searchCriteria.value = criteria
}

const sendMessage = (message) => {
  chatMessages.value.push({
    text: message,
    sender: 'user',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })

  setTimeout(() => {
    chatMessages.value.push({
      text: 'Cảm ơn tin nhắn của bạn. Chúng tôi sẽ phản hồi sớm nhất có thể.',
      sender: 'agent',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
  }, 1000)
}

const handleLoginSuccess = ({ username, roles, fullname, id }) => {
  const user = {
    id,
    username,
    roles,
    fullname: Array.isArray(fullname) ? fullname[0] : fullname
  }
  localStorage.setItem('currentUser', JSON.stringify(user))
  currentUser.value = user
  isLoginOpen.value = false
  fetchFavourites()
}

const handleLogout = () => {
  localStorage.removeItem('currentUser')
  currentUser.value = null
  favoriteIds.value = []
  favourites.value = []
}

const closeModal = () => {
  showModal.value = false
}
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

.modal-overlay {
  z-index: 9999;
}

body.modal-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}
</style>
