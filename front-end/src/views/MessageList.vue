<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="message" label="留言" />
    <el-table-column prop="recover" label="回复" />
    <el-table-column label="状态" width="120" >
      <template #default="scope">
        <div style="color:#ccc" v-if="scope.row.status===0">未回</div>
        <div  style="color:#67C23A" v-if="scope.row.status===1">已回</div>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="200" />
    <el-table-column fixed="right" label="操作" width="80">
      <template #default="scope">
        <el-button link type="danger" size="small" @click="handleClick(scope.row.leaveMessageId)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import {getMessageList,delMessageApi} from '@/api/center'
import { ElMessageBox } from 'element-plus';
import {ref} from 'vue'
const handleClick = async (id) => {
  await ElMessageBox.confirm(
    '请确认是否删除该留言?',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  await delMessageApi(id)
  ElMessageBox('删除成功！')
}
const tableData=ref([])
getMessageList().then(res=>{
  tableData.value=res.data
})

</script>
