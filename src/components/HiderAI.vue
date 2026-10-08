<template>
  <!-- Nút toggle hình tròn -->
  <button 
    class="chatbot-toggle"
    :class="{ 'active': isOpen }"
    @click="toggleChatbot"
    title="Trợ lý ảo HiderAI"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
    <span class="notification-badge" v-if="unreadCount > 0">{{ unreadCount }}</span>
  </button>

  <!-- Khung chat chính -->
  <div class="chatbot-container" :class="{ 'open': isOpen }">
    <!-- Header -->
    <div class="chatbot-header">
      <div class="header-content">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <h3>HiderAI Assistant</h3>
        </div>
        <p>Tư vấn bất động sản & tour thực tế ảo 360°</p>
      </div>
      <button class="close-btn" @click="toggleChatbot" title="Đóng chat">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Messages Container -->
    <div class="chatbot-messages" ref="messagesContainer">
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        :class="['message', message.sender]"
      >
        <div class="message-content">
          <!-- Text message bubble -->
          <div 
            class="message-text" 
            v-html="formatBotMessage(message.text)"
          ></div>

          <!-- Building Cards Carousel / Grid (nếu có tòa nhà đề xuất) -->
          <div v-if="message.buildings && message.buildings.length > 0" class="mt-3 space-y-2.5">
            <div 
              v-for="b in message.buildings" 
              :key="b.id"
              class="bg-white rounded-xl p-3 border border-indigo-100 shadow-xs hover:shadow-md transition-all text-left flex flex-col gap-2"
            >
              <div class="flex gap-3 items-start">
                <img 
                  :src="getBuildingImage(b.imageUrl)" 
                  :alt="b.name"
                  class="w-16 h-16 rounded-lg object-cover bg-gray-100 shrink-0 border border-gray-100"
                  @error="onImageError"
                />
                <div class="flex-1 min-w-0">
                  <h4 class="text-xs font-bold text-gray-900 truncate" :title="b.name">
                    {{ b.name }} <span class="text-indigo-600 font-mono text-[11px]">[#{{ b.id }}]</span>
                  </h4>
                  <p class="text-[11px] text-gray-500 truncate mt-0.5">
                    📍 {{ b.address || 'Đang cập nhật địa chỉ' }}
                  </p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs font-bold text-indigo-700">
                      {{ formatPrice(b.rentPrice) }}
                    </span>
                    <span v-if="b.area" class="text-[11px] text-gray-400">
                      • {{ b.area }} m²
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons Row -->
              <div class="flex items-center gap-2 pt-1 border-t border-gray-100">
                <button
                  v-if="b.hasVr"
                  type="button"
                  @click="openVrModal(b)"
                  class="flex-1 py-1 px-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-[11px] font-bold shadow-xs flex items-center justify-center gap-1 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Xem VR360
                </button>
                <router-link
                  to="/PropertyList"
                  class="flex-1 py-1 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 text-[11px] font-medium text-center transition-all"
                >
                  Chi tiết
                </router-link>
              </div>
            </div>
          </div>

          <div class="message-time">{{ formatTime(message.timestamp) }}</div>
        </div>
      </div>

      <!-- Typing Indicator khi đang chờ bot -->
      <div v-if="isThinking" class="message bot">
        <div class="message-content">
          <div class="message-text typing-bubble flex items-center gap-1.5 py-2.5 px-4">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="text-xs text-indigo-700 font-medium ml-1.5">HiderAI đang tìm kiếm & suy nghĩ...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Options / Suggestion Chips -->
    <div class="quick-options" v-if="isOpen && currentSuggestions.length > 0">
      <button 
        v-for="(option, idx) in currentSuggestions" 
        :key="idx"
        @click="sendQuickReply(option)"
        class="quick-option-btn"
        :disabled="isThinking"
      >
        {{ option }}
      </button>
    </div>

    <!-- Input Bar -->
    <div class="chatbot-input-container">
      <div class="chatbot-input">
        <input 
          v-model="userInput"
          @keyup.enter="sendMessage"
          type="text" 
          maxlength="500"
          :disabled="isThinking"
          placeholder="Nhập câu hỏi tìm bất động sản..."
        />
        <button 
          @click="sendMessage" 
          class="send-btn"
          :disabled="!userInput.trim() || isThinking"
          title="Gửi tin nhắn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>

      <!-- Character count footer -->
      <div class="px-4 pb-2 text-[10px] text-gray-400 flex justify-between bg-white">
        <span>Gõ / hỏi theo quận, mức giá hoặc VR360</span>
        <span :class="{ 'text-amber-500': userInput.length > 400, 'text-rose-500': userInput.length >= 500 }">
          {{ userInput.length }}/500
        </span>
      </div>
    </div>
  </div>

  <!-- Modal xem Tour VR360 trực tiếp khi bấm từ chat -->
  <div 
    v-if="showVrModal"
    class="fixed inset-0 z-[10001] flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
  >
    <div class="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden border border-gray-800">
      <!-- Modal Header -->
      <div class="px-5 py-3 bg-gray-950 border-b border-gray-800 text-white flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            VR
          </div>
          <div>
            <h4 class="text-sm font-bold">{{ vrBuilding?.name }} - Trải nghiệm thực tế ảo 360°</h4>
            <p class="text-[11px] text-gray-400">{{ vrBuilding?.address }}</p>
          </div>
        </div>
        <button 
          @click="showVrModal = false"
          class="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all text-sm font-bold"
        >
          ✕ Đóng
        </button>
      </div>

      <!-- VR Viewer iframe -->
      <div class="flex-1 bg-black relative">
        <iframe 
          :src="'/vtour/pannellum.html?buildingId=' + vrBuilding?.id"
          class="w-full h-full border-0"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import axios from 'axios'

// ========== STATE ==========
const isOpen = ref(false)
const unreadCount = ref(0)
const messages = ref([])
const userInput = ref('')
const isThinking = ref(false)
const messagesContainer = ref(null)

// Modal VR state
const showVrModal = ref(false)
const vrBuilding = ref(null)

// Default Gợi ý nhanh
const defaultSuggestions = [
  'Văn phòng Quận 1 dưới 20 triệu',
  'Tòa nhà có VR360',
  'Liên hệ nhân viên'
]

// Lấy suggestions từ bot message gần nhất nếu có
const currentSuggestions = computed(() => {
  for (let i = messages.value.length - 1; i >= 0; i--) {
    const msg = messages.value[i]
    if (msg.sender === 'bot' && msg.suggestions && msg.suggestions.length > 0) {
      return msg.suggestions
    }
  }
  return defaultSuggestions
})

// ========== KHỞI TẠO DỮ LIỆU ==========
onMounted(() => {
  const savedMessages = localStorage.getItem('hiderai_chat_history')
  if (savedMessages) {
    try {
      messages.value = JSON.parse(savedMessages)
    } catch {
      messages.value = []
    }
  }
  if (!messages.value || messages.value.length === 0) {
    messages.value = [
      {
        text: '👋 Chào bạn! Tôi là **HiderAI**, trợ lý tư vấn bất động sản của bạn. Bạn muốn tìm văn phòng, căn hộ ở khu vực nào hay trải nghiệm tour VR360?',
        sender: 'bot',
        timestamp: new Date(),
        suggestions: defaultSuggestions
      }
    ]
  }
  scrollToBottom()
})

// ========== WATCHERS ==========
watch(messages, (newVal) => {
  localStorage.setItem('hiderai_chat_history', JSON.stringify(newVal))
  if (!isOpen.value && newVal.length > 0 && newVal[newVal.length - 1].sender === 'bot') {
    unreadCount.value++
  }
}, { deep: true })

// ========== HÀM XỬ LÝ ==========
const toggleChatbot = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    unreadCount.value = 0
    nextTick(() => scrollToBottom())
  }
}

