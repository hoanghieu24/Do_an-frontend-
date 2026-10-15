<template>
  <div class="seller-requests-container">
    <div class="header">
      <h1>Duyệt Yêu Cầu Trở Thành Seller</h1>
      <div class="stats">
        <span class="badge pending">{{ pendingRequests.length }} đang chờ</span>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Đang tải dữ liệu...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="pendingRequests.length === 0" class="empty-state">
      <div class="empty-icon">📋</div>
      <h3>Không có yêu cầu nào đang chờ</h3>
      <p>Tất cả yêu cầu đã được xử lý.</p>
      <button @click="loadPendingRequests" class="refresh-btn">
        <i class="refresh-icon">🔄</i> Tải lại
      </button>
    </div>

    <!-- Requests List -->
    <div v-else class="requests-list">
      <div v-for="request in pendingRequests" :key="request.id" class="request-card">
        <div class="request-header">
          <div class="request-info">
            <h3>#{{ request.id }} - {{ request.fullName || request.userName || 'Người dùng' }}</h3>
            <p class="email">{{ request.email || 'Chưa cung cấp' }}</p>
            <p class="date">Ngày gửi: {{ formatDate(request.createdDate || request.createdAt) }}</p>
          </div>
          <div class="request-status">
            <span class="status pending">ĐANG CHỜ</span>
          </div>
        </div>

        <div class="request-details">
          <div class="detail-item">
            <span class="label">Số điện thoại:</span>
            <span class="value">{{ request.phoneNumber || request.phone || 'Chưa cung cấp' }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Tài khoản (Username):</span>
            <span class="value font-mono">{{ request.userName || '---' }}</span>
          </div>
          <div v-if="request.address" class="detail-item">
            <span class="label">Địa chỉ:</span>
            <span class="value">{{ request.address }}</span>
          </div>
          <div v-if="request.businessName" class="detail-item">
            <span class="label">Tên doanh nghiệp:</span>
            <span class="value">{{ request.businessName }}</span>
          </div>
          <div v-if="request.taxCode" class="detail-item">
            <span class="label">Mã số thuế:</span>
            <span class="value">{{ request.taxCode }}</span>
          </div>
          <div v-if="request.note || request.reason" class="detail-item">
            <span class="label">Ghi chú / Lý do:</span>
            <span class="value">{{ request.note || request.reason }}</span>
          </div>
        </div>

        <div class="request-actions">
          <button @click="approveRequest(request.id)" 
                  class="btn-approve"
                  :disabled="processingRequest === request.id">
            <span v-if="processingRequest === request.id" class="spinner-small"></span>
            <span v-else>✓ Duyệt</span>
          </button>
          
          <button @click="showRejectModal(request.id)" 
                  class="btn-reject"
                  :disabled="processingRequest === request.id">
            <span v-if="processingRequest === request.id" class="spinner-small"></span>
            <span v-else>✗ Từ chối</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Reject Modal -->
    <div v-if="showRejectDialog" class="modal-overlay" @click.self="closeRejectDialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Từ chối yêu cầu #{{ selectedRequestId }}</h3>
          <button @click="closeRejectDialog" class="close-btn">×</button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label for="rejectNote">Lý do từ chối:</label>
            <textarea 
              id="rejectNote"
              v-model="rejectNote"
              placeholder="Nhập lý do từ chối..."
              rows="4"
              class="reject-textarea"
              :disabled="processing"
            ></textarea>
            <small class="note-hint">Lý do này sẽ được gửi đến người dùng.</small>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeRejectDialog" 
                  class="btn-cancel"
                  :disabled="processing">
            Hủy
          </button>
          <button @click="rejectRequest" 
                  class="btn-confirm-reject"
                  :disabled="!rejectNote.trim() || processing">
            <span v-if="processing" class="spinner-small"></span>
            <span v-else>Xác nhận từ chối</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast.show" :class="`toast toast-${toast.type}`">
      <span class="toast-icon">{{ toast.type === 'success' ? '✓' : '✗' }}</span>
      <span class="toast-message">{{ toast.message }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pendingRequests: [],
      loading: false,
      showRejectDialog: false,
      selectedRequestId: null,
      rejectNote: '',
      processing: false,
      processingRequest: null,
      toast: {
        show: false,
        message: '',
        type: 'success'
      }
    };
  },

  mounted() {
    this.loadPendingRequests();
  },

  methods: {
    async loadPendingRequests() {
      this.loading = true;
      try {
        // Gọi API lấy danh sách yêu cầu đang chờ
        const response = await axios.get('/api/admin/seller-request/pending', {
          headers: this.getAuthHeaders()
        });
        this.pendingRequests = response.data;
      } catch (error) {
        console.error('Lỗi khi tải yêu cầu:', error);
        this.showToast('Có lỗi xảy ra khi tải dữ liệu', 'error');
      } finally {
        this.loading = false;
      }
    },

    async approveRequest(requestId) {
      if (!confirm('Bạn có chắc chắn muốn duyệt yêu cầu này?')) {
        return;
      }

      this.processingRequest = requestId;
      try {
        // Gọi API duyệt yêu cầu
        await axios.post(`/api/admin/seller-request/${requestId}/approve`, {}, {
          headers: this.getAuthHeaders()
        });
        
        // Xóa yêu cầu đã duyệt khỏi danh sách
        this.pendingRequests = this.pendingRequests.filter(req => req.id !== requestId);
        this.showToast('Đã duyệt yêu cầu thành công', 'success');
      } catch (error) {
        console.error('Lỗi khi duyệt yêu cầu:', error);
        this.showToast('Có lỗi xảy ra khi duyệt yêu cầu', 'error');
      } finally {
        this.processingRequest = null;
      }
    },

    showRejectModal(requestId) {
      this.selectedRequestId = requestId;
      this.rejectNote = '';
      this.showRejectDialog = true;
    },

    closeRejectDialog() {
      if (!this.processing) {
        this.showRejectDialog = false;
        this.selectedRequestId = null;
        this.rejectNote = '';
      }
    },

    async rejectRequest() {
      if (!this.rejectNote.trim()) {
        this.showToast('Vui lòng nhập lý do từ chối', 'error');
        return;
      }

      this.processing = true;
      try {
        // Gọi API từ chối yêu cầu
        await axios.post(`/api/admin/seller-request/${this.selectedRequestId}/reject`, 
          this.rejectNote,
          {
            headers: {
              ...this.getAuthHeaders(),
              'Content-Type': 'text/plain'
            }
          }
        );
        
        // Xóa yêu cầu đã từ chối khỏi danh sách
        this.pendingRequests = this.pendingRequests.filter(req => req.id !== this.selectedRequestId);
        this.showToast('Đã từ chối yêu cầu', 'success');
        this.closeRejectDialog();
      } catch (error) {
        console.error('Lỗi khi từ chối yêu cầu:', error);
        this.showToast('Có lỗi xảy ra khi từ chối yêu cầu', 'error');
      } finally {
        this.processing = false;
      }
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN');
    },

    getAuthHeaders() {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('access_token') || localStorage.getItem('jwt') || '';
      return token ? { 'Authorization': `Bearer ${token}` } : {};
    },

    showToast(message, type = 'success') {
      this.toast = {
        show: true,
        message,
        type
      };
      
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.seller-requests-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
}

.header h1 {
  margin: 0;
  color: #333;
  font-size: 24px;
}

.stats .badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
}

