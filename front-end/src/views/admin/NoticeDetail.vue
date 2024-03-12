<template>
  <h2>{{ title }}</h2>
  <hr>
  <div class="main">
    <el-form :model="form" label-width="auto" style="max-width: 400px">
    <el-form-item label="图片">

      <el-upload
    class="avatar-uploader"
    :headers="{Authorization:'Bearer ' + getToken()}"
    :action="pre+'/api/common/upload'"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
    </el-form-item>
 
    <el-form-item label="简介">
      <el-input type="textarea" rows="6" v-model="form.content" />
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
import { getNoticeByIdApi ,addNoticeApi, editNoticeApi} from '@/api/notice'
import {getClassListApi} from '@/api/class'
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import { getToken } from '@/utils/auth'

const route = useRoute();
const id = route.query.id
const title=id?'编辑公告':'新增公告'
const form = reactive({
  address:'',content:'',announcementId:''
})
const options = ref([])
getClassListApi().then(res=>{
  console.log(res)
  options.value=res.data
})
const imageUrl = ref('')

const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  const url=response.url
  imageUrl.value = url
  form.address = url
}

const beforeAvatarUpload = (rawFile) => {
  if (  !['image/jpeg','image/jpg','image/png'].includes(rawFile.type)) {
    ElMessage.error('图片必须是jpeg/jpg/png')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
function getNoticeDetail() {
  if (id) {
    getNoticeByIdApi(id)
      .then(({data}) => {
        form.content = data.content
        form.address = data.address
        form.announcementId = data.announcementId
        imageUrl.value=data.address
      })
  }

}
getNoticeDetail()




const onSubmit = async () => {
  if(id){
    await editNoticeApi(form)
  ElMessage.success('编辑成功')
  }else{
    await addNoticeApi(form)
  ElMessage.success('新增成功')
  }
 
  router.back()
}
const router = useRouter();
const handleBack = () => {
  router.back()
}

const pre=location.origin
</script>
<style scoped lang="scss">
h2{
  margin-bottom: 10px;
}
.main{
  padding: 20px;
}
::v-deep  .avatar-uploader .el-upload {
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
.avatar{
  width: 178px;
  height: 178px;
}
</style>
