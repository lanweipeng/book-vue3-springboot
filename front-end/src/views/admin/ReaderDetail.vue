<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="留言">
      <div class="message">{{form.message}}</div>
    </el-form-item>
    <el-form-item label="回复">
      <div v-if="recoverd" class="message">{{form.recover}}</div>
      <el-input v-else type="textarea" v-model="form.recover" />
    </el-form-item>
 
    <el-form-item>
      <el-button type="primary" @click="onSubmit">回复</el-button>
      <el-button @click="handleBack">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import {getMessageByIdApi,replyMessageByIdApi} from '@/api/message'
const route = useRoute();
const id=route.params.id
const form = reactive({
  message: '',
  recover: '',
})
console.log(route,id)
console.log(route,id)
getMessageByIdApi(id)
.then(res=>{
console.log(res)
})
const recoverd = ref(false)
if(form.recover){
  recoverd.value=true
}


const onSubmit = () => {
  replyMessageByIdApi({id,recover:form.recover})
}
const router = useRouter();
const handleBack = () => {
  router.back()
}

</script>
