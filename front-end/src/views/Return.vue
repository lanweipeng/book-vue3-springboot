<template>
  <Header/>
  <main>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="书籍编号">
      <el-input type="text" v-model="form.bookId" />
    </el-form-item>
    <el-form-item>
      <el-button  type="primary" @click="onSubmit">归还</el-button>
    </el-form-item>
  </el-form>
  </main>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {returnBookApi} from '@/api/my/return'
import { ElMessage } from 'element-plus';
import Header from '@/views/components/Header.vue'
const form = reactive({
  bookId: '',
})




const onSubmit = async () => {
  // await replyMessageByIdApi({ id, recover: form.recover })
  await returnBookApi({bookId:form.bookId})
  ElMessage.success('归还成功！')
}

</script>

<style lang="scss" scoped>
main{
  padding: 20px 200px;
}
</style>