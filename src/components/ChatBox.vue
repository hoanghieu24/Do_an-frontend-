<template>
  <transition name="slide-fade">
    <div
      v-if="isOpen"
      class="fixed bottom-5 right-5 w-96 sm:w-[420px] h-[640px] max-h-[85vh] flex flex-col bg-white rounded-3xl shadow-2xl z-[10002] overflow-hidden border border-slate-200/80 backdrop-blur-md font-sans"
    >
      <!-- ================= TOP HEADER ================= -->
      <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-4 px-5 flex items-center justify-between shadow-md">
        <div class="flex items-center space-x-3">
          <!-- Back button if in chat room -->
          <button
            v-if="currentView === 'chat'"
            @click="backToConversations"
            class="p-1.5 -ml-1 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
            title="Quay lại danh sách"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Avatar / Icon -->
          <div class="relative">
            <template v-if="currentView === 'chat' && activeConversation">
              <img
                :src="getAvatarUrl(displayPartner.avatar)"
                :alt="displayPartner.name"
                class="w-10 h-10 rounded-full object-cover border-2 border-emerald-400 shadow-xs"
                @error="(e) => e.target.src = '/img/default-broker.png'"
              />
              <span class="w-3 h-3 bg-emerald-400 rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-slate-900 animate-pulse"></span>
            </template>
            <template v-else>
              <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-inner">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </template>
          </div>

          <!-- Titles -->
          <div>
            <h3 class="font-bold text-base leading-tight text-white flex items-center gap-1.5">
              <span>{{ headerTitle }}</span>
            </h3>
            <div class="flex items-center gap-1.5 text-xs text-emerald-300 font-medium mt-0.5">
              <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>{{ headerSubtitle }}</span>
            </div>
          </div>
        </div>

        <!-- Header Actions -->
        <div class="flex items-center space-x-1">
          <!-- Refresh -->
          <button
            @click="refreshCurrentView"
            class="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Làm mới tin nhắn"
          >
            <svg class="w-4 h-4" :class="{'animate-spin': loading}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <!-- Close -->
          <button
            @click="$emit('close')"
            class="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Đóng cửa sổ chat"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- ================= KAFKA STATUS BANNER ================= -->
      <div class="px-4 py-1.5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-[11px] text-emerald-800 font-medium">
        <div class="flex items-center gap-1.5">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span class="font-semibold">Kafka Event Stream</span>
          <span class="text-emerald-600 font-mono">broker-chat-topic</span>
        </div>
        <span class="px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900 font-bold text-[10px]">Active</span>
      </div>

      <!-- ================= VIEW 1: NOT LOGGED IN ================= -->
      <div v-if="!user" class="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50">
        <div class="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h4 class="text-base font-bold text-slate-800 mb-1">Cần đăng nhập tài khoản</h4>
        <p class="text-xs text-slate-500 mb-5 leading-relaxed max-w-xs">
          Vui lòng đăng nhập để trao đổi trực tiếp và lưu lại lịch sử tin nhắn tư vấn với các chuyên viên môi giới.
        </p>
        <button
          @click="$emit('request-login')"
          class="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all active:scale-95"
        >
          Đăng nhập ngay
        </button>
      </div>

      <!-- ================= VIEW 2: CONVERSATIONS LIST ================= -->
      <div v-else-if="currentView === 'conversations'" class="flex-1 flex flex-col overflow-hidden bg-slate-50">
        <!-- Search bar -->
        <div class="p-3 bg-white border-b border-slate-100">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm môi giới hoặc toà nhà..."
              class="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
            <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Conversations scroll list -->
        <div class="flex-1 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
          <div v-if="loading && conversations.length === 0" class="p-8 text-center text-xs text-slate-400">
            <div class="inline-block animate-spin rounded-full h-6 w-6 border-2 border-emerald-500 border-t-transparent mb-2"></div>
            <div>Đang tải cuộc trò chuyện...</div>
          </div>

          <div v-else-if="filteredConversations.length === 0" class="p-10 text-center text-slate-400 text-xs">
            <svg class="w-12 h-12 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p class="font-medium text-slate-600">Chưa có cuộc trò chuyện nào</p>
            <p class="text-[11px] text-slate-400 mt-1">
              Bấm vào nút "Chat với môi giới" trên chi tiết bất động sản để bắt đầu trao đổi.
            </p>
          </div>

          <!-- Conversation Item -->
          <div
            v-for="conv in filteredConversations"
            :key="conv.id"
            @click="selectConversation(conv)"
            class="p-3.5 hover:bg-emerald-50/50 cursor-pointer transition-colors flex items-center gap-3 relative group"
          >
            <!-- Avatar -->
            <div class="relative shrink-0">
              <img
                :src="getAvatarUrl(getPartnerInfo(conv).avatar)"
                :alt="getPartnerInfo(conv).name"
                class="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                @error="(e) => e.target.src = '/img/default-broker.png'"
              />
              <span v-if="conv.unreadCount > 0" class="absolute -top-1 -right-1 px-1.5 py-0.5 bg-rose-500 text-white font-bold text-[10px] rounded-full shadow-xs">
                {{ conv.unreadCount }}
              </span>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <h4 class="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                  {{ getPartnerInfo(conv).name }}
                </h4>
                <span class="text-[10px] text-slate-400 shrink-0 ml-2">
                  {{ formatTime(conv.lastMessageAt) }}
                </span>
              </div>

              <!-- Property Badge if linked -->
              <div v-if="conv.buildingName" class="flex items-center gap-1 mb-1">
                <span class="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-semibold truncate max-w-[190px]">
                  🏢 {{ conv.buildingName }}
                </span>
              </div>

              <!-- Last Message -->
              <p class="text-[11px] text-slate-500 truncate" :class="{'font-bold text-slate-800': conv.unreadCount > 0}">
                {{ conv.lastMessage || 'Bắt đầu cuộc trò chuyện...' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= VIEW 3: ACTIVE CHAT ROOM ================= -->
      <div v-else-if="currentView === 'chat'" class="flex-1 flex flex-col overflow-hidden bg-slate-100">
        <!-- Building Mini Header (nếu có gắn với bất động sản) -->
        <div v-if="activeConversation && activeConversation.buildingName" class="p-2.5 px-4 bg-white border-b border-slate-200 flex items-center justify-between gap-2 shadow-xs shrink-0">
          <div class="flex items-center gap-2.5 min-w-0">
            <img
              :src="getBuildingImageUrl(activeConversation.buildingAvatar)"
              class="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
              @error="(e) => e.target.src = '/img/default-building.png'"
            />
            <div class="min-w-0">
              <div class="text-[11px] font-bold text-slate-800 truncate">
                {{ activeConversation.buildingName }}
              </div>
              <div class="text-[10px] text-emerald-600 font-semibold truncate">
                {{ activeConversation.buildingRentPrice ? formatCurrency(activeConversation.buildingRentPrice) + '/tháng' : 'Đang cho thuê' }}
              </div>
            </div>
          </div>
          <button
            v-if="activeConversation.buildingId"
            @click="openBuildingDetails(activeConversation.buildingId)"
            class="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold transition-all border border-emerald-200 shrink-0"
          >
            Chi tiết
          </button>
        </div>

        <!-- Messages Container -->
        <div
          ref="messagesContainer"
          class="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar"
        >
          <!-- Quick suggestions if few messages -->
          <div v-if="messages.length <= 1" class="p-3 bg-white/80 rounded-2xl border border-slate-200 text-center mb-2">
            <p class="text-xs font-semibold text-slate-700 mb-2">Gợi ý câu hỏi nhanh cho môi giới:</p>
            <div class="flex flex-wrap gap-1.5 justify-center">
              <button
                v-for="(chip, i) in quickChips"
                :key="i"
                @click="sendQuickMessage(chip)"
                class="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-[11px] text-slate-600 transition-colors border border-slate-200"
              >
                {{ chip }}
              </button>
            </div>
          </div>

          <!-- Message Items -->
          <div
            v-for="(msg, index) in messages"
            :key="msg.id || index"
            class="flex flex-col"
            :class="isMyMessage(msg) ? 'items-end' : 'items-start'"
          >
            <div class="flex items-end gap-1.5 max-w-[85%]" :class="isMyMessage(msg) ? 'flex-row-reverse' : 'flex-row'">
              <!-- Partner Avatar (chỉ hiển thị cho người khác) -->
              <img
                v-if="!isMyMessage(msg)"
                :src="getAvatarUrl(msg.senderAvatar)"
                class="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0 mb-1"
                @error="(e) => e.target.src = '/img/default-broker.png'"
              />

              <!-- Bubble -->
              <div
                class="px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-xs"
                :class="isMyMessage(msg)
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'"
              >
                <!-- Sender role badge if broker -->
                <div v-if="!isMyMessage(msg)" class="text-[10px] font-bold text-emerald-600 mb-0.5 flex items-center gap-1">
                  <span>{{ msg.senderName || 'Môi giới' }}</span>
                  <span v-if="msg.senderRole === 'STAFF' || msg.senderRole === 'MANAGER'" class="px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-semibold">Môi giới</span>
                </div>
                <div class="whitespace-pre-wrap break-words">{{ msg.content }}</div>
              </div>
            </div>

            <!-- Timestamp -->
            <span class="text-[9px] text-slate-400 mt-1 px-1">
              {{ formatTime(msg.createdDate) }}
            </span>
          </div>

          <div v-if="sendingMessage" class="flex items-center gap-2 text-xs text-slate-400 italic">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Đang chuyển qua Kafka pipeline...
          </div>
        </div>

        <!-- Input Box -->
        <div class="p-3 bg-white border-t border-slate-200 shrink-0">
          <form @submit.prevent="handleSendMessage" class="flex items-center gap-2">
            <input
              v-model="inputContent"
              type="text"
              placeholder="Nhập câu hỏi hoặc yêu cầu tư vấn..."
              class="flex-1 px-4 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              :disabled="sendingMessage"
            />
            <button
              type="submit"
              :disabled="!inputContent.trim() || sendingMessage"
              class="p-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:opacity-50 disabled:scale-100 text-white font-bold transition-all shadow-sm"
              title="Gửi tin nhắn"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import brokerChatService from '../api/brokerChatService'
import { useToast } from 'vue-toastification'

const toast = useToast()

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    default: null
  },
  // Nếu mở chat cho một tòa nhà cụ thể từ PropertyModal / PropertyCard
  targetBuilding: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'request-login', 'open-building'])

