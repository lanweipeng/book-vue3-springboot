<template>
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item>
      <el-input v-model="formInline.deptName" placeholder="学院名" clearable />
    </el-form-item>
    <el-form-item>
      <el-input v-model="formInline.nickName" placeholder="姓名" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getReaderList">查询</el-button>
      <el-button type="primary" @click="openClassDialogForm">添加</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="phonenumber" label="手机号" />
    <el-table-column prop="nickName" label="姓名" />
    <el-table-column prop="userName" label="账号" />
    <el-table-column prop="deptName" label="学院" />
    <el-table-column fixed="right" label="操作" width="160">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleEdit(scope.row.userId)"
          >编辑</el-button
        >
        <el-button link type="danger" size="small" @click="handleDelete(scope.row.userId)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import {getReaderListApi} from '@/api/reader'
import { ElMessageBox } from 'element-plus';
import {ref,reactive} from 'vue'
/**
 * 搜索
 */
 const formInline = reactive({
  deptName: '',
  nickName: '',
})
/**
 * 添加
 */
const openClassDialogForm = ()=>{
  // dialogVisible.value = true
}

/**
 * 表格
 */
const tableData=ref([])

function getReaderList(){
  getReaderListApi().then(res=>{
  tableData.value=res.rows
})
}
getReaderList()

//删除
 const handleDelete = async (id) => {
  await ElMessageBox.confirm(
    '请确认是否删除该读者?',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  await delMessageApi(id)
  ElMessageBox('删除成功！')
}
//编辑
const handleEdit=id=>{

}
</script>
