<template>
  <div class="dashboard-admin">
    <!-- Gradient Background Layer -->
    <div class="background-gradients">
      <div class="gradient-circle-1"></div>
      <div class="gradient-circle-2"></div>
      <div class="gradient-circle-3"></div>
    </div>

    <!-- Main Content -->
    <div class="dashboard-content">
      <!-- Header Section -->
      <div class="dashboard-header animate-slide-down">
        <div class="header-left">
          <h1 class="greeting-text">
            <span class="greeting">Xin chào,</span>
            <span class="username">{{ currentUser.name }}</span>
          </h1>
          <p class="header-subtitle">Chúc bạn một ngày làm việc hiệu quả và tràn đầy năng lượng ✨</p>
        </div>
        <div class="header-right">
          <div class="date-time-card">
            <div class="current-time">{{ currentTime }}</div>
            <div class="current-date">{{ currentDate }}</div>
          </div>
        </div>
      </div>

      <!-- Stats Cards Grid -->
      <div class="stats-grid">
        <!-- Total Customers Card -->
        <div class="stat-card customer-card animate-slide-up delay-100">
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="stat-header">
              <div class="icon-wrapper bg-blue-500/10">
                <svg class="icon" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div class="trend-badge" :class="stats.customersGrowth >= 0 ? 'positive' : 'negative'">
                <span>{{ stats.customersGrowth >= 0 ? '↑' : '↓' }}</span>
                <span>{{ Math.abs(stats.customersGrowth) }}%</span>
              </div>
            </div>
            <div class="stat-body">
              <div class="stat-value">{{ stats.totalCustomers.toLocaleString() }}</div>
              <div class="stat-label">Tổng khách hàng</div>
            </div>
            <div class="stat-footer">
              <span class="comparison-text">So với tháng trước</span>
            </div>
          </div>
        </div>

        <!-- Total Buildings Card -->
        <div class="stat-card building-card animate-slide-up delay-200">
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="stat-header">
              <div class="icon-wrapper bg-emerald-500/10">
                <svg class="icon" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div class="trend-badge" :class="stats.buildingsGrowth >= 0 ? 'positive' : 'negative'">
                <span>{{ stats.buildingsGrowth >= 0 ? '↑' : '↓' }}</span>
                <span>{{ Math.abs(stats.buildingsGrowth) }}%</span>
              </div>
            </div>
            <div class="stat-body">
              <div class="stat-value">{{ stats.totalBuildings.toLocaleString() }}</div>
              <div class="stat-label">Tổng tòa nhà</div>
            </div>
            <div class="stat-footer">
              <span class="comparison-text">So với tháng trước</span>
            </div>
          </div>
        </div>

        <!-- Active Contracts Card -->
        <div class="stat-card contract-card animate-slide-up delay-300">
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="stat-header">
              <div class="icon-wrapper bg-amber-500/10">
                <svg class="icon" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <div class="trend-badge" :class="stats.contractsGrowth >= 0 ? 'positive' : 'negative'">
                <span>{{ stats.contractsGrowth >= 0 ? '↑' : '↓' }}</span>
                <span>{{ Math.abs(stats.contractsGrowth) }}%</span>
              </div>
            </div>
            <div class="stat-body">
              <div class="stat-value">{{ stats.activeContracts.toLocaleString() }}</div>
              <div class="stat-label">Hợp đồng đang hoạt động</div>
            </div>
            <div class="stat-footer">
              <span class="comparison-text">So với tháng trước</span>
            </div>
          </div>
        </div>

        <!-- Monthly Revenue Card -->
        <div class="stat-card revenue-card animate-slide-up delay-400">
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="stat-header">
              <div class="icon-wrapper bg-rose-500/10">
                <svg class="icon" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="trend-badge" :class="stats.revenueGrowth >= 0 ? 'positive' : 'negative'">
                <span>{{ stats.revenueGrowth >= 0 ? '↑' : '↓' }}</span>
                <span>{{ Math.abs(stats.revenueGrowth) }}%</span>
              </div>
            </div>
            <div class="stat-body">
              <div class="stat-value">{{ formatCurrency(stats.monthlyRevenue) }}</div>
              <div class="stat-label">Doanh thu tháng này</div>
            </div>
            <div class="stat-footer">
              <span class="comparison-text">So với tháng trước</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="content-grid">
        <!-- Left Column -->
        <div class="left-column">
          <!-- Quick Actions -->
          <div class="actions-card animate-fade-in delay-200">
            <div class="card-header">
              <h3 class="card-title">Thao tác nhanh</h3>
            </div>
            <div class="actions-grid">
              <router-link to="/admin/customers/create" class="action-button">
                <div class="action-icon bg-blue-500/10">
                  <svg class="icon" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
                <span class="action-text">Thêm khách hàng</span>
              </router-link>
              <router-link to="/admin/buildings/create" class="action-button">
                <div class="action-icon bg-emerald-500/10">
                  <svg class="icon" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <span class="action-text">Thêm tòa nhà</span>
              </router-link>
              <router-link to="/admin/contracts/create" class="action-button">
                <div class="action-icon bg-amber-500/10">
                  <svg class="icon" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <span class="action-text">Tạo hợp đồng</span>
              </router-link>
              <router-link to="/admin/reports" class="action-button">
                <div class="action-icon bg-rose-500/10">
                  <svg class="icon" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <span class="action-text">Xem báo cáo</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- System Status Bar -->
      <div class="status-bar animate-fade-in delay-500">
        <div class="status-item">
          <div class="status-dot online"></div>
          <span>Hệ thống</span>
          <span class="status-text">Hoạt động tốt</span>
        </div>
        <div class="status-item">
          <div class="status-dot online"></div>
          <span>Database</span>
          <span class="status-text">Online</span>
        </div>
        <div class="status-item">
          <div class="status-dot online"></div>
          <span>API Services</span>
          <span class="status-text">Stable</span>
        </div>
        <div class="status-item">
          <div class="status-dot warning"></div>
          <span>Storage</span>
          <span class="status-text">78% used</span>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <div class="loading-text">Đang tải dữ liệu...</div>
        <div class="loading-subtext">Vui lòng đợi trong giây lát</div>
      </div>
    </div>

    <!-- Error Toast -->
    <!-- <div v-if="error" class="error-toast animate-slide-down">
      <div class="toast-content">
        <svg class="toast-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <div class="toast-message">
          <strong>Lỗi tải dữ liệu:</strong> {{ error }}
        </div>
        <button @click="loadDashboardData" class="toast-button">
          Thử lại
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      isLoading: true,
      error: null,
      currentUser: {
        name: '',
        role: ''
      },
      currentTime: '',
      currentDate: '',
      stats: {
        totalCustomers: 0,
        totalBuildings: 0,
        activeContracts: 0,
        monthlyRevenue: 0,
        customersGrowth: 0,
        buildingsGrowth: 0,
        contractsGrowth: 0,
        revenueGrowth: 0,
        newCustomersThisWeek: 0,
        pendingContracts: 0,
        availableBuildings: 0,
        totalStaff: 0
      },
      recentActivities: [],
      upcomingEvents: []
    };
  },
  computed: {
    userInitials() {
      return this.currentUser.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
    },
    displayRole() {
      if (this.currentUser.role === 'ROLE_MANAGER') return 'Admin';
      if (this.currentUser.role === 'ROLE_STAFF') return 'Nhân viên';
      return this.currentUser.role;
    }
  },
  created() {
    this.loadCurrentUser();
  },
  mounted() {
    this.updateDateTime();
    this.loadDashboardData();
    this.timeInterval = setInterval(this.updateDateTime, 60000);
  },
  beforeUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  },
  methods: {
    loadCurrentUser() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        let name = user.fullname;

        if (Array.isArray(name)) {
          name = name.join(' ');
        } else if (typeof name === 'string' && name.startsWith('[')) {
          try {
            name = JSON.parse(name).join(' ');
          } catch {
            // fallback giữ nguyên nếu lỗi
          }
        }

        this.currentUser.name = name;
        this.currentUser.role = user.roles?.[0] || 'ROLE_USER';
      }
    },
    updateDateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit'
      });
      this.currentDate = now.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    getAuthToken() {
      return localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('access_token') || localStorage.getItem('jwt') || '';
    },
    async loadDashboardData() {
      try {
        this.isLoading = true;
        this.error = null;

        const token = this.getAuthToken();
        if (!token) {
          throw new Error('Không tìm thấy token xác thực');
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        const [statsResponse, activitiesResponse, eventsResponse] = await Promise.all([
          axios.get('/api/admin/dashboard/stats', config),
          axios.get('/api/admin/activities', config),
          axios.get('/api/admin/dashboard/events', config)
        ]);

        this.stats = { ...this.stats, ...statsResponse.data };
        this.recentActivities = activitiesResponse.data;
        this.upcomingEvents = eventsResponse.data;

      } catch (error) {
        console.error('Error loading dashboard data:', error);
        this.error = this.getErrorMessage(error);
        await this.loadIndividualAPIs();
      } finally {
        this.isLoading = false;
      }
    },
    async loadIndividualAPIs() {
      try {
        const token = this.getAuthToken();
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        const endpoints = [
          '/api/admin/customers/count',
          '/api/admin/buildings/count', 
          '/api/admin/contracts/active/count',
          '/api/admin/revenue/monthly'
        ];

        const responses = await Promise.allSettled(
          endpoints.map(endpoint => axios.get(endpoint, config))
        );

        this.processAPIResponses(responses);

      } catch (error) {
        console.error('Error loading individual APIs:', error);
        this.loadDemoData();
      }
    },
    processAPIResponses(responses) {
      responses.forEach((response, index) => {
        if (response.status === 'fulfilled') {
          const data = response.value.data;
          switch (index) {
            case 0:
              this.stats.totalCustomers = data.count || data.total || 0;
              break;
            case 1:
              this.stats.totalBuildings = data.count || data.total || 0;
              break;
            case 2:
              this.stats.activeContracts = data.count || data.total || 0;
              break;
            case 3:
              this.stats.monthlyRevenue = data.amount || data.revenue || 0;
              break;
          }
        }
      });
    },
    getErrorMessage(error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            return 'Không có quyền truy cập. Vui lòng đăng nhập lại.';
          case 403:
            return 'Bạn không có quyền truy cập trang này.';
          case 404:
            return 'Không tìm thấy dữ liệu.';
          case 500:
            return 'Lỗi máy chủ. Vui lòng thử lại sau.';
          default:
            return `Lỗi: ${error.response.status}`;
        }
      } else if (error.request) {
        return 'Không thể kết nối đến máy chủ.';
      } else {
        return error.message || 'Đã xảy ra lỗi không xác định.';
      }
    },
    loadDemoData() {
      this.stats = {
        totalCustomers: 1245,
        totalBuildings: 89,
        activeContracts: 342,
        monthlyRevenue: 245000000,
        customersGrowth: 12,
        buildingsGrowth: 5,
        contractsGrowth: 8,
        revenueGrowth: 18,
        newCustomersThisWeek: 45,
        pendingContracts: 12,
        availableBuildings: 8,
        totalStaff: 24
      };
      
      this.recentActivities = [
        { id: 1, type: 'customer', description: 'Khách hàng mới đăng ký: Nguyễn Văn A', timestamp: new Date(Date.now() - 300000) },
        { id: 2, type: 'contract', description: 'Hợp đồng mới được tạo: CT-2024-0012', timestamp: new Date(Date.now() - 900000) },
        { id: 3, type: 'building', description: 'Tòa nhà mới được thêm vào hệ thống', timestamp: new Date(Date.now() - 1800000) },
        { id: 4, type: 'user', description: 'Nhân viên mới: Trần Thị B', timestamp: new Date(Date.now() - 3600000) }
      ];
      
      this.upcomingEvents = [
        { id: 1, title: 'Họp đánh giá quý', date: new Date(Date.now() + 86400000), status: 'upcoming' },
        { id: 2, title: 'Training nhân viên mới', date: new Date(Date.now() + 172800000), status: 'upcoming' },
        { id: 3, title: 'Bảo trì hệ thống', date: new Date(Date.now() + 259200000), status: 'upcoming' }
      ];
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    },
    formatTimeAgo(timestamp) {
      const now = new Date();
      const diffInMinutes = Math.floor((now - new Date(timestamp)) / (1000 * 60));
      if (diffInMinutes < 1) return 'Vừa xong';
      if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours} giờ trước`;
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ngày trước`;
    },
    formatEventDay(date) {
      return new Date(date).getDate();
    },
    formatEventMonth(date) {
      return new Date(date).toLocaleDateString('vi-VN', { month: 'short' });
    },
    formatEventTime(date) {
      return new Date(date).toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    },
    getActivityIcon(type) {
      const icons = {
        customer: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        contract: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
        building: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
      };
      return icons[type] || icons.user;
    },
    getActivityColor(type) {
      const colors = {
        customer: 'text-blue-500 bg-blue-500/10',
        contract: 'text-emerald-500 bg-emerald-500/10',
        building: 'text-purple-500 bg-purple-500/10',
        user: 'text-amber-500 bg-amber-500/10'
      };
      return colors[type] || 'text-gray-500 bg-gray-500/10';
    }
  }
};
</script>