// State
const currentView = ref('conversations') // 'conversations' | 'chat'
const conversations = ref([])
const activeConversation = ref(null)
const messages = ref([])
const inputContent = ref('')
const searchQuery = ref('')
const loading = ref(false)
const sendingMessage = ref(false)
const messagesContainer = ref(null)

// WebSocket reference
let ws = null
let reconnectTimer = null

const quickChips = [
  'Tòa nhà còn diện tích trống không ạ?',
  'Giá thuê có thương lượng được không?',
  'Tôi muốn hẹn lịch đến xem văn phòng trực tiếp',
  'Có chỗ đỗ ô tô và xe máy thuận tiện không?'
]

// Computed Headers
const headerTitle = computed(() => {
  if (currentView.value === 'chat' && activeConversation.value) {
    return displayPartner.value.name
  }
  return 'Tư vấn Môi giới BĐS'
})

const headerSubtitle = computed(() => {
  if (currentView.value === 'chat' && activeConversation.value) {
    if (displayPartner.value.phone) return `Hotline: ${displayPartner.value.phone}`
    return 'Chuyên viên tư vấn'
  }
  return `${conversations.value.length} cuộc trò chuyện`
})

// Đối tác chat (Nếu mình là Khách -> đối tác là Broker; Nếu mình là Broker -> đối tác là Khách)
const displayPartner = computed(() => {
  if (!activeConversation.value) return { name: 'Môi giới', phone: '', avatar: null }
  return getPartnerInfo(activeConversation.value)
})

