import { createRouter, createWebHistory } from 'vue-router'

// Components
import Home from '../components/page/HomePageContent.vue'
import AdminLayout from '../components/admin/AdminHome.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      scrollToTop: true,
      scrollBehavior: 'smooth'
    }
  },
  {
    path: '/PropertyList',
    name: 'PropertyList',
    component: () => import('../components/property/PropertyList.vue'),
    meta: {
      scrollToId: 'property-section',
      scrollOffset: 20
    }
  },
{
    path: '/favorites',
    name: 'favorites',
    component: () => import('../components/favoriter/Favoriter.vue'),
    meta: {
      scrollToId: 'property-section',
      scrollOffset: 20
    }
  },
  // ✅ Route ADMIN – chỉ cho ROLE_MANAGER
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresManager: true }, // 👈 THÊM NÀY
    children: [
      {
        path: 'admin-dashboard',
        name: 'AdminDashboard',
        component: () => import('../layouts/AdminLayout.vue')
      },
      {
        path: 'manager-building',
        name: 'ManagerBuilding',
        component: () => import('../components/admin/managerBuilding.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../components/admin/profile.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ THÊM NAVIGATION GUARD Ở ĐÂY
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  console.log('🔍 Chuyển trang tới:', to.fullPath)
  console.log('👤 Dữ liệu user:', user)
  console.log('🔒 Route yêu cầu quyền quản lý:', to.matched.some(record => record.meta.requiresManager))

  if (to.matched.some(record => record.meta.requiresManager)) {
    if (user && user.roles && user.roles.includes('ROLE_MANAGER') || user && user.roles && user.roles.includes('ROLE_STAFF') ) {
      next()
    } else {    
      next('/')
    }
  } else {
    next()
  }
})


export default router
