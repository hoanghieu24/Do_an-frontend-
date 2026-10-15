<template>
  <div>
    <!-- Search Component -->
    <PropertySearch @search="handleSearch" />
    
    <!-- Property Section với filtered data -->
    <PropertySection 
      :filtered-properties="filteredProperties"
      :search-criteria="currentSearchCriteria"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import PropertySearch from '../FilterSection.vue'
import PropertySection from '../property/PropertyList.vue'

const currentSearchCriteria = ref({})
const filteredProperties = ref([])
const allProperties = ref([]) // Lưu tất cả properties từ API
const isSearching = ref(false)

// Fetch tất cả properties khi component mounted
onMounted(async () => {
  try {
    const response = await axios.get('/api/buildings')
    if (response.data && Array.isArray(response.data)) {
      allProperties.value = response.data
      filteredProperties.value = response.data
    }
  } catch (error) {
    console.error('Error fetching properties:', error)
  }
})

// Hàm xử lý tìm kiếm
const handleSearch = async (searchData) => {
  console.log('🔍 Search data received:', searchData)
  console.log('📊 Search results:', searchData.results?.length)
  
  currentSearchCriteria.value = searchData.criteria
  
  if (searchData.results && Array.isArray(searchData.results)) {
    // Sử dụng kết quả từ API search
    filteredProperties.value = searchData.results
    console.log('✅ Using API search results:', searchData.results.length)
    
    // Debug: hiển thị tên các building tìm được
    searchData.results.forEach((building, index) => {
      console.log(`🏢 ${index + 1}. ${building.nameBuilding} - Type: ${building.typeCode}`)
    })
  } else {
    console.log('❌ No results from API, using all properties')
    filteredProperties.value = allProperties.value
  }
  
  isSearching.value = false
}

// Hàm lọc properties dựa trên criteria
const filterProperties = (criteria) => {
  if (!criteria || Object.keys(criteria).length === 0) {
    // Nếu không có criteria, hiển thị tất cả
    filteredProperties.value = [...allProperties.value]
    return
  }

  let filtered = [...allProperties.value]
  
  console.log('🔍 Filtering with criteria:', criteria)
  console.log('📊 Total properties before filter:', filtered.length)

  // Lọc theo loại hình (typeCode)
  if (criteria.typeCode && criteria.typeCode !== '') {
    filtered = filtered.filter(property => {
      const propertyTypes = Array.isArray(property.typeCode) ? property.typeCode : [property.typeCode]
      return propertyTypes.some(type => type === criteria.typeCode)
    })
    console.log('✅ After type filter:', filtered.length)
  }
  
  // Lọc theo quận (district)
  if (criteria.district && criteria.district !== '') {
    filtered = filtered.filter(property => {
      const address = property.address || ''
      return address.toLowerCase().includes(criteria.district.toLowerCase())
    })
    console.log('✅ After district filter:', filtered.length)
  }
  
  // Lọc theo giá (priceRange)
  if (criteria.priceRange && criteria.priceRange !== '') {
    const [minPrice, maxPrice] = criteria.priceRange.split('-').map(Number)
    
    filtered = filtered.filter(property => {
      const propertyPrice = property.rentPrice || property.servicefee || 0
      
      if (maxPrice && !isNaN(maxPrice)) {
        return propertyPrice >= minPrice && propertyPrice <= maxPrice
      } else {
        return propertyPrice >= minPrice
      }
    })
    console.log('✅ After price filter:', filtered.length)
  }
  
  // Lọc theo diện tích (areaRange)
  if (criteria.areaRange && criteria.areaRange !== '') {
    const [minArea, maxArea] = criteria.areaRange.split('-').map(Number)
    
    filtered = filtered.filter(property => {
      const propertyArea = property.floorarea || 0
      
      if (maxArea && !isNaN(maxArea)) {
        return propertyArea >= minArea && propertyArea <= maxArea
      } else {
        return propertyArea >= minArea
      }
    })
    console.log('✅ After area filter:', filtered.length)
  }

  // Lọc theo tên tòa nhà
  if (criteria.name && criteria.name !== '') {
    filtered = filtered.filter(property => 
      property.nameBuilding?.toLowerCase().includes(criteria.name.toLowerCase())
    )
    console.log('✅ After name filter:', filtered.length)
  }

  // Lọc theo phường
  if (criteria.ward && criteria.ward !== '') {
    filtered = filtered.filter(property => 
      property.address?.toLowerCase().includes(criteria.ward.toLowerCase())
    )
    console.log('✅ After ward filter:', filtered.length)
  }

  // Lọc theo số tầng hầm
  if (criteria.numberOfBasement && criteria.numberOfBasement !== '') {
    filtered = filtered.filter(property => 
      property.numberOfBasement == criteria.numberOfBasement
    )
    console.log('✅ After basement filter:', filtered.length)
  }

  console.log('🎯 Final filtered count:', filtered.length)
  filteredProperties.value = filtered
}
</script>