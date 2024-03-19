<template>
  <Header/>
  <main>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="书籍编号">
      <el-input type="text" v-model="form.bookId" />
    </el-form-item>
    <el-form-item label="计划归还时间">
      <el-date-picker
          v-model="form.borrowOver"
          type="date"
          placeholder="最多续借一个月"
          style="width: 100%"
        />
    </el-form-item>
    <el-form-item>
      <el-button  type="primary" @click="onSubmit">续借</el-button>
    </el-form-item>
  </el-form>
  </main>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {renewBookApi} from '@/api/my/renew'
import { ElMessage } from 'element-plus';
import Header from '@/views/components/Header.vue'
const form = reactive({
  bookId: '',
  borrowOver:''
})




const onSubmit = async () => {
  // await replyMessageByIdApi({ id, recover: form.recover })
  await renewBookApi({bookId:form.bookId,borrowOver:form.borrowOver})
  ElMessage.success('归还成功！')
}

</script>

<style lang="scss" scoped>
main{
  padding: 20px 200px;
}
</style>