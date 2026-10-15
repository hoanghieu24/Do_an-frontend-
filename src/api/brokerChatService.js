// src/api/brokerChatService.js
import axios from 'axios'

const API_BASE = '/api/chat/broker'

export const brokerChatService = {
  // Bắt đầu hoặc mở cuộc hội thoại với môi giới (cho tòa nhà hoặc broker cụ thể)
  startConversation: async (buildingId, brokerId, initialMessage = '') => {
    return axios.post(`${API_BASE}/start`, {
      buildingId,
      brokerId,
      initialMessage
    })
  },

  // Lấy danh sách tất cả các cuộc hội thoại của người dùng hiện tại (khách hàng hoặc môi giới)
  getConversations: async () => {
    return axios.get(`${API_BASE}/conversations`)
  },

  // Lấy lịch sử tin nhắn trong một cuộc hội thoại
  getMessages: async (conversationId) => {
    return axios.get(`${API_BASE}/conversations/${conversationId}/messages`)
  },

  // Gửi tin nhắn mới (Event Kafka)
  sendMessage: async (payload) => {
    // payload: { conversationId, content, buildingId, recipientId }
    return axios.post(`${API_BASE}/send`, payload)
  },

  // Lấy thông tin môi giới phụ trách tòa nhà
  getBuildingBroker: async (buildingId) => {
    return axios.get(`${API_BASE}/building/${buildingId}/broker`)
  }
}

export default brokerChatService
