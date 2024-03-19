<template>
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item>
      <el-input v-model="formInline.bookName" placeholder="书名" clearable />
    </el-form-item>
    <el-form-item>
     <el-select
      v-model="formInline.loanStatus"
      placeholder="请选择借阅状态"
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
      <el-button type="primary" @click="openClassDialogForm">添加</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="bookName" label="书名" />
    <el-table-column prop="bookId" label="书籍编号" />
    <el-table-column prop="nickName" label="姓名" />
    <el-table-column label="借阅状态" width="120" >
      <template #default="scope">
        <div style="color:#409EFF" v-if="scope.row.loanStatus===0">借阅中</div>
        <div  style="color:#67C23A" v-if="scope.row.loanStatus===1">已归还</div>
        <div  style="color:#F56C6C" v-if="scope.row.loanStatus===2">未归还</div>
        <div  style="color:#409EFF" v-if="scope.row.loanStatus===3">续借中</div>
        
      </template>
    </el-table-column>
    <el-table-column label="借阅时间" width="200" >
     <template #default="scope">
       {{!scope.row.borrowStart?'-':moment(scope.row.borrowStart).format('yyyy-MM-DD hh:mm:ss')}}
     </template>
   </el-table-column>
   <el-table-column label="截止归还时间" width="200" >
     <template #default="scope">
       {{!scope.row.borrowReturn?'-':moment(scope.row.borrowReturn).format('yyyy-MM-DD hh:mm:ss')}}
     </template>
   </el-table-column>
    <el-table-column fixed="right" label="操作" width="160">
      <template #default="scope">
        <el-button v-if="scope.row.loanStatus!==1" link type="primary" size="small" @click="handleReturn(scope.row.borrowId)"
          >归还</el-button
        >
        <el-button v-else link type="primary" size="small" @click="handleRenew(scope.row.borrowId)"
          >续借</el-button
        >
        <el-button link type="danger" :disabled="scope.row.loanStatus!==1" size="small" @click="handleDelete(scope.row.borrowId)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import {getBorrowListApi,delBorrowApi,returnBookApi,returnRenewByIdApi} from '@/api/my/borrow'
import { ElMessage } from 'element-plus';
import moment from 'moment';
import {ref,reactive} from 'vue'
/**
 * 搜索
 */
 const formInline = reactive({
  bookName: '',
  loanStatus: '',
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
const openClassDialogForm = ()=>{
  // dialogVisible.value = true
}

/**
 * 表格
 */
const tableData=ref([])

function getBorrowList(){
  getBorrowListApi({
    bookName:formInline.bookName,
    loanStatus:formInline.loanStatus,
  }).then(res=>{
  tableData.value=res.data
})
}
getBorrowList()

//删除
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
//归还
const handleReturn=async borrowId=>{
  await returnBookApi({borrowId})
  ElMessage.success('归还成功！')
  getBorrowList()

}
//续借
const handleRenew = async borrowId=>{
  await returnRenewByIdApi({borrowId})
  ElMessage.success('续借成功！')
  getBorrowList()


}
</script>
