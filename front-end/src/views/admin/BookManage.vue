<template>
   <el-form :inline="true" :model="formInline" Book="demo-form-inline">
    <el-form-item>
      <el-input v-model="formInline.bookName" placeholder="书名" clearable />
    </el-form-item>
    <el-form-item>
      <el-input v-model="formInline.categoryName" placeholder="分类名" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getBookList">查询</el-button>
      <el-button type="primary" @click="openBookDialogForm">添加</el-button>
    </el-form-item>
  </el-form>
 <el-table :data="tableData" style="width: 100%">
   <el-table-column prop="bookName" label="书名" />
   <el-table-column prop="bookAuthor" label="作者"   width="100"/>
   <el-table-column prop="bookId" label="书id"   width="100"/>
   <el-table-column prop="bookInventory" label="库存"   width="100"/>
   <el-table-column fixed="right" label="类名" width="200">
     <template #default="scope">
      {{scope.row.category.map(item=>item.categoryName).join('、')}}
     </template>
   </el-table-column>
   
   <el-table-column fixed="right" label="操作" width="120">
     <template #default="scope">
      <el-button link type="primary" size="small" @click="handleEdit(scope.row.bookId)"
         >编辑</el-button
       >
       <el-button link type="danger" size="small" @click="handleDelete(scope.row.bookId)"
         >删除</el-button
       >
     </template>
   </el-table-column>
 </el-table>

</template>

<script lang="ts" setup>
import {getBookListApi,delBookApi,addBookApi} from '@/api/admin/book'
import { ElMessage, ElMessageBox } from 'element-plus';
import {ref} from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
/**
 * 搜索
 */
const formInline = reactive({
  categoryName: '',
  bookName:''
})
/**
 * 添加
 */
const router = useRouter()
const openBookDialogForm = ()=>{
  router.push(`/admin/book-detail`)
}
/**
 * 表格
 */
const tableData=ref([])
function getBookList(){
  getBookListApi({categoryName:formInline.categoryName,bookName:formInline.bookName}).then(res=>{
 tableData.value=res.data
})
}
getBookList();

/**
 * 删除
 */
const handleDelete = async (id) => {
 await ElMessageBox.confirm(
   '请确认是否删除?',
   {
     confirmButtonText: '确认',
     cancelButtonText: '取消',
     type: 'warning',
   }
 )
 await delBookApi(id)
 ElMessage.success('删除成功！')
 getBookList()
}

/**
 * 编辑
 */
const handleEdit=id=>{
  router.push(`/admin/book-detail?id=${id}`)
}
</script>
