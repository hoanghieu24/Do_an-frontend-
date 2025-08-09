<template>
    <section id="pricing" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Bảng giá</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Lựa chọn gói phù hợp với nhu cầu của bạn
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div v-for="plan in pricingPlans" :key="plan.name" 
             :class="['p-8 rounded-2xl border-2 transition-all', 
                     plan.featured ? 'border-indigo-600 bg-white shadow-xl scale-105' : 'border-gray-200 bg-gray-50 hover:border-indigo-300']">
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-900">{{ plan.name }}</h3>
            <p class="text-gray-600 mt-2">{{ plan.description }}</p>
          </div>
          <div class="mb-8">
            <span class="text-4xl font-bold text-gray-900">{{ plan.price }}</span>
            <span class="text-gray-600">/tháng</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li v-for="feature in plan.features" :key="feature" class="flex items-center">
              <CheckIcon class="w-5 h-5 text-green-500 mr-2" />
              <span class="text-gray-700">{{ feature }}</span>
            </li>
          </ul>
          <button :class="['w-full py-3 px-6 rounded-lg font-medium transition-colors', 
                          plan.featured ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300']">
            Chọn gói
          </button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { CheckIcon } from '@heroicons/vue/solid'
  
  const pricingPlans = [
    {
      name: "Cơ bản",
      description: "Phù hợp cho cá nhân hoặc dự án nhỏ",
      price: "299.000đ",
      features: [
        "5 trang giao diện",
        "Hỗ trợ email",
        "Cập nhật hàng tháng",
        "Tài liệu hướng dẫn"
      ],
      featured: false
    },
    {
      name: "Doanh nghiệp",
      description: "Gói phổ biến nhất cho doanh nghiệp vừa",
      price: "899.000đ",
      features: [
        "15 trang giao diện",
        "Hỗ trợ 24/7",
        "Cập nhật hàng tuần",
        "Tùy chỉnh màu sắc",
        "Bảo mật nâng cao"
      ],
      featured: true
    },
    {
      name: "Cao cấp",
      description: "Giải pháp toàn diện cho doanh nghiệp lớn",
      price: "1.499.000đ",
      features: [
        "Giao diện không giới hạn",
        "Hỗ trợ ưu tiên",
        "Cập nhật hàng ngày",
        "Thiết kế riêng",
        "Bảo mật enterprise",
        "Đào tạo nhân viên"
      ],
      featured: false
    }
  ]
  </script>