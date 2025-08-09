<template>
    <section id="features" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tính năng nổi bật</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Những tính năng giúp sản phẩm của bạn trở nên khác biệt
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="feature in features" :key="feature.title" 
             class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-14 h-14 bg-indigo-50 rounded-lg flex items-center justify-center mb-6">
            <component :is="feature.icon" class="w-6 h-6 text-indigo-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { 
    SparklesIcon, 
    LightningBoltIcon, 
    CodeIcon, 
    DeviceMobileIcon, 
    ShieldCheckIcon, 
    CogIcon 
  }  from '@heroicons/vue/outline'
  
  const features = [
    {
      title: "Thiết kế đẹp mắt",
      description: "Giao diện được thiết kế tỉ mỉ với màu sắc hài hòa và bố cục hợp lý.",
      icon: SparklesIcon
    },
    {
      title: "Tốc độ nhanh",
      description: "Tối ưu hiệu suất với code tinh gọn và tải trang siêu nhanh.",
      icon: LightningBoltIcon
    },
    {
      title: "Tùy biến dễ dàng",
      description: "Dễ dàng thay đổi màu sắc, font chữ và bố cục theo nhu cầu.",
      icon: CodeIcon
    },
    {
      title: "Responsive",
      description: "Hiển thị hoàn hảo trên mọi thiết bị từ mobile đến desktop.",
      icon: DeviceMobileIcon
    },
    {
      title: "Bảo mật",
      description: "Áp dụng các biện pháp bảo mật hiện đại để bảo vệ dữ liệu.",
      icon: ShieldCheckIcon
    },
    {
      title: "Dễ bảo trì",
      description: "Code được tổ chức rõ ràng, dễ dàng nâng cấp và bảo trì.",
      icon: CogIcon
    },
  ]
  </script>