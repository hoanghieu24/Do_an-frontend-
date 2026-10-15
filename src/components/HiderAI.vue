<template>
  <!-- Nút Toggle Tư vấn BĐS (Góc dưới bên phải) -->
  <button 
    class="chatbot-toggle"
    :class="{ 'active': isOpen }"
    @click="toggleChatbot"
    title="Tư vấn Bất động sản Hider"
  >
    <div class="relative flex items-center justify-center">
      <!-- Icon Chuyên viên / Chat -->
      <svg v-if="!isOpen" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      <!-- Pulse dot Online -->
      <span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
    </div>
    <span class="notification-badge" v-if="unreadCount > 0">{{ unreadCount }}</span>
  </button>

  <!-- Khung Chat Chính -->
  <div class="chatbot-container" :class="{ 'open': isOpen }">
    <!-- Header Phong cách Chuyên viên BĐS cao cấp -->
    <div class="chatbot-header">
      <div class="flex items-center gap-3">
        <!-- Avatar chuyên viên tư vấn -->
        <div class="relative">
          <div class="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold text-sm shadow-inner">
            H
          </div>
          <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <h3 class="text-sm font-bold text-white tracking-wide">Chuyên Viên Tư Vấn Hider</h3>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Verified
            </span>
          </div>
          <p class="text-[11px] text-slate-300">Trực tuyến 24/7 · Tư vấn giá & Tour VR 360°</p>
        </div>
      </div>
      <button class="close-btn" @click="toggleChatbot" title="Đóng cửa sổ tư vấn">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

          <!-- Building Cards Carousel / Grid khi có đề xuất tòa nhà -->
          <div v-if="message.buildings && message.buildings.length > 0" class="mt-3 space-y-2.5">
            <div 
              v-for="b in message.buildings" 
              :key="b.id"
              class="bg-white rounded-xl p-3 border border-slate-200 shadow-sm hover:shadow-md transition-all text-left flex flex-col gap-2"
            >
              <div class="flex gap-3 items-start">
                <img 
                  :src="getBuildingImage(b.imageUrl)" 
                  :alt="b.name"
                  class="w-16 h-16 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100"
                  @error="onImageError"
                />
                <div class="flex-1 min-w-0">
                  <h4 class="text-xs font-bold text-slate-900 truncate" :title="b.name">
                    {{ b.name }}
                  </h4>
                  <p class="text-[11px] text-slate-500 truncate mt-0.5">
                    📍 {{ b.address || 'Đang cập nhật địa chỉ' }}
                  </p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs font-extrabold text-emerald-600">
                      {{ formatPrice(b.rentPrice) }}
                    </span>
                    <span v-if="b.area" class="text-[11px] text-slate-400">
                      • {{ b.area }} m²
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons Row -->
              <div class="flex items-center gap-2 pt-1 border-t border-slate-100">
                <button
                  v-if="b.hasVr"
                  type="button"
                  @click="openVrModal(b)"
                  class="flex-1 py-1 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-xs flex items-center justify-center gap-1 transition-all"
                >
                  <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Khám phá VR360</span>
                </button>
                <button
                  type="button"
                  @click="scrollToProperties"
                  class="flex-1 py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium text-center transition-all"
                >
                  Xem danh sách
                </button>
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
            <span class="text-xs text-slate-600 font-medium ml-1.5">Chuyên viên đang tra cứu thông tin tòa nhà...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Options / Gợi ý nhanh Bất động sản -->
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
          placeholder="Hỏi về tòa nhà, quận, ngân sách thuê..."
        />
        <button 
          @click="sendMessage" 
          class="send-btn"
          :disabled="!userInput.trim() || isThinking"
          title="Gửi câu hỏi"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>

      <!-- Footer Info -->
      <div class="px-4 pb-2 text-[10px] text-slate-400 flex justify-between bg-white">
        <span>Tra cứu theo quận, khoảng giá hoặc yêu cầu VR 360°</span>
        <span>{{ userInput.length }}/500</span>
      </div>
    </div>
  </div>

  <!-- Modal xem Tour VR360 trực tiếp khi bấm từ chat -->
  <div 
    v-if="showVrModal"
    class="fixed inset-0 z-[10001] flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
  >
    <div class="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden border border-slate-700">
      <!-- Modal Header -->
      <div class="px-5 py-3.5 bg-slate-950 border-b border-slate-800 text-white flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <div>
            <h4 class="text-sm font-bold">{{ vrBuilding?.name }} - Trải nghiệm thực tế ảo VR 360°</h4>
            <p class="text-[11px] text-slate-400">{{ vrBuilding?.address }}</p>
          </div>
        </div>
        <button 
          @click="showVrModal = false"
          class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
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

// State
const isOpen = ref(false)
const unreadCount = ref(0)
const messages = ref([])
const userInput = ref('')
const isThinking = ref(false)
const messagesContainer = ref(null)

// Modal VR state
const showVrModal = ref(false)
const vrBuilding = ref(null)

// Gợi ý nhanh chuẩn BĐS
const defaultSuggestions = [
  '🏢 Tòa nhà có Tour VR 360°',
  '📍 Văn phòng Quận 1',
  '💰 Giá thuê dưới 50 triệu',
  '📐 Diện tích trên 200 m²'
]

const currentSuggestions = computed(() => {
  for (let i = messages.value.length - 1; i >= 0; i--) {
    const msg = messages.value[i]
    if (msg.sender === 'bot' && msg.suggestions && msg.suggestions.length > 0) {
      return msg.suggestions
    }
  }
  return defaultSuggestions
})

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
        text: 'Xin chào quý khách! Tôi là **chuyên viên tư vấn bất động sản trực tuyến** của Hider. Quý khách muốn tìm kiếm tòa nhà theo khu vực, tầm giá, diện tích hay trải nghiệm **Tour VR 360°**?',
        sender: 'bot',
        timestamp: new Date(),
        suggestions: defaultSuggestions
      }
    ]
  }
  scrollToBottom()
})

