<template>
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item>
      <el-input v-model="formInline.categoryName" placeholder="分类名" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getClassList">查询</el-button>
      <el-button type="primary" @click="openClassDialogForm">添加</el-button>
    </el-form-item>
  </el-form>
 <el-table :data="tableData" style="width: 100%">
   <el-table-column prop="categoryName" label="分类" />
   <el-table-column prop="remark" label="备注"   width="100"/>
   <el-table-column label="创建时间" width="200" >
     <template #default="scope">
       {{!scope.row.createTime?'-':moment(scope.row.createTime).format('yyyy-MM-DD hh:mm:ss')}}
     </template>
   </el-table-column>
   <el-table-column label="更新时间" width="200" >
     <template #default="scope">
       {{!scope.row.updateTime?'-':moment(scope.row.updateTime).format('yyyy-MM-DD hh:mm:ss')}}
     </template>
   </el-table-column>
   <el-table-column fixed="right" label="操作" width="160">
     <template #default="scope">
      <el-button link type="primary" size="small" @click="handleEdit(scope.row)"
         >编辑</el-button>
       <el-button link type="danger" size="small" @click="handleDelete(scope.row.categoryId)"
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
        <el-button type="primary" @click="handleSubmit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {getClassListApi,delClassApi,addClassApi,ediClassApi} from '@/api/class'
import { ElMessage, ElMessageBox } from 'element-plus';
import {ref} from 'vue'
import moment from 'moment'
import { reactive } from 'vue'
/**
 * 搜索
 */
const formInline = reactive({
  categoryName: '',
})
/**
 * 添加
 */
const openClassDialogForm = ()=>{
  dialogVisible.value = true
}
/**
 * 表格
 */
const tableData=ref([])
function getClassList(){
  getClassListApi({categoryName:formInline.categoryName}).then(res=>{
 tableData.value=res.data
})
}
getClassList();
/**
 * 编辑
 */
function handleEdit(row){
  form.categoryId = row.categoryId
  form.categoryName=row.categoryName
  form.remark=row.remark
  dialogVisible.value=true
}
/**
 * 删除
 */
const handleDelete = async (id) => {
 await ElMessageBox.confirm(
   '请确认是否删除该分类?',
   {
     confirmButtonText: '确认',
     cancelButtonText: '取消',
     type: 'warning',
   }
 )
 await delClassApi(id)
 ElMessage.success('删除成功！')
 getClassList()
}

/**
 * dialog
 */
const dialogVisible = ref(false)
const title='添加分类'
const form=reactive({categoryName:'', remark:'',categoryId:''})
const handleSubmit=()=>{
  if(form.categoryId){
    handleEditClass()
  }else{
    handleAddClass();
  }
}
const handleAddClass=async ()=>{
  await addClassApi({
    categoryName:form.categoryName,
    remark:form.remark,
  })
  form.categoryName=''
  form.remark=''
  ElMessage.success('添加成功')
  dialogVisible.value=false
  getClassList()
}
const handleEditClass=async ()=>{
  await ediClassApi({
    categoryId:form.categoryId,
    categoryName:form.categoryName,
    remark:form.remark,
  })
  form.categoryId=''
  form.categoryName=''
  form.remark=''
  ElMessage.success('编辑成功')
  dialogVisible.value=false
  getClassList()
}
</script>
