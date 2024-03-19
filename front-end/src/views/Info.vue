<template>
  <h2>编辑资料</h2>
  <hr>
  <div class="main">
    <el-form :model="form" label-width="auto" style="max-width: 400px">


      <el-form-item label="姓名">
        <el-input type="text" rows="6" v-model="form.nickName" />
      </el-form-item>
      <el-form-item label="账号">
        <el-input type="text" rows="6" v-model="form.userName" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input type="text" rows="6" v-model="form.phonenumber" />
      </el-form-item>
      修改密码：<el-switch v-model="editPassword" />
      <el-form-item  v-if="editPassword" label="密码">
        <el-input rows="6" v-model="form.password" type="password" show-password />
      </el-form-item>
      <el-form-item  v-if="editPassword" label="确认密码">
        <el-input rows="6" v-model="form.confirmPassword" type="password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="handleBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { getInfoApi, editInfoApi } from '@/api/info'
import { ElMessage } from 'element-plus';


const form = reactive({
  nickName: '',
  confirmPassword: '',
  password: '',
  userName: '',
  phonenumber: ''
})

const editPassword = ref(false)




function getInfoDetail() {
  getInfoApi()
    .then(({ data }) => {
      form.nickName = data.nickName
      form.confirmPassword = data.confirmPassword
      form.password = data.password
      form.userName = data.userName
      form.phonenumber = data.phonenumber
    })
}
getInfoDetail()




const onSubmit = async () => {
  const obj={
    nickName:form.nickName,
  password: form.password||'',
  userName: form.userName,
  phonenumber: form.phonenumber,
  }
  if(editPassword.value){
    if(form.password===form.confirmPassword){
      obj.password=form.password
    }else{
      ElMessage('两次输入密码不一致')
      return
    }
  }
  console.log(obj)
  await editInfoApi(obj)
  ElMessage.success('编辑成功')
  getInfoDetail()
}
const router = useRouter();
const handleBack = () => {
  router.back()
}

</script>

<style scoped lang="scss">
h2 {
  margin-bottom: 10px;
}

.main {
  padding: 20px;
}

::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: .2s;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
}
</style>
