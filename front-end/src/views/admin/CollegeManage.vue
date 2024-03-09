<template>
  <el-button type="primary" @click="openClassDialogForm">添加</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="deptName" label="学院名" />
    <el-table-column prop="createTime" label="创建时间" width="200" />
    <el-table-column fixed="right" label="操作" width="80">
      <template #default="scope">
        <el-button link type="danger" size="small" @click="handleClick(scope.row.leaveMessageId)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="500"
  >
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="分类名">
        <el-input v-model="form.categoryName" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddClass">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {getCollegeListApi,delMessageApi} from '@/api/college'
import { ElMessage, ElMessageBox } from 'element-plus';
import {ref,reactive} from 'vue'

/**
 * 添加
 */
const openClassDialogForm = ()=>{
  dialogVisible.value = true
}
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
function getCollegeList(){
  getCollegeListApi().then(res=>{
  tableData.value=res.data
})
}
getCollegeList();

/**
 * dialog
 */
 const dialogVisible = ref(false)
const title='添加分类'
const form=reactive({categoryName:'', remark:''})
const handleAddClass=async ()=>{
  await addClassApi({
    categoryName:form.categoryName,
    remark:form.remark,
  })
  ElMessage.success('添加成功')
  dialogVisible.value=false
  getCollegeList()
}
</script>
