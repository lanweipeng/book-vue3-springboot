<template>
  <div class="admin">
    <div class="header-nav">
      <div class="left">
        <h1>后台管理系统</h1>
      </div>
      <div class="right">
        <div>{{roleName}}</div>
        <div class="logout" >退出</div>
      </div>
    </div>
    <el-row class="main">
      <el-col :span="4">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu" :default-active="activeIndex"
          text-color="#fff" @open="handleOpen" @close="handleClose" router>
          <el-menu-item v-for="item in menu" :index="item.index" :route="item.route" :key="item.route">
            <span>{{ item.label }}</span>
          </el-menu-item>
          <!-- <el-menu-item index="2">
          <span>登陆日志</span>
        </el-menu-item>
        <el-menu-item index="11" route="reader-manage">
          <span>读者管理</span>
        </el-menu-item> -->
        </el-menu>
      </el-col>
      <el-col :span="20" class="content">
        <RouterView />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { SUPER_ADMIN_ROLEID, ADMIN_ROLEID } from '@/constant'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const roleName = ref('')
const menu = ref([])
const roleId = localStorage.getItem('roleId');
if (roleId == SUPER_ADMIN_ROLEID) {
  menu.value = [
    {
      index: 1,
      route: '/admin/admin-manage',
      label: '管理员日志'
    },
    {
      index: 2,
      route: '/admin/log-manage',
      label: '登陆日志'
    }
  ]
  roleName.value = '超级管理员'
}
if (roleId == ADMIN_ROLEID) {
  roleName.value = '管理员'
  menu.value = [
    {
      index: 1,
      route: '/admin/reader-manage',
      label: '读者管理'
    },
    {
      index: 2,
      route: '/admin/college-manage',
      label: '学院管理'
    },
  ]

}

const activeIndex = ref('');
menu.value.forEach(item=>{
  console.log(item.route,location.pathname)
  if(item.route===location.pathname){
    activeIndex.value=item.index
    console.log(activeIndex.value,item)
  }
})
</script>

<style>
.admin {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .header-nav {
    padding: 0 60px;
    height: 60px;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;

      h1 {
        color: #409EFF;
      }
    }

    .right {
      cursor: pointer;
      display: flex;
      align-items: center;

      .logout {
        margin-left: 40px;
      }
    }
  }

  .main {
    flex: 1;

    .el-menu {
      height: 100%;
      background: #545c64;
    }

    .content {
      padding: 20px;
    }
  }
}
</style>