const sendQuickReply = (option) => {
  if (isThinking.value) return
  userInput.value = option
  sendMessage()
}

const openVrModal = (building) => {
  vrBuilding.value = building
  showVrModal.value = true
}

const sendMessage = async () => {
  const input = userInput.value.trim()
  if (!input || isThinking.value) return

  // 1. Thêm tin nhắn người dùng
  messages.value.push({
    text: input,
    sender: 'user',
    timestamp: new Date()
  })
  userInput.value = ''
  isThinking.value = true
  scrollToBottom()

  try {
    // 2. Gửi API qua đường dẫn tương đối (được Vite proxy hoặc server phục vụ)
    const response = await axios.post('/api/chatbot/openai', {
      userMessage: input
    })

    const data = response.data
    let replyText = '🤔 Xin lỗi, tôi chưa hiểu rõ yêu cầu của bạn.'
    let buildings = []
    let suggestions = []

    if (typeof data === 'string') {
      replyText = data
    } else if (data && typeof data === 'object') {
      replyText = data.reply || replyText
      buildings = data.buildings || []
      suggestions = data.suggestions || []
    }

    messages.value.push({
      text: replyText,
      sender: 'bot',
      timestamp: new Date(),
      buildings: buildings,
      suggestions: suggestions
    })
  } catch (error) {
    console.error('Lỗi khi gọi API AI Chatbot:', error)
    let errorMsg = '⚠️ Hiện tại hệ thống trợ lý đang bận hoặc gặp sự cố kết nối. Bạn thử lại sau ít phút nhé!'
    if (error.response?.status === 429) {
      errorMsg = '⏳ Bạn đang gửi tin nhắn hơi nhanh! Vui lòng chờ 1 phút rồi tiếp tục nhé.'
    }
    messages.value.push({
      text: errorMsg,
      sender: 'bot',
      timestamp: new Date()
    })
  } finally {
    isThinking.value = false
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    const container = messagesContainer.value
    if (container) container.scrollTop = container.scrollHeight
  })
}

