<template>
  <div class="admin">
    <div class="header-nav">
    <div class="left">
      <h1>后台管理系统</h1>
    </div>
    <div class="right">
      <div>超级管理员</div>
      <div class="logout">退出</div>
    </div>
  </div>
  <el-row class="main">
    <el-col :span="4">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <el-menu-item index="1" route="admin-manage">
            <span>管理员日志</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span>登陆日志</span>
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
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
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
    background: #545c64;
  }
  .content{
    padding: 20px;
  }
}
}
</style>



