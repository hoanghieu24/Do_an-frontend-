<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click.self="onClose">
      <div class="modal-container">
        <button class="modal-close-btn" @click="onClose">
          <i class="fas fa-times"></i>
        </button>

        <!-- Gallery -->
        <div class="modal-gallery">
          <img
            :src="getImageUrl(building.image)"
            :alt="building.nameBuilding"
            class="modal-main-image"
            @error="onImageError"
          />
        </div>

        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">{{ building.nameBuilding }}</h2>
            <div class="modal-price">{{ formattedPrice }}</div>
          </div>

          <div class="modal-basic-info">
            <div class="info-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ building.address }}</span>
            </div>
            <div class="info-item">
              <i class="fas fa-user-tie"></i>
              <span>{{ building.managername }}</span>
            </div>
          </div>

          <div class="modal-divider"></div>

          <div class="modal-specs">
            <h3 class="specs-title">Thông số kỹ thuật</h3>
            <div class="specs-grid">
              <div v-for="(spec, index) in specifications" :key="index" class="spec-item">
                <div class="spec-label">{{ spec.label }}</div>
                <div class="spec-value">{{ spec.value }}</div>
              </div>
            </div>
          </div>

          <div class="modal-actions">
            <button class="btn-secondary" @click="onClose">
              <i class="fas fa-times mr-2"></i> Đóng
            </button>
            <button class="btn-primary">
              <i class="fas fa-phone-alt mr-2"></i> Liên hệ ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  buildingId: Number,
  show: Boolean
});

const emit = defineEmits(['close']);

const backendBaseUrl = 'http://localhost:8080/img/';
const defaultImage = 'https://via.placeholder.com/800x600?text=No+Image+Available';

const building = ref({});

const getImageUrl = (path) => {
  if (!path) return defaultImage;

  // Xoá dấu / đầu nếu có
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  const fullPath = `${backendBaseUrl}${cleanPath}`;
  console.warn('⚠️ Ảnh không load được, thay thế bằng placeholder:', e.target.src);
  return fullPath;
};

const onImageError = (e) => {
  console.warn('⚠️ Ảnh không load được, thay thế bằng placeholder:', e.target.src);
  e.target.src = defaultImage;
};

const formattedPrice = computed(() => {
  if (!building.value.rentPrice) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(building.value.rentPrice);
});

const formatCurrency = (value) => {
  if (!value) return '---';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);
};

const specifications = computed(() => [
  { label: 'Diện tích', value: `${building.value.floorarea || '---'} m²` },
  { label: 'Số tầng hầm', value: building.value.numberOfBasement || '---' },
  { label: 'Loại tòa nhà', value: building.value.buildingType || '---' },
  { label: 'Hướng nhà', value: building.value.buildingDirection || '---' },
  { label: 'Kết cấu', value: building.value.buildingStructure || '---' },
  { label: 'Thời gian thuê', value: `${building.value.rentTime || '---'} tháng` },
  { label: 'Phí dịch vụ', value: formatCurrency(building.value.serviceFee) },
  { label: 'Phí đặt cọc', value: formatCurrency(building.value.depositFee) },
  { label: 'Phí môi giới', value: formatCurrency(building.value.brokerageFee) },
  { label: 'Phí gửi xe máy', value: formatCurrency(building.value.motoFee) },
  { label: 'Phí gửi ô tô', value: formatCurrency(building.value.carFee) },
  { label: 'Khu vực trống', value: `${building.value.emptyArea || '---'} m²` },
  { label: 'Khu vực cho thuê', value: `${building.value.rentalArea || '---'} m²` },
  { label: 'Số nhân viên quản lý', value: building.value.staffid?.length || 0 },
]);

const onClose = () => emit('close');

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:8080/api/buildings/${props.buildingId}`);
    building.value = res.data;
    console.log('🏢 Loaded building:', res.data);
  } catch (err) {
    console.error('❌ Lỗi lấy dữ liệu building:', err);
  }
});
</script>


  
  <style scoped>
  /* Overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(5px);
  }
  
  /* Modal Container */
  .modal-container {
    position: relative;
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
                0 10px 10px -5px rgba(0, 0, 0, 0.04);
    animation: modal-enter 0.3s ease-out;
  }
  
  /* Gallery Section */
  .modal-gallery {
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 90vh;
  }
  
  /* Content Section */
  .modal-content {
    padding: 2rem;
    overflow-y: auto;
  }
  
  /* Header */
  .modal-header {
    margin-bottom: 1.5rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }
  
  .modal-price {
    font-size: 1.25rem;
    color: #3182ce;
    font-weight: 600;
  }
  
  /* Basic Info */
  .modal-basic-info {
    margin-bottom: 1.5rem;
  }
  
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    color: #4a5568;
  }
  
  .info-item i {
    margin-right: 0.5rem;
    color: #3182ce;
    width: 20px;
    text-align: center;
  }
  
  /* Divider */
  .modal-divider {
    height: 1px;
    background-color: #e2e8f0;
    margin: 1.5rem 0;
  }
  
  /* Specifications */
  .modal-specs {
    margin-bottom: 2rem;
  }
  
  .specs-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 1rem;
  }
  
  .specs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .spec-item {
    background-color: #f8fafc;
    padding: 0.75rem;
    border-radius: 8px;
  }
  
  .spec-label {
    font-size: 0.875rem;
    color: #718096;
    margin-bottom: 0.25rem;
  }
  
  .spec-value {
    font-weight: 500;
    color: #1a202c;
  }
  
  /* Actions */
  .modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
  
  .btn-primary, .btn-secondary {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    display: flex;
    align-items: center;
    transition: all 0.2s;
  }
  
  .btn-primary {
    background-color: #3182ce;
    color: white;
    border: none;
  }
  
  .btn-primary:hover {
    background-color: #2c5282;
  }
  
  .btn-secondary {
    background-color: white;
    color: #4a5568;
    border: 1px solid #e2e8f0;
  }
  
  .btn-secondary:hover {
    background-color: #f7fafc;
  }
  
  /* Close Button */
  .modal-close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.2s;
  }
  
  .modal-close-btn:hover {
    background: rgba(255, 255, 255, 1);
    transform: rotate(90deg);
  }
  
  .modal-close-btn i {
    color: #4a5568;
    font-size: 1.25rem;
  }
  
  /* Animations */
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }
  
  @keyframes modal-enter {
    from {
      transform: translateY(20px) scale(0.95);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .modal-container {
      grid-template-columns: 1fr;
      width: 95%;
      max-height: 85vh;
    }
    
    .modal-gallery {
      height: 200px;
    }
    
    .modal-content {
      padding: 1.5rem;
    }
    
    .specs-grid {
      grid-template-columns: 1fr;
    }
    
    .modal-actions {
      flex-direction: column;
    }
  }
  </style>