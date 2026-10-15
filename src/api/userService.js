// src/api/userService.js
import axios from 'axios'

const API_BASE = '/api/users'

export const getCurrentUser = async () => {
  return axios.get('/api/auth/me')
}

export const getUserById = async (id) => {
  return axios.get(`${API_BASE}/${id}`)
}

export const updateUserProfile = async (id, data) => {
  return axios.put(`${API_BASE}/${id}`, data)
}

export const changePassword = async (id, payload) => {
  return axios.put(`${API_BASE}/change-password/${id}`, payload)
}

// 🆕 Upload avatar (nếu có backend xử lý)
export const uploadAvatar = async (id, file) => {
  const formData = new FormData()
  formData.append('file', file)
  return axios.post(`${API_BASE}/${id}/avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
