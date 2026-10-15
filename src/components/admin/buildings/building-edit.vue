<template>
  <div class="building-form-container">
    <!-- Header -->
    <div class="form-header">
      <h2><i class="fas fa-building"></i> THÊM TÒA NHÀ MỚI</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="building-form">
      <!-- Card for basic information -->
      <div class="card form-card">
        <div class="card-header">
          <h5><i class="fas fa-info-circle"></i> THÔNG TIN CƠ BẢN</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Tên tòa nhà -->
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Tên tòa nhà <span class="text-danger">*</span></label>
                <input v-model="building.name" type="text" class="form-control" required
                  placeholder="Nhập tên tòa nhà" />
              </div>
            </div>

            <!-- Quận -->
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Quận</label>
                <select v-model="building.district" class="form-control">
                  <option disabled value="">--- Chọn Quận ---</option>
                  <option v-for="(label, value) in districts" :key="value" :value="value">
                    {{ label }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Phường -->
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Phường</label>
                <input v-model="building.ward" type="text" class="form-control" placeholder="Nhập tên phường" />
              </div>
            </div>

            <!-- Đường -->
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Đường</label>
                <input v-model="building.street" type="text" class="form-control" placeholder="Nhập tên đường" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card for building details -->
      <div class="card form-card">
        <div class="card-header">
          <h5><i class="fas fa-building"></i> THÔNG TIN CHI TIẾT</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Kết cấu -->
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label">Kết cấu</label>
                <input v-model="building.structure" type="text" class="form-control"
                  placeholder="Nhập thông tin kết cấu" />
              </div>
            </div>

            <!-- Số tầng hầm -->
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label">Số tầng hầm</label>
                <input v-model="building.numberOfBasement" type="number" class="form-control" min="0" placeholder="0" />
              </div>
            </div>

            <!-- Diện tích sàn -->
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label">Diện tích sàn (m²)</label>
                <input v-model="building.floorArea" type="number" class="form-control" min="0"
                  placeholder="Nhập diện tích sàn" />
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Hướng -->
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label">Hướng</label>
                <input v-model="building.direction" type="text" class="form-control" placeholder="Hướng công trình" />
              </div>
            </div>

            <!-- Hạng -->
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label">Hạng</label>
                <input v-model="building.level" type="text" class="form-control" placeholder="Hạng tòa nhà" />
              </div>
            </div>

            <!-- Diện tích thuê -->
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label">Diện tích thuê (m²)</label>
                <input v-model="building.rentalArea" type="number" class="form-control" min="0"
                  placeholder="Nhập diện tích thuê" />
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Giá thuê -->
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label">Giá thuê (VND)</label>
                <input v-model="building.rentPrice" type="number" class="form-control" min="0"
                  placeholder="Nhập giá thuê" />
              </div>
            </div>

            <!-- Phí dịch vụ -->
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label">Phí dịch vụ (VND)</label>
                <input v-model="building.serviceFee" type="number" class="form-control" min="0"
                  placeholder="Nhập phí dịch vụ" />
              </div>
            </div>

            <!-- Phí môi giới -->
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label">Phí môi giới (VND)</label>
                <input v-model="building.brokerageFee" type="number" class="form-control" min="0"
                  placeholder="Nhập phí môi giới" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card for management information -->
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Nhân viên phụ trách
        </label>

        <!-- MANAGER / ADMIN -->
        <select v-if="userRole !== 'ROLE_STAFF'" v-model="building.staffIds">

          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500
          sm:text-sm">
          <option value="">Chọn nhân viên...</option>
          <option v-for="staff in staffs" :key="staff.id" :value="staff.id">
            {{ staff.fullName }}
          </option>
        </select>

        <!-- STAFF -->
        <input v-else type="text" :value="myName" disabled />

      </div>



      <!-- Card for building type -->
      <div class="card form-card">
        <div class="card-header">
          <h5><i class="fas fa-tag"></i> LOẠI TÒA NHÀ <span class="text-danger">*</span></h5>
        </div>
        <div class="card-body">
          <div class="form-group">
            <div class="building-types">
              <div v-for="(label, value) in rentTypes" :key="value" class="form-check">
                <input type="checkbox" class="form-check-input" :id="value" :value="value"
                  v-model="building.typeCode" />
                <label class="form-check-label" :for="value">
                  {{ label }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upload ảnh -->
      <div class="card form-card">
        <div class="card-header">
          <h5><i class="fas fa-image"></i> HÌNH ẢNH</h5>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">Hình đại diện</label>
            <div class="image-upload-container">
              <div class="image-preview" @click="$refs.fileInput.click()">
                <img :src="previewImage || defaultImage" alt="Preview" class="preview-image" />
                <div class="image-overlay">
                  <i class="fas fa-camera"></i>
                  <p>Chọn hình ảnh</p>
                </div>
              </div>
              <input type="file" ref="fileInput" @change="onImageChange" class="d-none" accept="image/*" />
            </div>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="form-actions">
        <button type="submit" class="btn btn-primary btn-lg" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <i v-else class="fas fa-save"></i> {{ loading ? 'ĐANG XỬ LÝ...' : 'LƯU THÔNG TIN' }}
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "BuildingForm",
  data() {
    return {
      building: {
        name: "",
        district: "",
        ward: "",
        street: "",
        structure: "",
        numberOfBasement: 0,
        floorArea: 0,
        direction: "",
        level: "",
        rentalArea: 0,
        rentPrice: 0,
        serviceFee: 0,
        brokerageFee: 0,
        managerName: "",
        managerPhone: "",
        typeCode: [],
        note: "",
      },
      districts: {},
      rentTypes: {},
      staffIds: [],
      errorMessage: "",
      successMessage: "",
      loading: false,

      // 👇 thêm cho upload ảnh
      previewImage: null,
      defaultImage: "/admin/image/default.png",
      imageBase64: "",
      imageName: ""
    };
  },
  computed: {
    userRole() {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (!user || !user.roles || user.roles.length === 0) return null;
      return user.roles[0]; // "ROLE_STAFF" hoặc "ROLE_MANAGER"
    },
    currentUserId() {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      return user ? user.id : null;
    },
    myName() {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      return user ? user.fullname : "Bạn";
    }
  },

  async mounted() {
    await this.fetchInitialData();
    if (this.userRole === "ROLE_STAFF") {
      this.building.staffIds = [this.currentUserId];
    }



  },
  methods: {
    async fetchInitialData() {
      try {
        const [districtsRes, rentTypesRes, staffsRes] = await Promise.all([
          axios.get('/api/buildings/districts'),
          axios.get('/api/buildings/rent-types'),
          axios.get('/api/buildings/staffs')
        ]);

        this.districts = districtsRes.data;
        this.rentTypes = rentTypesRes.data;
        this.staffs = staffsRes.data;
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        this.errorMessage = 'Không thể tải dữ liệu khởi tạo. Vui lòng thử lại.';
      }
    },

    onImageChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.imageName = file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageBase64 = e.target.result;
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    async handleSubmit() {
      if (this.userRole === "ROLE_STAFF") {
        this.building.staffIds = [this.currentUserId];
      }




      if (!this.building.name) {
        this.errorMessage = 'Vui lòng nhập tên tòa nhà!';
        return;
      }
      if (this.building.typeCode.length === 0) {
        this.errorMessage = 'Vui lòng chọn ít nhất một loại tòa nhà!';
        return;
      }

      this.errorMessage = "";
      this.loading = true;

      try {
        const buildingData = {
          ...this.building
        };

        // Nếu có ảnh thì thêm vào payload
        if (this.imageBase64) {
          buildingData.imageBase64 = this.imageBase64;
          buildingData.imageName = this.imageName;
        }

        const response = await axios.post('/api/buildings', buildingData);

        this.successMessage = "Thêm tòa nhà thành công!";

        // Reset form
        this.building = {
          name: "",
          district: "",
          ward: "",
          street: "",
          structure: "",
          numberOfBasement: 0,
          floorArea: 0,
          direction: "",
          level: "",
          rentalArea: 0,
          rentPrice: 0,
          serviceFee: 0,
          brokerageFee: 0,
          managerName: "",
          managerPhone: "",
          typeCode: [],
          note: "",
          staffId: ""
        };
        this.previewImage = null;
        this.imageBase64 = "";
        this.imageName = "";

        setTimeout(() => {
          this.$router.push("/admin/manager-building");
        }, 2000);
      } catch (error) {
        console.error('Lỗi khi thêm tòa nhà:', error);
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
        this.$router.push("/admin/manager-building");
      }
    },
  },
};
</script>

<style scoped>
.building-form-container {
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

.form-card {
  margin-bottom: 20px;
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
  background-color: rgba(0, 0, 0, 0.5);
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

@media (max-width: 768px) {
  .building-form-container {
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
    background-color: rgba(0, 0, 0, 0.5);
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
}
</style>