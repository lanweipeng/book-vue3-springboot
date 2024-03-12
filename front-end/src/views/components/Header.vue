<template>
   <div class="header">
      <div class="left">
        <h1 class="header-title c-p" @click="handleClickLogo">图书管理系统</h1>
      <nav>
        <ul class="menu">
          <li v-for="item in menus" :key="item.name" @click="() => handleClick(item)">
          <div :class="{'is-active':isActive===item.name}">{{ item.label }}</div>
          </li>

        </ul>
      </nav>
      </div>
      <div class="right">
        
        <div class="logout c-p" @click="logout">退出</div>
      </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import useLogout from '@/hooks/useLogout'
import {ref} from 'vue'
const menus = [
  {
    label: '图书推荐',
    name: 'recommend',
    path: '/recommend',
  },
  {
    label: '图书借阅',
    name: 'borrow',
    path: '/borrow'
  },
  {
    label: '图书归还',
    path: '/return',
    name: 'return',
  },
  {
    label: '图书续借',
    path: '/renew',
    name: 'renew',
  },
  {
    label: '个人中心',
    path: '/center',
    name: 'center',
  },
  {
    label: '联系管理员',
    path: '/contact',
    name: 'contact',
  },
]
const isActive = ref();
const route = useRoute();
console.log(route.name)
isActive.value=route.name
console.log(isActive.value,route.name)
const handleClickLogo=()=>{
  router.push('/')
}
const router = useRouter()

const handleClick = (item) => {
  isActive.value=item.name
  router.push(item.path)
}
const logout=useLogout()



</script>
<style scoped lang="scss">
@import '@/scss/var.scss';
@import '@/scss/mixin.scss';

.header {
    display: flex;
    height: 60px;
    background-color: $main-color;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    padding: 0 40px;
    .left{
      display: flex;
      align-items: center;
    }

    .header-title {
      margin-right: 100px;
    }

    .menu {
      display: flex;

      li {
        margin-right: 20px;
        cursor: pointer;
        .is-active{
          border-bottom: 1px solid white;
        }
      }
    }
    .right{
    }
  }
  </style>
