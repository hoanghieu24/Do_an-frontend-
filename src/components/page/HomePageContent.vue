<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">
    <HeroSection />
    
    <div id="propertylist-section">
      <PropertySearchWrapper />
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

    <HiderAI ref="chatbot" />
    <ResetButton />
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

import HeroSection from '../sections/HeroSection.vue'
import AgentSection from '../agents/AgentSection.vue'
import Testimonials from '../Testimonials.vue'
import ContactForm from '../ContactForm.vue'
import ResetButton from '../common/reset.vue'
import PropertySearchWrapper from '../property/PropertySearchWrapper.vue'
import { agents } from '@/data/agents'
import HiderAI from '../HiderAI.vue'

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
</script>
