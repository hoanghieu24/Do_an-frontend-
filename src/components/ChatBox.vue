<template>
  <transition name="slide-fade">
    <div 
      v-if="isOpen"
      class="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200/50 backdrop-blur-sm"
    >
      <!-- Header with gradient -->
      <div class="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-5 flex justify-between items-center rounded-t-2xl">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <div class="w-3 h-3 bg-green-400 rounded-full absolute -top-1 -right-1 border-2 border-white animate-pulse"></div>
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 class="font-bold text-lg">Chat với môi giới</h3>
            <p class="text-xs text-white/80">Đang trực tuyến</p>
          </div>
        </div>
        <button 
          @click="$emit('close')" 
          class="p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Messages container with subtle pattern -->
      <div 
        ref="messagesContainer" 
        class="flex-1 p-5 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100"
        style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgwLDAsMCwwLjAxKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')"
      >
        <div 
          v-for="(message, index) in messages" 
          :key="index" 
          :class="['mb-5 transition-all duration-300 transform', 
                  message.sender === 'user' ? 'text-right' : 'text-left']"
        >
          <div 
            :class="['inline-flex flex-col max-w-[80%]', 
                    message.sender === 'user' ? 'items-end' : 'items-start']"
          >
            <div 
              :class="['px-4 py-3 rounded-2xl text-sm shadow-sm relative',
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none']"
            >
              {{ message.text }}
              <!-- Message triangle -->
              <div 
                :class="['absolute w-3 h-3 -bottom-3',
                        message.sender === 'user' 
                          ? 'right-0 bg-gradient-to-r from-indigo-500 to-blue-500 clip-path-triangle-right' 
                          : 'left-0 bg-white border-l border-t border-gray-200 clip-path-triangle-left']"
              ></div>
            </div>
            <div class="text-xs text-gray-500 mt-1.5 px-1">
              {{ message.time }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Input area with floating effect -->
      <div class="p-4 border-t border-gray-200/50 bg-white/90 backdrop-blur-sm">
        <div class="relative flex items-center">
          <input 
            v-model="newMessage"
            @keyup.enter="sendMessage"
            type="text" 
            placeholder="Nhập tin nhắn..."
            class="flex-1 pl-4 pr-12 py-3 border border-gray-300/50 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent bg-black/80 shadow-sm"
          >
          <button 
            @click="sendMessage"
            class="absolute right-2 p-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full hover:shadow-lg transform hover:scale-110 transition-all duration-200"
            :class="{'opacity-50': newMessage.trim() === ''}"
            :disabled="newMessage.trim() === ''"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  messages: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'send-message'])

const newMessage = ref('')
const messagesContainer = ref(null)

const sendMessage = () => {
  if (newMessage.value.trim() === '') return
  
  emit('send-message', newMessage.value)
  newMessage.value = ''
}

// Auto scroll to bottom when new message arrives
watch(() => props.messages, () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}, { deep: true })

onMounted(() => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
})
</script>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}

.clip-path-triangle-right {
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}

.clip-path-triangle-left {
  clip-path: polygon(0 0, 0 100%, 100% 0);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.15);
}
</style>