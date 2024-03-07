<template>
  <div class="admin">
   <Header />
  <el-row class="main">
    <el-col :span="4">
      <el-menu
        active-text-color="#409EFF"
        class="el-menu"
        :default-active="activeIndex"
        text-color="#000"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <el-menu-item index="1" route="/center/edit-info">
            <span>资料编辑</span>
        </el-menu-item>
        <el-menu-item index="2" route="/center/borrow-info">
          <span>借阅信息</span>
        </el-menu-item>
        <el-menu-item index="3" route="/center/message-list" @click="handleClick(3)">
          <span>留言记录</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" class="content">
      <RouterView />
    </el-col>
  </el-row>
  </div>
</template>
<script lang="ts" setup>
import Header from './components/Header.vue'
import {ref} from 'vue'
const activeIndex=ref('1')
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClick=index=>{
  activeIndex.value=index
}
</script>

<style>
.admin{
  display: flex;
  flex-direction: column;
  height: 100vh;
  .header-nav{
  padding: 0 60px;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  .left{
    display: flex;
    align-items: center;
    h1{
      color: #409EFF;
    }
  }
  .right{
    cursor: pointer;
    display: flex;
    align-items: center;
    .logout{
      margin-left: 40px;
    }
  }
}
.main{
  flex: 1;
  .el-menu{
    height: 100%;
  }
  .content{
    padding: 20px;
  }
}
}
</style>