const getPartnerInfo = (conv) => {
  const myId = props.user?.id
  const isCustomer = conv.customerId === myId
  if (isCustomer) {
    return {
      name: conv.brokerName || 'Chuyên viên BĐS',
      phone: conv.brokerPhone || '',
      avatar: conv.brokerAvatar
    }
  } else {
    return {
      name: conv.customerName || 'Khách hàng',
      phone: '',
      avatar: conv.customerAvatar
    }
  }
}

const isMyMessage = (msg) => {
  if (!props.user) return false
  return msg.senderId === props.user.id
}

const filteredConversations = computed(() => {
  if (!searchQuery.value.trim()) return conversations.value
  const q = searchQuery.value.toLowerCase()
  return conversations.value.filter(c => {
    const partner = getPartnerInfo(c)
    return partner.name?.toLowerCase().includes(q) ||
           c.buildingName?.toLowerCase().includes(q) ||
           c.lastMessage?.toLowerCase().includes(q)
  })
})

// Methods
const fetchConversations = async () => {
  if (!props.user) return
  try {
    loading.value = true
    const res = await brokerChatService.getConversations()
    if (res.data) {
      conversations.value = res.data
    }
  } catch (err) {
    console.error('Lỗi khi tải cuộc trò chuyện:', err)
  } finally {
    loading.value = false
  }
}

