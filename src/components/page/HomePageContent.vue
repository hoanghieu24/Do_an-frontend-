<template>
  <div>
    <HeroSection />
    <FilterSection @search="handleSearch" />

    <!-- Section cần gắn id -->
    <div id="propertylist-section">
      <PropertyList :properties="filteredProperties" />
    </div>

    <div id="agents-section">
      <AgentSection :agents="agents" />
    </div>

    <div id="testimonials-section">
      <Testimonials />
    </div>

    <div id="contact-section">
      <ContactForm />
    </div>

    <ResetButton class="p-4 bg-red-500 text-white" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

import HeroSection from '../sections/HeroSection.vue'
import FilterSection from '../FilterSection.vue'
import PropertyList from '../property/PropertyList.vue'
import AgentSection from '../agents/AgentSection.vue'
import Testimonials from '../Testimonials.vue'
import ContactForm from '../ContactForm.vue'
import ResetButton from '../common/reset.vue'

import { properties } from '@/data/properties'
import { agents } from '@/data/agents'

// Scroll theo query string
const route = useRoute()

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(async () => {
  await nextTick()
  const scrollTo = route.query.scrollTo
  if (scrollTo) {
    switch (scrollTo) {
      case 'contact':
        scrollToSection('contact-section')
        break
      case 'propertylist':
        scrollToSection('propertylist-section')
        break
      case 'testimonials':
        scrollToSection('testimonials-section')
        break
      case 'agents':
        scrollToSection('agents-section')
        break
    }
  }
})

// Filter logic
const searchCriteria = ref({})
const propertiesData = ref(properties)

const filteredProperties = computed(() => {
  return propertiesData.value.filter(property => {
    return Object.entries(searchCriteria.value).every(([key, value]) => {
      if (!value) return true
      if (key === 'price') {
        const price = parseFloat(property.price.replace(/[^\d.]/g, ''))
        const [min, max] = value.split('-').map(Number)
        return price >= min && (!max || price <= max)
      }
      return property[key].toString().toLowerCase().includes(value.toLowerCase())
    })
  })
})

const handleSearch = (criteria) => {
  searchCriteria.value = criteria
}
</script>
