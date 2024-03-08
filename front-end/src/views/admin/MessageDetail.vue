<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="留言">
      <div class="message">{{ form.message }}</div>
    </el-form-item>
    <el-form-item label="回复">
      <div v-if="recoverd" class="message">{{ form.recover }}</div>
      <el-input v-else type="textarea" v-model="form.recover" />
    </el-form-item>

    <el-form-item>
      <el-button v-if="!recoverd" type="primary" @click="onSubmit">回复</el-button>
      <div v-else style="margin-right: 20px;">已回复</div>
      <el-button @click="handleBack">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { getMessageByIdApi, replyMessageByIdApi } from '@/api/message'
import { ElMessage } from 'element-plus';
const route = useRoute();
const id = route.params.id
const form = reactive({
  message: '',
  recover: '',
})
const recoverd = ref(false)

function getMessageDetail() {
  getMessageByIdApi(id)
    .then(res => {
      form.message = res.data.message
      form.recover = res.data.recover
      if (res.data.recover) {
        recoverd.value = true
      }
    })
}
getMessageDetail()



const onSubmit = async () => {
  await replyMessageByIdApi({ id, recover: form.recover })
  ElMessage.success('回复成功！')
  getMessageDetail()
}
const router = useRouter();
const handleBack = () => {
  router.back()
}

</script>

<style lang="scss" scoped>
.message {
  background-color: #ccc;
  padding: 10px 20px;
  border-radius: 2px;
  width: 600px;
}
</style>