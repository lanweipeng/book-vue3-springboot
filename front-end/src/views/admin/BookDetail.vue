<template>
  <h2>{{ title }}</h2>
  <hr>
  <div class="main">
    <el-form :model="form" label-width="auto" style="max-width: 400px">
    <el-form-item label="书名">
      <el-input type="text" v-model="form.bookName" />
    </el-form-item>
    <el-form-item label="作者">
      <el-input type="text" v-model="form.bookAuthor" />
    </el-form-item>
    <el-form-item label="类别">
      <el-select
      v-model="form.categoryIds"
      placeholder="请选择"
      clearable
      multiple
    >
      <el-option
        v-for="item in options"
        :key="item.categoryId"
        :label="item.categoryName"
        :value="item.categoryId"
      />
    </el-select>
  
    </el-form-item>
    <el-form-item label="封面">

      <el-upload
    class="avatar-uploader"
    :action="pre+'/api/common/upload'"
    :headers="{Authorization:'Bearer ' + getToken()}"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
    </el-form-item>
 
    <el-form-item label="简介">
      <el-input type="textarea" rows="6" v-model="form.bookIntroduce" />
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
import { getBookByIdApi ,addBookApi,editBookApi} from '@/api/admin/book'
import {getClassListApi} from '@/api/class'
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import { getToken } from '@/utils/auth'

const route = useRoute();
const id = route.query.id
const title=id?'编辑书籍':'新增书籍'
/**
 * 表单
 */
const form = reactive({
  bookName: '',
  bookAuthor: '',
  categoryIds:[],
  bookIntroduce:'',
  bookCover:''
})
//分类
const options = ref([])
getClassListApi().then(res=>{
  console.log(res)
  options.value=res.data
})
//图片
const imageUrl = ref('')

const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  const url=response.url
  form.bookCover=url
  imageUrl.value = url
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
function getBookDetail() {
  if (id) {
    getBookByIdApi(id)
      .then(({data}) => {
        form.bookAuthor=data.bookAuthor;
        form.bookCover=data.bookCover
        form.bookIntroduce=data.bookIntroduce
        form.categoryIds=data.category.map(item=>item.categoryId)
        form.bookName=data.bookName
        imageUrl.value=data.bookCover
      })
  }

}
getBookDetail()

const recoverd = ref(false)
if (form.recover) {
  recoverd.value = true
}


const onSubmit = async () => {
  if(id){
    await editBookApi(({...form,bookId:id}))
    ElMessage.success('编辑成功')
  }else{
    await addBookApi(form)
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