watch(messages, (newVal) => {
  localStorage.setItem('hiderai_chat_history', JSON.stringify(newVal))
  if (!isOpen.value && newVal.length > 0 && newVal[newVal.length - 1].sender === 'bot') {
    unreadCount.value++
  }
}, { deep: true })

const toggleChatbot = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    unreadCount.value = 0
    nextTick(() => scrollToBottom())
  }
}

const sendQuickReply = (option) => {
  if (isThinking.value) return
  // Loại bỏ icon emoji ở đầu khi gửi prompt nếu cần
  const cleanOption = option.replace(/^[^\w\sÀ-ỹ]+\s*/, '')
  userInput.value = cleanOption || option
  sendMessage()
}

const openVrModal = (building) => {
  vrBuilding.value = building
  showVrModal.value = true
}

const scrollToProperties = () => {
  isOpen.value = false
  const sec = document.getElementById('property-section')
  if (sec) sec.scrollIntoView({ behavior: 'smooth' })
}

const sendMessage = async () => {
  const input = userInput.value.trim()
  if (!input || isThinking.value) return

  messages.value.push({
    text: input,
    sender: 'user',
    timestamp: new Date()
  })
  userInput.value = ''
  isThinking.value = true
  scrollToBottom()

  try {
    const response = await axios.post('/api/chatbot/openai', {
      userMessage: input
    })

    const data = response.data
    let replyText = 'Xin lỗi quý khách, tôi chưa hiểu rõ yêu cầu. Quý khách có thể nêu chi tiết về khu vực hoặc mức giá mong muốn.'
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
    console.error('Lỗi khi gọi API Chatbot:', error)
    let errorMsg = 'Hệ thống tư vấn đang bận xử lý hoặc gặp sự cố kết nối. Quý khách vui lòng thử lại sau ít phút hoặc liên hệ hotline!'
    if (error.response?.status === 429) {
      errorMsg = 'Quý khách đang gửi tin nhắn hơi nhanh. Vui lòng đợi trong giây lát rồi tiếp tục.'
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
  const num = Number(price)
  if (isNaN(num)) return price
  if (num >= 1000000000) {
    const b = (num / 1000000000).toFixed(1).replace('.0', '')
    return `${b} tỷ đ/tháng`
  }
  if (num >= 1000000) {
    const m = (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1)
    return `${m} triệu đ/tháng`
  }
  return new Intl.NumberFormat('vi-VN').format(num) + ' đ/tháng'
}

const getBuildingImage = (url) => {
  if (!url) return 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80'
  if (url.startsWith('http') || url.startsWith('/')) return url
  return `/img/${url}`
}

const onImageError = (e) => {
  e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80'
}

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
/* Nút toggle chuyên nghiệp phong cách Real Estate Executive */
.chatbot-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background-color: #0f172a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.4), 0 8px 10px -6px rgba(15, 23, 42, 0.3);
  z-index: 9999;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.chatbot-toggle:hover {
  transform: translateY(-2px) scale(1.05);
  background-color: #1e293b;
  box-shadow: 0 14px 30px -4px rgba(15, 23, 42, 0.5);
}

.chatbot-toggle.active {
  transform: scale(1);
}

.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  border: 2px solid #0f172a;
}

/* Container Chat */
.chatbot-container {
  position: fixed;
  bottom: 92px;
  right: 24px;
  width: 380px;
  height: 580px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 120px);
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  z-index: 9999;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.chatbot-container.open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}

/* Header */
.chatbot-header {
  background: #0f172a;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

/* Messages */
.chatbot-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f8fafc;
}

.message {
  display: flex;
  max-width: 85%;
}

.message.user {
  margin-left: auto;
  justify-content: flex-end;
}

.message.bot {
  margin-right: auto;
}

.message-text {
  padding: 10px 14px;
  font-size: 13px;
  line-height: 1.5;
  border-radius: 14px;
}

.message.user .message-text {
  background: #0f172a;
  color: white;
  border-bottom-right-radius: 4px;
}

.message.bot .message-text {
  background: white;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.message-time {
  font-size: 10px;
  color: #94a3b8;
  margin-top: 4px;
  padding: 0 4px;
}

.message.user .message-time {
  text-align: right;
}

/* Typing Indicator */
.typing-bubble {
  background: white;
  border: 1px solid #e2e8f0;
}

.typing-dot {
  width: 6px;
  height: 6px;
  background: #64748b;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-4px); opacity: 1; }
}

/* Quick Options */
.quick-options {
  padding: 8px 12px;
  display: flex;
  gap: 6px;
  overflow-x: auto;
  background: white;
  border-top: 1px solid #f1f5f9;
}

.quick-option-btn {
  white-space: nowrap;
  font-size: 11px;
  font-weight: 600;
  color: #0f172a;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-option-btn:hover {
  background: #e2e8f0;
  border-color: #cbd5e1;
}

/* Input Bar */
.chatbot-input-container {
  background: white;
  border-top: 1px solid #e2e8f0;
}

.chatbot-input {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  gap: 8px;
}

.chatbot-input input {
  flex: 1;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 13px;
  color: #1e293b;
  outline: none;
  transition: all 0.2s;
}

.chatbot-input input:focus {
  background: white;
  border-color: #059669;
  box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.15);
}

.send-btn {
  background: #059669;
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  background: #047857;
}

.send-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}
</style>