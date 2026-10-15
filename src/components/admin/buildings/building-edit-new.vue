<template>
  <div class="building-edit-container">
    <!-- Header -->
    <div class="form-header">
      <h2><i class="fas fa-building"></i> SỬA TÒA NHÀ</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="building-form">
      <div class="card-container">
        <!-- Thông tin cơ bản -->
        <div class="card form-card">
          <div class="card-header">
            <h5><i class="fas fa-info-circle"></i> THÔNG TIN CƠ BẢN</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">Tên tòa nhà <span class="text-danger">*</span></label>
                  <input v-model="building.name" type="text" class="form-control" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">Quận</label>
                  <select v-model="building.district" class="form-control">
                    <option value="">--- Chọn Quận ---</option>
                    <option v-for="(value, key) in districts" :key="key" :value="key">{{ value }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">Phường</label>
                  <input v-model="building.ward" type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">Đường</label>
                  <input v-model="building.street" type="text" class="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Thông tin chi tiết -->
        <div class="card form-card">
          <div class="card-header">
            <h5><i class="fas fa-building"></i> THÔNG TIN CHI TIẾT</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="form-label">Kết cấu</label>
                  <input v-model="building.structure" type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="form-label">Số tầng hầm</label>
                  <input v-model="building.numberOfBasement" type="number" class="form-control" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="form-label">Diện tích sàn</label>
                  <input v-model="building.floorArea" type="number" class="form-control" />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="form-label">Hướng</label>
                  <input v-model="building.direction" type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="form-label">Hạng</label>
                  <input v-model="building.level" type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="form-label">Diện tích thuê</label>
                  <input v-model="building.rentalArea" type="text" class="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Thông tin giá cả -->
        <div class="card form-card">
          <div class="card-header">
            <h5><i class="fas fa-money-bill-wave"></i> THÔNG TIN GIÁ CẢ</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="form-label">Giá thuê</label>
                  <input v-model="building.rentPrice" type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="form-label">Mô tả giá</label>
                  <input v-model="building.rentPriceDescription" type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="form-label">Phí dịch vụ</label>
                  <input v-model="building.serviceFee" type="number" class="form-control" />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <label class="form-label">Phí ô tô</label>
                  <input v-model="building.carFee" type="number" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="form-label">Phí mô tô</label>
                  <input v-model="building.motoFee" type="number" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="form-label">Phí ngoài giờ</label>
                  <input v-model="building.overTimeFee" type="number" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="form-label">Tiền điện</label>
                  <input v-model="building.electricityFee" type="number" class="form-control" />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="form-label">Đặt cọc</label>
                  <input v-model="building.deposit" type="number" class="form-control" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="form-label">Thanh toán</label>
                  <input v-model="building.payment" type="text" class="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Thông tin thời gian -->
        <div class="card form-card">
          <div class="card-header">
            <h5><i class="fas fa-clock"></i> THÔNG TIN THỜI GIAN</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">Thời gian thuê</label>
                  <input v-model="building.rentTime" type="date" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">Thời gian trang trí</label>
                  <input v-model="building.decorationTime" type="date" class="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Thông tin quản lý -->
        <div class="card form-card">
          <div class="card-header">
            <h5><i class="fas fa-user-tie"></i> THÔNG TIN QUẢN LÝ</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">Tên quản lý</label>
                  <input v-model="building.managername" type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">SĐT quản lý</label>
                  <input v-model="building.managerPhoneNumber" type="text" class="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loại tòa nhà -->
        <div class="card form-card">
          <div class="card-header">
            <h5><i class="fas fa-tag"></i> LOẠI TÒA NHÀ <span class="text-danger">*</span></h5>
          </div>
          <div class="card-body">
            <div class="form-group">
              <div class="building-types">
                <div v-for="(value, key) in rentTypes" :key="key" class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="key"
                    :value="key"
                    v-model="building.type"
                  />
                  <label class="form-check-label" :for="key">{{ value }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hình ảnh -->
        <div class="card form-card">
          <div class="card-header">
            <h5><i class="fas fa-image"></i> HÌNH ẢNH</h5>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Hình đại diện</label>
              <div class="image-upload-container">
                <div class="image-preview" @click="$refs.fileInput.click()">
                  <img
                    :src="previewImage || defaultImage"
                    alt="Preview"
                    class="preview-image"
                  />
                  <div class="image-overlay">
                    <i class="fas fa-camera"></i>
                    <p>Chọn hình ảnh</p>
                  </div>
                </div>
                <input 
                  type="file" 
                  ref="fileInput" 
                  @change="onImageChange" 
                  class="d-none" 
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Ghi chú -->
        <div class="card form-card">
          <div class="card-header">
            <h5><i class="fas fa-sticky-note"></i> GHI CHÚ</h5>
          </div>
          <div class="card-body">
            <div class="form-group">
              <textarea v-model="building.note" class="form-control" rows="3"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="form-actions">
        <button type="submit" class="btn btn-primary btn-lg" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
          <i v-else class="fas fa-save"></i> {{ loading ? 'ĐANG XỬ LÝ...' : 'LƯU THAY ĐỔI' }}
        </button>
        <button type="button" class="btn btn-outline-secondary btn-lg" @click="handleCancel" :disabled="loading">
          <i class="fas fa-times"></i> HỦY
        </button>
      </div>

      <!-- Notifications -->
      <div v-if="errorMessage" class="alert alert-danger mt-4">
        <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="alert alert-success mt-4">
        <i class="fas fa-check-circle"></i> {{ successMessage }}
      </div>
    </form>

    <!-- Error Modal -->
    <div class="modal fade" :class="{ 'show': showErrorModal }" v-if="showErrorModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Lỗi</h5>
            <button type="button" class="close" @click="showErrorModal = false">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Bạn đang bỏ trống trường "Loại toà nhà" hoặc "Tên toà nhà" vui lòng kiểm tra lại!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showErrorModal = false">Đóng</button>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
const toast = useToast();
export default {
  name: "BuildingEdit",
  data() {
    return {
      building: {
        id: null,
        name: "",
        district: "",
        ward: "",
        street: "",
        structure: "",
        numberOfBasement: 0,
        floorArea: 0,
        direction: "",
        level: "",
        rentalArea: "",
        rentPrice: "",
        rentPriceDescription: "",
        serviceFee: 0,
        carFee: 0,
        motoFee: 0,
        overTimeFee: 0,
        electricityFee: 0,
        deposit: 0,
        payment: "",
        rentTime: "",
        decorationTime: "",
        managername: "",
        managerPhoneNumber: "",
        type: [],
        note: "",
        image: "",
        imageBase64: "",
        imageName: ""
      },
      districts: {},
      rentTypes: {},
      previewImage: "",
      defaultImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23f8f9fa'/%3E%3Cpath d='M80,50 L120,50 L120,90 L80,90 Z' fill='%23e9ecef'/%3E%3Cpath d='M85,55 L115,55 L115,85 L85,85 Z' fill='%23dee2e6'/%3E%3Cpath d='M70,90 L130,90 L130,100 L70,100 Z' fill='%23ced4da'/%3E%3C/svg%3E",
      errorMessage: "",
      successMessage: "",
      loading: false,
      showErrorModal: false,
      showSuccessModal: false
    };
  },
  async mounted() {
    await this.fetchInitialData();
    await this.loadBuildingData();
  },
  methods: {
    async fetchInitialData() {
      try {
        const [districtsRes, rentTypesRes] = await Promise.all([
          axios.get('/api/buildings/districts'),
          axios.get('/api/buildings/rent-types')
        ]);
        
        this.districts = districtsRes.data;
        this.rentTypes = rentTypesRes.data;
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        this.errorMessage = 'Không thể tải dữ liệu khởi tạo. Vui lòng thử lại.';
      }
    },
    
    async loadBuildingData() {
      try {
        const buildingId = this.$route.params.id || new URLSearchParams(window.location.search).get('id');
        if (buildingId) {
          const response = await axios.get(`/api/buildings/${buildingId}`);
          this.building = { ...response.data };
          
          // Set image preview if exists
          if (this.building.image) {
            this.previewImage = `/img${this.building.image}`;
          }
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu tòa nhà:', error);
        this.errorMessage = 'Không thể tải thông tin tòa nhà. Vui lòng thử lại.';
      }
    },
    
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Kiểm tra kích thước file (tối đa 5MB)
        if (file.size > 5 * 1024 * 1024) {
          this.errorMessage = 'Kích thước file không được vượt quá 5MB';
          return;
        }
        
        this.building.imageName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.building.imageBase64 = e.target.result;
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    
    async handleSubmit() {
      // Validate dữ liệu
      if (!this.building.name || this.building.type.length === 0) {
        this.showErrorModal = true;
        return;
      }
      
      this.errorMessage = "";
      this.loading = true;
      
      try {
        // Chuẩn bị dữ liệu để gửi lên server
        const buildingData = { ...this.building };
        
        // Gọi API để cập nhật tòa nhà
        await axios.put('/api/buildings', buildingData);
        
        this.showSuccessModal = true;
        toast.success('Sửa toà nhà Thành Công !!')
        
        // Tự động chuyển hướng sau 2 giây
        setTimeout(() => {
          this.showSuccessModal = false;
          this.$router.push("manager-building");
        }, 2000);
      } catch (error) {
        console.error('Lỗi khi cập nhật tòa nhà:', error);
        
        if (error.response && error.response.status === 400) {
          this.errorMessage = "Dữ liệu không hợp lệ: " + (error.response.data.message || "Vui lòng kiểm tra lại thông tin");
        } else if (error.response && error.response.status === 401) {
          this.errorMessage = "Bạn không có quyền thực hiện thao tác này";
        } else {
          this.errorMessage = "Đã có lỗi xảy ra: " + (error.message || "Vui lòng thử lại sau");
        }
      } finally {
        this.loading = false;
      }
    },
    
    handleCancel() {
      if (confirm('Bạn có chắc chắn muốn hủy thao tác? Dữ liệu đã nhập sẽ bị mất.')) {
        this.$router.push("manager-building");
      }
    }
  }
};
</script>

<style scoped>
.building-edit-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f7f9;
  min-height: 100vh;
}

.form-header {
  text-align: center;
  margin-bottom: 25px;
  padding: 15px;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-header h2 {
  margin: 0;
  font-weight: 700;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.building-form {
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-card {
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.form-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.card-header {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  border: none;
  border-radius: 8px 8px 0 0 !important;
  padding: 15px 20px;
}

.card-header h5 {
  margin: 0;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  display: block;
  font-size: 14px;
}

.form-control {
  border: 1px solid #dce4ec;
  border-radius: 6px;
  padding: 10px 15px;
  font-size: 14px;
  transition: all 0.3s;
  height: 45px;
  width: 100%;
}

.form-control:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

.building-types {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.building-types .form-check {
  min-width: 120px;
  background-color: #f8f9fa;
  padding: 10px 15px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  transition: all 0.2s;
}

.building-types .form-check:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
}

.form-check-input {
  margin-right: 8px;
}

.form-check-label {
  font-weight: 500;
  color: #2c3e50;
}

.image-upload-container {
  text-align: center;
}

.image-preview {
  position: relative;
  width: 200px;
  height: 150px;
  margin: 0 auto;
  cursor: pointer;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.image-preview:hover {
  border-color: #3498db;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-preview:hover .image-overlay {
  opacity: 1;
}

.form-actions {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.form-actions .btn {
  min-width: 160px;
  margin: 0 10px;
  padding: 12px 24px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db, #2980b9);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2980b9, #2573a7);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.btn-outline-secondary {
  border: 2px solid #95a5a6;
  color: #7f8c8d;
  background: transparent;
}

.btn-outline-secondary:hover {
  background-color: #95a5a6;
  color: white;
  border-color: #95a5a6;
  transform: translateY(-2px);
}

.alert {
  border-radius: 8px;
  padding: 15px 20px;
  border: none;
  font-weight: 500;
}

.alert-danger {
  background-color: #ffebee;
  color: #c62828;
}

.alert-success {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.text-danger {
  color: #e74c3c !important;
}

.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal.show {
  opacity: 1;
}

@media (max-width: 768px) {
  .building-edit-container {
    padding: 15px;
  }
  
  .building-form {
    padding: 15px;
  }
  
  .building-types {
    flex-direction: column;
    gap: 10px;
  }
  
  .form-actions .btn {
    width: 100%;
    margin: 10px 0;
  }
  
  .card-body {
    padding: 15px;
  }
}
</style> 