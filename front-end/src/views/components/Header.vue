<template>
   <div class="header">
      <div class="left">
        <h1 class="title">图书管理系统</h1>
      <nav>
        <ul class="menu">
          <li v-for="item in menus" :key="item.name" @click="() => handleClick(item.path)">{{ item.name }}</li>

        </ul>
      </nav>
      </div>
      <div class="right">
        退出
      </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const menus = [
  {
    name: '图书推荐',
    path: '/'
  },
  {
    name: '图书借阅',
    path: '/'
  },
  {
    name: '图书归还',
    path: '/'
  },
  {
    name: '图书续借',
    path: '/'
  },
  {
    name: '个人中心',
    path: '/center'
  },
  {
    name: '联系管理员',
    path: '/contact'
  },
]
const router = useRouter()
const handleClick = (path) => {
  router.push(path)
}
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

    .title {
      margin-right: 100px;
    }

    .menu {
      display: flex;

      li {
        margin-right: 20px;
        cursor: pointer;
      }
    }
    .right{
    }
  }
  </style>
