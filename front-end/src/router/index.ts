import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:  () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component:  () => import('../views/Login.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      redirect:'/admin/admin-manage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Admin.vue'),
      children:[
        {
          path: 'admin-manage',
          component: () => import('../views/AdminManage.vue'),
        }
      ]
    },
    {
      path:'/center',
      name:'center',
      component:()=>import('../views/Center.vue')
    },
    {
      path:'/contact',
      name:'contact',
      component:()=>import('../views/Contact.vue')
    }
  ]
})

export default router
