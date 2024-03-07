<template>
  <div>
    <Header />
    <main>
    

      <el-form ref="form" label-width="200px">
        
    <el-form-item label="留下你想说的">
      <el-input  type="textarea" v-model="message" :rows="6" style="width: 500px;"></el-input>
    </el-form-item>
   
   
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确认</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
    </main>
  </div>
</template>
<script setup lang="ts">
import Header from './components/Header.vue'
import {contactAdminApi} from '@/api/contact'
import { ElMessage } from 'element-plus';
import {reactive,ref} from 'vue'

 const message=ref()
const onSubmit=()=>{
  contactAdminApi({
    message:message.value
  }).then(()=>{
    message.value=''
    ElMessage({
    message: '发送成功',
    type: 'success',
  })
  })
}
</script>





  <style scoped>
  main{
    padding: 20px;
  }
  </style>