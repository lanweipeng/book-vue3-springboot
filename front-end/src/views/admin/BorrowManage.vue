<template>
  <el-form :inline="true" :model="formInline" Borrow="demo-form-inline">
   <el-form-item>
     <el-input v-model="formInline.bookName" placeholder="书名" clearable />
   </el-form-item>
   <el-form-item>
     <el-select
      v-model="formInline.loanStatus"
      placeholder="请选择"
      style="width: 240px"
      clearable
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
   </el-form-item>
   <el-form-item>
     <el-button type="primary" @click="getBorrowList">查询</el-button>
     <el-button type="primary" @click="openBorrowDialogForm">添加</el-button>
   </el-form-item>
 </el-form>
<el-table :data="tableData" style="width: 100%">
  <el-table-column prop="bookName" label="书名" />
  <el-table-column label="到期时间" width="200" >
    <template #default="scope">
      {{!scope.row.borrowOver?'-':moment(scope.row.borrowOver).format('yyyy-MM-DD hh:mm:ss')}}
    </template>
  </el-table-column>
  <el-table-column label="归还时间" width="200" >
    <template #default="scope">
      {{!scope.row.borrowReturn?'-':moment(scope.row.borrowReturn).format('yyyy-MM-DD hh:mm:ss')}}
    </template>
  </el-table-column>
    <el-table-column label="借阅时间" width="200" >
    <template #default="scope">
      {{!scope.row.borrowStart?'-':moment(scope.row.borrowStart).format('yyyy-MM-DD hh:mm:ss')}}
    </template>
  </el-table-column>
  <el-table-column label="借阅状态" width="120" >
      <template #default="scope">
        <div style="color:#409EFF" v-if="scope.row.loanStatus===0">借阅中</div>
        <div  style="color:#67C23A" v-if="scope.row.loanStatus===1">已归还</div>
        <div  style="color:#F56C6C" v-if="scope.row.loanStatus===2">未归还</div>
        <div  style="color:#409EFF" v-if="scope.row.loanStatus===3">续借中</div>
      </template>
    </el-table-column>
  <el-table-column fixed="right" label="操作" width="160">
    <template #default="scope">
      <el-button link type="primary" :disabled="scope.row.loanStatus===1" size="small" @click="handleReturn(scope.row.borrowId)"
        >归还</el-button
      >
      <el-button link type="danger"  :disabled="scope.row.loanStatus!==1" size="small" @click="handleDelete(scope.row.borrowId)"
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
     <div Borrow="dialog-footer">
       <el-button @click="dialogVisible = false">取消</el-button>
       <el-button type="primary" @click="handleAddBorrow">
         确认
       </el-button>
     </div>
   </template>
 </el-dialog>
</template>

<script lang="ts" setup>
import {getBorrowListApi,delBorrowApi,addBorrowApi, returnBookApi} from '@/api/admin/borrow'
import { ElMessage, ElMessageBox } from 'element-plus';
import {ref} from 'vue'
import moment from 'moment'
import { reactive } from 'vue'
/**
* 搜索
*/
const formInline = reactive({
  bookName: '',
  loanStatus: ''
})
const options=[
  {value:0,label:'借阅中'},
  {value:1,label:'已归还'},
  {value:2,label:'未归还'},
  {value:3,label:'续借中'},
]
/**
* 添加
*/
const openBorrowDialogForm = ()=>{
 dialogVisible.value = true
}
/**
* 表格
*/
const tableData=ref([])
function getBorrowList(){
 getBorrowListApi(formInline).then(res=>{
tableData.value=res.data
})
}
getBorrowList();

/**
* 删除
*/
const handleDelete = async (id) => {
await ElMessageBox.confirm(
  '请确认是否删除该借阅记录?',
  {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }
)
await delBorrowApi(id)
ElMessage.success('删除成功！')
getBorrowList()
}
/**
 * 归还
 */
 const handleReturn =async id=>{
  await ElMessageBox.confirm(
  '请确认是否归还该书籍?',
  {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }
)
  await returnBookApi(id)
  ElMessage.success('归还成功！')
  getBorrowList()
}
/**
* dialog
*/
const dialogVisible = ref(false)
const title='添加分类'
const form=reactive({categoryName:'', remark:''})
const handleAddBorrow=async ()=>{
 await addBorrowApi({
   categoryName:form.categoryName,
   remark:form.remark,
 })
 ElMessage.success('添加成功')
 dialogVisible.value=false
 getBorrowList()
}
</script>@/api/admin/borrow
