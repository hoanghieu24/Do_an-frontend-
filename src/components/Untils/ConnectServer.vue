<script setup>
import { ref, onMounted } from 'vue';
import PropertyList from './components/property/PropertyList.vue';

const buildings = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8081/api/building');
    const data = await response.json();
    alert('✅ Response từ /api/buildings:', data);

    buildings.value = Array.isArray(data) ? data : data.content || [];
  } catch (err) {
    console.error('❌ Lỗi khi gọi API:', err);
    alert("API lỗi hoặc không kết nối được.");
  }
});

</script>

<template>
  <div>
    <PropertyList v-if="!isLoading && buildings.length" :properties="buildings" />
    <p v-else-if="isLoading">⏳ Đang tải dữ liệu...</p>
    <p v-else>😥 Không có tòa nhà nào được tìm thấy.</p>
  </div>
</template>