const selectConversation = async (conv) => {
  activeConversation.value = conv
  currentView.value = 'chat'
  conv.unreadCount = 0
  await loadMessages(conv.id)
}

const loadMessages = async (conversationId) => {
  try {
    loading.value = true
    const res = await brokerChatService.getMessages(conversationId)
    if (res.data) {
      messages.value = res.data
      scrollToBottom()
    }
  } catch (err) {
    console.error('Lỗi khi tải tin nhắn:', err)
  } finally {
    loading.value = false
  }
}

const backToConversations = () => {
  currentView.value = 'conversations'
  fetchConversations()
}

const refreshCurrentView = () => {
  if (currentView.value === 'chat' && activeConversation.value) {
    loadMessages(activeConversation.value.id)
  } else {
    fetchConversations()
  }
}

// Bắt đầu chat với một bất động sản cụ thể
const startChatWithBuilding = async (buildingData) => {
  if (!props.user) {
    emit('request-login')
    return
  }

  try {
    loading.value = true
    const buildingId = buildingData.buildingId || buildingData.id
    const res = await brokerChatService.startConversation(
      buildingId,
      buildingData.brokerId || null,
      ''
    )
    if (res.data) {
      // Đảm bảo hiển thị đúng 100% tên và hotline của quản lý căn nhà đó
      if (buildingData.managerName) {
        res.data.brokerName = buildingData.managerName
      }
      if (buildingData.managerPhone) {
        res.data.brokerPhone = buildingData.managerPhone
      }
      activeConversation.value = res.data
      currentView.value = 'chat'
      await loadMessages(res.data.id)
    }
  } catch (err) {
    console.error('Lỗi khởi tạo chat với môi giới:', err)
    toast.error('Không thể kết nối với môi giới lúc này')
  } finally {
    loading.value = false
  }
}

// Gửi tin nhắn qua Kafka pipeline
const handleSendMessage = async () => {
  const content = inputContent.value.trim()
  if (!content || !activeConversation.value || sendingMessage.value) return

  const payload = {
    conversationId: activeConversation.value.id,
    content: content,
    buildingId: activeConversation.value.buildingId,
    recipientId: props.user.id === activeConversation.value.customerId
      ? activeConversation.value.brokerId
      : activeConversation.value.customerId
  }

  // Optimistic message append
  const tempMsg = {
    id: Date.now(),
    conversationId: activeConversation.value.id,
    senderId: props.user.id,
    senderName: props.user.fullname || props.user.username,
    senderAvatar: props.user.avatar,
    senderRole: props.user.roles?.[0] || 'USER',
    content: content,
    createdDate: new Date().toISOString()
  }
  messages.value.push(tempMsg)
  activeConversation.value.lastMessage = content
  inputContent.value = ''
  scrollToBottom()

  try {
    sendingMessage.value = true
    const res = await brokerChatService.sendMessage(payload)
    if (res.data && res.data.id) {
      // Cập nhật lại ID tin nhắn từ server
      tempMsg.id = res.data.id
    }
  } catch (err) {
    console.error('Lỗi gửi tin nhắn qua Kafka:', err)
    toast.error('Không thể gửi tin nhắn. Đang thử lại...')
  } finally {
    sendingMessage.value = false
  }
}

const sendQuickMessage = (text) => {
  inputContent.value = text
  handleSendMessage()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const openBuildingDetails = (buildingId) => {
  emit('open-building', buildingId)
}

// WebSocket & Real-time Sync
let heartbeatTimer = null
let syncInterval = null

const startHeartbeat = () => {
  stopHeartbeat()
  heartbeatTimer = setInterval(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify({ type: 'PING' }))
      } catch (e) {}
    }
  }, 20000)
}

const stopHeartbeat = () => {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer)
    heartbeatTimer = null
  }
}