const formatTime = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatPrice = (price) => {
  if (!price) return 'Giá thỏa thuận'
  if (price >= 1000000) {
    const millions = (price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)
    return `${millions} triệu VND/tháng`
  }
  return new Intl.NumberFormat('vi-VN').format(price) + ' VND/tháng'
}

const getBuildingImage = (url) => {
  if (!url) return '/img/building-default.jpg'
  if (url.startsWith('http') || url.startsWith('/')) return url
  return `/img/${url}`
}

const onImageError = (e) => {
  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23e2e8f0"/%3E%3Ctext x="50" y="55" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%2364748b"%3E🏢 BĐS%3C/text%3E%3C/svg%3E'
}

// Xử lý XSS an toàn trước khi định dạng Markdown cơ bản
const escapeHtml = (unsafe) => {
  if (!unsafe) return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const formatBotMessage = (text) => {
  if (!text) return ''
  const escaped = escapeHtml(text)
  return escaped
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>')
    .replace(/^- (.*$)/gm, '• $1')
}
</script>

<style scoped>
/* Nút toggle với hiệu ứng nổi bật */
.chatbot-toggle {
  position: fixed;
  bottom: 24px;
  right: 80px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #4F46E5 100%);
  background-size: 200% 200%;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(79, 70, 229, 0.4);
  z-index: 10000;
  border: none;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: gradientShift 3s ease-in-out infinite;
}

.chatbot-toggle:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 12px 40px rgba(79, 70, 229, 0.6);
}

.chatbot-toggle.active {
  transform: scale(1.05) rotate(0deg);
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #EF4444;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  border: 2px solid white;
}

/* Khung chat */
.chatbot-container {
  position: fixed;
  bottom: 95px;
  right: 20px;
  width: 420px;
  max-width: 92vw;
  max-height: 0;
  overflow: hidden;
  background: white;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.chatbot-container.open {
  max-height: 720px;
  height: 75vh;
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Header */
.chatbot-header {
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #4F46E5 100%);
  color: white;
  padding: 16px 20px;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}

.header-content p {
  margin: 2px 0 0;
  font-size: 12px;
  opacity: 0.9;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* Vùng tin nhắn */
.chatbot-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: #F8FAFC;
  scroll-behavior: smooth;
}

.message {
  margin-bottom: 16px;
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message-content {
  max-width: 86%;
}

.message-text {
  padding: 12px 16px;
  border-radius: 18px;
  line-height: 1.5;
  word-break: break-word;
  font-size: 13.5px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.message.bot .message-text {
  background: white;
  color: #1E293B;
  border-bottom-left-radius: 4px;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.message.user .message-text {
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
  color: white;
  border-bottom-right-radius: 4px;
}

.message-time {
  font-size: 10px;
  color: #94A3B8;
  margin-top: 4px;
  text-align: right;
}

/* Typing indicator */
.typing-bubble {
  background: white !important;
  border: 1px solid #E2E8F0;
}

.typing-dot {
  width: 6px;
  height: 6px;
  background: #6366F1;
  border-radius: 50%;
  display: inline-block;
  animation: typingBounce 1.4s infinite ease-in-out both;
}

.typing-dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes typingBounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Quick Options */
.quick-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(248, 250, 252, 0.95);
  border-top: 1px solid rgba(226, 232, 240, 0.8);
  max-height: 110px;
  overflow-y: auto;
}

.quick-option-btn {
  background: white;
  color: #4F46E5;
  border: 1px solid #E0E7FF;
  border-radius: 14px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.quick-option-btn:hover {
  background: #EEF2FF;
  border-color: #C7D2FE;
  transform: translateY(-1px);
}

/* Input container */
.chatbot-input-container {
  border-top: 1px solid #E2E8F0;
  background: white;
  border-radius: 0 0 20px 20px;
}

.chatbot-input {
  display: flex;
  padding: 12px 16px 6px;
  align-items: center;
}

.chatbot-input input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  outline: none;
  font-size: 13.5px;
  background: #F8FAFC;
  transition: all 0.2s;
}

.chatbot-input input:focus {
  border-color: #A5B4FC;
  background: white;
  box-shadow: 0 0 0 3px rgba(165, 180, 252, 0.2);
}

.send-btn {
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
  color: white;
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.08);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>