.badge.pending {
  background: #ffd700;
  color: #333;
}

.loading {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  margin: 0 0 10px 0;
  color: #6c757d;
}

.empty-state p {
  color: #adb5bd;
  margin-bottom: 20px;
}

.refresh-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.requests-list {
  display: grid;
  gap: 20px;
}

.request-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e0e0e0;
}

.request-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.request-info h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.email {
  color: #666;
  margin: 0 0 5px 0;
  font-size: 14px;
}

.date {
  color: #999;
  margin: 0;
  font-size: 13px;
}

.request-status .status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status.pending {
  background: #fff3cd;
  color: #856404;
}

.request-details {
  display: grid;
  gap: 10px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  gap: 10px;
}

.detail-item .label {
  font-weight: 600;
  color: #555;
  min-width: 140px;
}

.detail-item .value {
  color: #666;
  flex: 1;
}

.request-actions {
  display: flex;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.btn-approve {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-approve:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-reject {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-reject:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  line-height: 1;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

.reject-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
}

.reject-textarea:disabled {
  background: #f8f9fa;
  cursor: not-allowed;
}

.note-hint {
  color: #6c757d;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
}

.btn-cancel {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-cancel:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-confirm-reject {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 150px;
}

.btn-confirm-reject:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 6px;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideIn 0.3s ease;
  z-index: 1001;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.toast-success {
  background: #28a745;
}

.toast-error {
  background: #dc3545;
}

.toast-icon {
  font-weight: bold;
}

.toast-message {
  flex: 1;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .request-header {
    flex-direction: column;
    gap: 10px;
  }
  
  .request-actions {
    flex-direction: column;
  }
  
  .modal-content {
    margin: 10px;
  }
}
</style>