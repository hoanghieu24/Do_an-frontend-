import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'

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
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import('../components/profile.vue')
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresManager: true },
    children: [
      {
        path: 'admin-dashboard',
        name: 'AdminDashboard',
        component: () => import('../layouts/AdminLayout.vue')
      },
      {
        path: 'manager-building',
        name: 'ManagerBuilding',
        component: () => import('../components/admin/buildings/managerBuilding.vue')
      },
      {
        path: 'building-edit',
        name: 'EditBuilding',
        component: () => import('../components/admin/buildings/building-edit.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../components/admin/profile.vue')
      },
      {
        path: 'building-edit-new-:id',
        name: 'EditBuildingWithId',
        component: () => import('../components/admin/buildings/building-edit-new.vue'),
      },
      {
        path: 'manager-user',
        name: 'ManagerUser',
        component: () => import('../components/admin/users/managerUser.vue')
      },
      {
        path: 'user-edit/:id',
        name: 'EditUserWithId',
        component: () => import('../components/admin/users/user-edit.vue')
      },
      {
        path: 'add-user',
        name: 'addUser',
        component: () => import('../components/admin/users/add-user.vue')
      },
      {
        path: `customer-manager`,
        name: 'customerManager',
        component: () => import('../components/admin/customers/manageCustomers.vue')
      },
      {
        path: 'customer-edit',
        name: 'customerEdit',
        component: () => import('../components/admin/customers/customer-add.vue')
      },
      {
        path: 'customer-edit/:id',
        name: 'customerEditWithId',
        component: () => import('../components/admin/customers/customer-edit.vue')
      },
      {
        path: 'contracts',
        name: 'contracts',
        component: () => import('../components/admin/contracts/managerContract.vue')
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('../components/admin/setting.vue')
      },
      {
        path: 'vr360',
        name: 'vr360',
        component: () => import('../components/admin/vr360/managerVR360.vue')
      },
      {
        path: 'seller-request',
        name: 'SellerRequest',
        component: () => import('../components/admin/SellerRequest.vue')
      }
    
      
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, _savedPosition) {
    return { top: 0 }  // mỗi lần đổi route → scroll lên đầu
  }
})

// ✅ Navigation Guard
router.beforeEach((to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  let user = null
  try {
    const storedUser = localStorage.getItem('currentUser') || localStorage.getItem('user')
    if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
      user = JSON.parse(storedUser)
    }
  } catch (e) {
    console.error('Error parsing stored user in router guard:', e)
  }

  console.log('🔍 Chuyển trang tới:', to.fullPath)
  console.log('👤 Dữ liệu user:', user)
  console.log('🔒 Route yêu cầu quyền quản lý:', to.matched.some(record => record.meta.requiresManager))

  if (to.matched.some(record => record.meta.requiresManager)) {
    if (user && user.roles && (user.roles.includes('ROLE_MANAGER') || user.roles.includes('ROLE_STAFF'))) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
