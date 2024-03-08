<template>
   <Header />
   <main>
    <el-form :inline="true" :model="formInline" Borrow="demo-form-inline">
   <el-form-item>
     <el-input v-model="formInline.bookName" placeholder="书名" clearable />
   </el-form-item>
   <el-form-item>
     <el-input v-model="formInline.bookAuthor" placeholder="作者" clearable />
   </el-form-item>
   <el-form-item>
     <el-button type="primary" @click="getBorrowList">查询</el-button>
   </el-form-item>
 </el-form>
<el-table :data="tableData" style="width: 100%">
  <el-table-column prop="bookName" label="书名" />
  <el-table-column prop="bookAuthor" label="图书编号" width="120"/>
  <el-table-column prop="bookAuthor" label="作者" width="80"/>
  <el-table-column prop="bookInventory" label="库存" width="80"/>
  <el-table-column fixed="right" label="操作" width="60">
    <template #default="scope">
      <el-button link type="primary" :disable="scope.row.bookInventory>0" size="small" @click="handleBorrow(scope.row.bookId)"
        >借阅</el-button
      >
    </template>
  </el-table-column>
</el-table>
   </main>
</template>

<script lang="ts" setup>
import {getBorrowListApi,borrowApi,addBorrowApi} from '@/api/borrow'
import { ElMessage, ElMessageBox } from 'element-plus';
import {ref} from 'vue'
import { reactive } from 'vue'
import Header from '@/views/components/Header.vue'
/**
* 搜索
*/
const formInline = reactive({
  bookName: '',
  bookAuthor: ''
})


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
const handleBorrow = async (id) => {
await ElMessageBox.confirm(
  '请确认是否借阅该书籍?',
  {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }
)
await borrowApi(id)
ElMessage.success('借阅成功！')
getBorrowList()
}

</script>
<style scoped lang="scss">
main{
  padding: 40px 100px;
}
</style>@/api/admin/borrow