<style scoped>
.dashboard-admin {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow-x: hidden;
}

.background-gradients {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.gradient-circle-1,
.gradient-circle-2,
.gradient-circle-3 {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}

.gradient-circle-1 {
  width: 800px;
  height: 800px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  top: -400px;
  right: -200px;
  animation: float 20s ease-in-out infinite;
}

.gradient-circle-2 {
  width: 600px;
  height: 600px;
  background: linear-gradient(45deg, #f093fb, #f5576c);
  bottom: -300px;
  left: -150px;
  animation: float 25s ease-in-out infinite reverse;
}

.gradient-circle-3 {
  width: 400px;
  height: 400px;
  background: linear-gradient(45deg, #4facfe, #00f2fe);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float 30s ease-in-out infinite;
}

.dashboard-content {
  position: relative;
  z-index: 1;
  padding: 24px;
  max-width: 1600px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  color: white;
}

.header-left {
  flex: 1;
}

.greeting-text {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 8px;
}

.greeting {
  display: block;
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
}

.username {
  background: linear-gradient(45deg, #ffd89b, #19547b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
}

.date-time-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  min-width: 180px;
}

.current-time {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.current-date {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, currentColor, transparent);
  opacity: 0.3;
}

.customer-card .card-glow { color: #3b82f6; }
.building-card .card-glow { color: #10b981; }
.contract-card .card-glow { color: #f59e0b; }
.revenue-card .card-glow { color: #ef4444; }

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 24px;
  height: 24px;
}

.trend-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.trend-badge.positive {
  background: rgba(34, 197, 94, 0.1);
  color: #10b981;
}

.trend-badge.negative {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.stat-body {
  margin-bottom: 16px;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.stat-footer {
  border-top: 1px solid rgba(209, 213, 219, 0.3);
  padding-top: 12px;
}

.comparison-text {
  font-size: 0.75rem;
  color: #9ca3af;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.activity-feed-card,
.events-card,
.actions-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.view-all-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  color: #3b82f6;
  text-decoration: none;
  transition: all 0.2s ease;
}

.view-all-link:hover {
  color: #2563eb;
  gap: 8px;
}

.link-arrow {
  width: 16px;
  height: 16px;
  transition: all 0.2s ease;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.activity-item:hover {
  background: #f9fafb;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-sm {
  width: 20px;
  height: 20px;
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-description {
  font-size: 0.875rem;
  color: #1f2937;
  margin-bottom: 2px;
  line-height: 1.4;
}

.activity-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

.quick-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.quick-stat-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.quick-stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.quick-stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 4px;
}

.quick-stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 2px;
}

.quick-stat-subtitle {
  font-size: 0.75rem;
  color: #9ca3af;
}

.events-count {
  font-size: 0.875rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 12px;
  border-radius: 9999px;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 16px;
  transition: all 0.2s ease;
}

.event-item:hover {
  background: #f3f4f6;
  transform: translateX(4px);
}

.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 56px;
}

.event-day {
  font-size: 1.5rem;
  font-weight: 800;
  color: #3b82f6;
}

.event-month {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
}

.event-details {
  flex: 1;
}

.event-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2px;
}

.event-time {
  font-size: 0.75rem;
  color: #6b7280;
}

.event-status {
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 9999px;
  font-weight: 600;
}

.event-status.upcoming {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.action-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: #f3f4f6;
  transform: translateY(-2px);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
}

.status-bar {
  display: flex;
  justify-content: center;
  gap: 32px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #6b7280;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.online {
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.status-dot.warning {
  background: #f59e0b;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
}

.status-text {
  font-weight: 600;
  color: #1f2937;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-content {
  text-align: center;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.loading-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.loading-subtext {
  font-size: 0.875rem;
  color: #6b7280;
}

.error-toast {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #fef2f2;
  border: 1px solid #fee2e2;
  border-radius: 16px;
  padding: 16px 24px;
  box-shadow: 0 8px 32px rgba(239, 68, 68, 0.2);
  z-index: 9999;
  min-width: 400px;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-icon {
  width: 24px;
  height: 24px;
  color: #ef4444;
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  font-size: 0.875rem;
  color: #1f2937;
}

.toast-button {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toast-button:hover {
  background: #dc2626;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-slide-down {
  animation: slideDown 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .greeting-text {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-stats-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .status-bar {
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .error-toast {
    min-width: calc(100% - 48px);
    margin: 0 24px;
  }
}
</style>