<template>
    <section id="testimonials" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-2xl shadow-sm">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Đánh giá từ khách hàng</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Những gì khách hàng nói về chúng tôi
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="testimonial in testimonials" :key="testimonial.name" 
             class="bg-gray-50 p-8 rounded-xl hover:bg-white transition-colors">
          <div class="flex items-center mb-6">
            <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full object-cover">
            <div class="ml-4">
              <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
              <p class="text-indigo-600">{{ testimonial.role }}</p>
            </div>
          </div>
          <p class="text-gray-600 italic">"{{ testimonial.quote }}"</p>
          <div class="mt-4 flex text-yellow-400">
            <StarIcon v-for="i in 5" :key="i" class="w-5 h-5" :class="{ 'text-gray-300': i > testimonial.rating }" />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { StarIcon } from '@heroicons/vue/solid'
  
  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "CEO Công ty ABC",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "Giao diện đẹp mắt và dễ sử dụng đã giúp chúng tôi tăng trải nghiệm người dùng lên đáng kể.",
      rating: 5
    },
    {
      name: "Trần Thị B",
      role: "Product Manager",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "Đội ngũ thiết kế rất chuyên nghiệp, sản phẩm cuối cùng vượt xa mong đợi của chúng tôi.",
      rating: 4
    },
    {
      name: "Lê Văn C",
      role: "CTO Startup XYZ",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      quote: "Tốc độ load trang nhanh và giao diện responsive giúp tỉ lệ thoát trang giảm đáng kể.",
      rating: 5
    }
  ]
  </script>