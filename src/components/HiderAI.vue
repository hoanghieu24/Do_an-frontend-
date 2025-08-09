<template>
  <!-- Nút toggle hình tròn -->
  <button 
  class="fixed bottom-6 right-20 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none"
    :class="{ 'active': isOpen }"
    @click="toggleChatbot"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
    <span class="notification-badge" v-if="unreadCount > 0">{{ unreadCount }}</span>
  </button>

  <!-- Khung chat -->
  <div class="chatbot-container" :class="{ 'open': isOpen }">
    <div class="chatbot-header">
      <div class="header-content">
        <h3>HiderAI Assistant</h3>
        <p>Chúng tôi có thể giúp gì cho bạn?</p>
      </div>
      <button class="close-btn" @click="toggleChatbot">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <div class="chatbot-messages" ref="messagesContainer">
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        :class="['message', message.sender]"
      >
        <div class="message-content">
          <!-- Sửa phần hiển thị tin nhắn bot -->
          <template v-if="message.sender === 'bot'">
            <div 
              class="message-text" 
              v-html="formatBotMessage(message.text)"
            ></div>
          </template>
          <template v-else>
            <div class="message-text">{{ message.text }}</div>
          </template>
          <div class="message-time">{{ formatTime(message.timestamp) }}</div>
        </div>
      </div>
    </div>

    <div class="quick-options" v-if="showQuickOptions && isOpen">
      <button 
        v-for="(option, idx) in quickOptions" 
        :key="idx"
        @click="sendQuickReply(option)"
        class="quick-option-btn"
      >
        {{ option }}
      </button>
    </div>

    <div class="chatbot-input">
      <input 
        v-model="userInput"
        @keyup.enter="sendMessage"
        type="text" 
        placeholder="Nhập tin nhắn của bạn..."
      >
      <button @click="sendMessage" class="send-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import axios from 'axios'

const isOpen = ref(false)
const unreadCount = ref(0)
const messages = ref([
  {
    text: 'Chào bạn! Tôi là HiderAI, có thể hỗ trợ bạn hôm nay?',
    sender: 'bot',
    timestamp: new Date()
  }
])
const userInput = ref('')
const quickOptions = ref([
  'Tìm bất động sản',
  'Xem giá thị trường',
])

const showQuickOptions = ref(true)