const startBackgroundSync = () => {
  stopBackgroundSync()
  syncInterval = setInterval(async () => {
    if (!props.isOpen || !props.user) return

    // 1. Đồng bộ tin nhắn trong phòng chat hiện tại (0-2s sync guarantee)
    if (currentView.value === 'chat' && activeConversation.value) {
      try {
        const res = await brokerChatService.getMessages(activeConversation.value.id)
        if (res.data && Array.isArray(res.data)) {
          const serverMsgs = res.data
          const curCount = messages.value.length
          const curLastId = curCount > 0 ? messages.value[curCount - 1].id : null
          const srvLastId = serverMsgs.length > 0 ? serverMsgs[serverMsgs.length - 1].id : null

          if (serverMsgs.length !== curCount || srvLastId !== curLastId) {
            messages.value = serverMsgs
            scrollToBottom()
          }
        }
      } catch (e) {}
    }

    // 2. Đồng bộ danh sách cuộc trò chuyện
    try {
      const res = await brokerChatService.getConversations()
      if (res.data && Array.isArray(res.data)) {
        conversations.value = res.data
      }
    } catch (e) {}
  }, 2000)
}

const stopBackgroundSync = () => {
  if (syncInterval) {
    clearInterval(syncInterval)
    syncInterval = null
  }
}

const setupWebSocket = () => {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  // Thử cùng host (proxied bởi Vite) hoặc trực tiếp port 8080
  const wsUrl = `${protocol}//${window.location.host}/ws`

  try {
    ws = new WebSocket(wsUrl)

    ws.onopen = () => {
      console.log('✅ Connected to Real-time Chat WebSocket:', wsUrl)
      startHeartbeat()
    }

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data)
        if (payload.type === 'BROKER_CHAT_MESSAGE' && payload.data) {
          const newMsg = payload.data
          // Nếu đang mở đúng conversation này
          if (activeConversation.value && activeConversation.value.id === newMsg.conversationId) {
            const alreadyExists = messages.value.some(m => m.id === newMsg.id)
            if (!alreadyExists) {
              messages.value.push(newMsg)
              scrollToBottom()
            }
          }

          // Cập nhật lastMessage trong danh sách conversations
          const conv = conversations.value.find(c => c.id === newMsg.conversationId)
          if (conv) {
            conv.lastMessage = newMsg.content
            conv.lastMessageAt = newMsg.createdDate
            if (!activeConversation.value || activeConversation.value.id !== newMsg.conversationId) {
              conv.unreadCount = (conv.unreadCount || 0) + 1
            }
          }
        }
      } catch (e) {}
    }

    ws.onclose = () => {
      stopHeartbeat()
      if (props.isOpen) {
        reconnectTimer = setTimeout(setupWebSocket, 3000)
      }
    }

    ws.onerror = (err) => {
      console.warn('Chat WebSocket connection warning, fast sync is active:', err)
    }
  } catch (err) {
    console.warn('Cannot establish WebSocket connection:', err)
  }
}

// Helpers
const getAvatarUrl = (url) => {
  if (!url) return '/img/default-broker.png'
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const clean = url.startsWith('/') ? url.slice(1) : url
  return `/${clean}`
}

const getBuildingImageUrl = (url) => {
  if (!url) return 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80'
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const clean = url.startsWith('/') ? url.slice(1) : url
  return `/img/${clean}`
}

const formatCurrency = (val) => {
  if (!val) return ''
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)
}

const formatTime = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
}

// Watchers
watch(() => props.isOpen, (val) => {
  if (val && props.user) {
    if (props.targetBuilding) {
      startChatWithBuilding(props.targetBuilding)
    } else if (currentView.value === 'conversations') {
      fetchConversations()
    }
    setupWebSocket()
    startBackgroundSync()
  } else {
    stopBackgroundSync()
    stopHeartbeat()
  }
})

watch(() => props.targetBuilding, (val) => {
  if (val && props.isOpen) {
    startChatWithBuilding(val)
  }
}, { immediate: true, deep: true })

watch(() => props.user, (newVal) => {
  if (newVal) {
    fetchConversations()
    setupWebSocket()
    startBackgroundSync()
  } else {
    conversations.value = []
    activeConversation.value = null
    messages.value = []
    stopBackgroundSync()
    stopHeartbeat()
  }
})

onMounted(() => {
  if (props.user) {
    fetchConversations()
    if (props.isOpen) {
      setupWebSocket()
      startBackgroundSync()
    }
  }
})

onUnmounted(() => {
  if (ws) ws.close()
  if (reconnectTimer) clearTimeout(reconnectTimer)
  stopHeartbeat()
  stopBackgroundSync()
})
</script>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(20px) scale(0.96);
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>