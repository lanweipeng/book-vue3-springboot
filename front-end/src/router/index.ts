import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import {SUPER_ADMIN_ROLEID,ADMIN_ROLEID,READER_ROLEID} from '@/constant'


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
      redirect:() => {
        if(localStorage.getItem('roleId')===SUPER_ADMIN_ROLEID) return '/admin/admin-manage'
        if(localStorage.getItem('roleId')===ADMIN_ROLEID) return '/admin/reader-manage'
      },
      component: () => import('../views/Admin.vue'),
      children:[
        {
          path: 'admin-manage',
          name: 'admin-manage',
          component: () => import('../views/AdminManage.vue'),
        },
        {
          path: 'reader-manage',
          name: 'reader-manage',
          component: () => import('../views/admin/ReaderManage.vue'),
        },
        {
          path: 'reader-detail',
          name: 'reader-detail',
          component: () => import('../views/admin/ReaderDetail.vue'),
        },
        {
          path: 'college-manage',
          name: 'college-manage',
          component: () => import('../views/admin/CollegeManage.vue'),
        },
        {
          path: 'message-manage',
          name: 'message-manage',
          component: () => import('../views/admin/MessageManage.vue'),
        },
        {
          path: 'message-detail/:id',
          name: 'message-detail',
          component: () => import('../views/admin/MessageDetail.vue'),
        },
        {
          path: 'class-manage',
          name: 'class-manage',
          component: () => import('../views/admin/ClassManage.vue'),
        },
        {
          path: 'borrow-manage',
          name: 'borrow-manage',
          component: () => import('../views/admin/BorrowManage.vue'),
        },
      ],
    },
    {
      path:'/center',
      name:'center',
      component:()=>import('../views/Center.vue'),
      children:[
        {
          path:'message-list',
          name:'message-list',
          component:()=>import('../views/MessageList.vue'),
        }
      ]
    },
    {
      path:'/contact',
      name:'contact',
      component:()=>import('../views/Contact.vue'),
    },
    {
      path:'/borrow',
      name:'borrow',
      component:()=>import('../views/Borrow.vue'),
    }
  ]
})
const roleRouterMap={
  'message-list':READER_ROLEID,
  'home':READER_ROLEID,
  'center':READER_ROLEID,
  'contact':READER_ROLEID,
  'borrow':READER_ROLEID,
  'renew':READER_ROLEID,
  'reader-manage':ADMIN_ROLEID,
  'reader-detail':ADMIN_ROLEID,
  'college-manage':ADMIN_ROLEID,
  'message-manage':ADMIN_ROLEID,
  'message-detail':ADMIN_ROLEID,
  'class-manage':ADMIN_ROLEID,
  'borrow-manage':ADMIN_ROLEID,
  'admin-manage':SUPER_ADMIN_ROLEID,
}
router.beforeEach((to, from, next) => {
  console.log(to,from,!localStorage.getItem('token'))
console.log(to.path!=='/login',!Cookies.get('token'),localStorage.getItem('roleId')!=roleRouterMap[to.name])
  if(to.path!=='/login'&&(!Cookies.get('token')||localStorage.getItem('roleId')!=roleRouterMap[to.name])){
      sessionStorage.setItem('fromPath',from.path)
    next({name:'login'})

  }else{
    next()
  }

  // ...
  // 返回 false 以取消导航
})
export default router