watch(messages, (newVal) => {
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
const formatBotMessage = (text) => {
  // Xử lý các đoạn văn bản dài thành các paragraph
  const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);
  
  // Format các mục bullet points
  const formattedParagraphs = paragraphs.map(paragraph => {
    // Xử lý bullet points
    if (paragraph.startsWith('- ')) {
      return `<p class="bullet-point">${paragraph.substring(2)}</p>`;
    }
    // Xử lý tiêu đề
    if (paragraph.match(/^[A-Z][A-Z\s]+:$/)) {
      return `<p class="section-title">${paragraph}</p>`;
    }
    let formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Giữ lại các từ đã in đậm
    .replace(/^\*\s(.*$)/gm, '<strong>$1</strong>') // Xử lý các dòng bắt đầu bằng *
    .replace(/\n\n/g, '</p><p>'); // Xử lý xuống dòng

  return `<p>${formattedText}</p>`;
    // Xử lý đoạn văn bình thường
    return `<p>${paragraph}</p>`;
  });
  
  return formattedParagraphs.join('');
}
const sendMessage = async () => {
  const input = userInput.value.trim()
  if (!input) return

  messages.value.push({
    text: input,
    sender: 'user',
    timestamp: new Date()
  })
  userInput.value = ''
  scrollToBottom()

  try {
    const response = await axios.post('http://localhost:8080/api/chatbot/openai', {
      userMessage: input
    })
    
    messages.value.push({
      text: response.data || 'Xin lỗi, tôi không hiểu câu hỏi của bạn.',
      sender: 'bot',
      timestamp: new Date()
    })
  } catch (error) {
    console.error('Lỗi API:', error)
    messages.value.push({
      text: 'Xin lỗi, hệ thống đang gặp sự cố. Vui lòng thử lại sau.',
      sender: 'bot',
      timestamp: new Date()
    })
  }
  
  scrollToBottom()
}

const sendQuickReply = (option) => {
  userInput.value = option
  sendMessage()
}

const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const scrollToBottom = () => {
  nextTick(() => {
    const container = messagesContainer.value
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.message.bot .message-text {
  white-space: pre-wrap;
  text-align: left;
  line-height: 1.6;
}

.message.bot .message-text p {
  margin: 0 0 12px 0;
  font-size: 15px;
  color: #334155;
}

.message.bot .message-text p:last-child {
  margin-bottom: 0;
}

.message.bot .message-text .section-title {
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 8px;
  font-size: 16px;
}

.message.bot .message-text .bullet-point {
  position: relative;
  padding-left: 18px;
}

.message.bot .message-text .bullet-point::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4F46E5;
  font-weight: bold;
}
.message.bot .message-text strong {
  font-weight: 600;
  color: #4F46E5;
}
/* Highlight các từ quan trọng */
.message.bot .message-text strong {
  color: #4F46E5;
  font-weight: 600;
}
/* Nút toggle */
.chatbot-toggle {
  position: fixed;
  bottom: 15px;
  right: 90px;
  width: 70px;
  height: 65px;
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 25px rgba(79, 70, 229, 0.4);
  z-index: 9998;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.chatbot-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 30px rgba(79, 70, 229, 0.5);
}

.chatbot-toggle.active {
  background: linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%);
  transform: scale(1.05);
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #EF4444;
  color: white;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

/* Khung chat */
.chatbot-container {
  position: fixed;
  bottom: 120px;
  right: 30px;
  width: 420px;
  max-height: 0;
  overflow: hidden;
  background: white;
  border-radius: 18px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  transform: translateY(20px);
  display: flex;
  flex-direction: column;
}

.chatbot-container.open {
  max-height: 700px;
  height: 70vh;
  opacity: 1;
  transform: translateY(0);
}

.chatbot-header {
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  color: white;
  padding: 20px;
  border-radius: 18px 18px 0 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  flex: 1;
}

.chatbot-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.chatbot-header p {
  margin: 6px 0 0;
  font-size: 14px;
  opacity: 0.9;
  font-weight: 400;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-left: 15px;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Tin nhắn */
.chatbot-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #F8FAFC;
  scroll-behavior: smooth;
}

.message {
  margin-bottom: 20px;
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.bot {
  justify-content: flex-start;
}

.message-content {
  max-width: 80%;
}

.message-text {
  padding: 14px 18px;
  border-radius: 20px;
  line-height: 1.5;
  word-break: break-word;
  font-size: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.message.bot .message-text {
  background: white;
  color: #1E293B;
  border-bottom-left-radius: 4px;
  border: 1px solid #E2E8F0;
}

.message.user .message-text {
  background: #4F46E5;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-time {
  font-size: 12px;
  color: #64748B;
  margin-top: 6px;
  text-align: right;
}

/* Các tùy chọn nhanh */
.quick-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 20px 20px;
  background: #F8FAFC;
}

.quick-option-btn {
  background: white;
  color: #4F46E5;
  border: 1px solid #E2E8F0;
  border-radius: 20px;
  padding: 10px 18px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
}

.quick-option-btn:hover {
  background: #EEF2FF;
  border-color: #C7D2FE;
  transform: translateY(-1px);
}

/* Input chat */
.chatbot-input {
  display: flex;
  padding: 16px 20px;
  border-top: 1px solid #E2E8F0;
  background: white;
  align-items: center;
  color : black
}

.chatbot-input input {
  flex: 1;
  padding: 14px 18px;
  border: 1px solid #E2E8F0;
  border-radius: 24px;
  outline: none;
  font-size: 15px;
  transition: all 0.2s;
  background: #F8FAFC;
}

.chatbot-input input:focus {
  border-color: #A5B4FC;
  background: white;
  box-shadow: 0 0 0 3px rgba(165, 180, 252, 0.3);
}

.send-btn {
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin-left: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.send-btn:hover {
  background: #4338CA;
  transform: scale(1.05);
}

/* Scrollbar */
.chatbot-messages::-webkit-scrollbar {
  width: 8px;
}

.chatbot-messages::-webkit-scrollbar-track {
  background: #F1F5F9;
  border-radius: 4px;
}

.chatbot-messages::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 4px;
}

.chatbot-messages::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}

/* Animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message {
  animation: fadeIn 0.3s ease-out;
}
</style>