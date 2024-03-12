<template>
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item>
      <el-button type="primary" @click="getNoticeList">查询</el-button>
      <el-button type="primary" @click="handleAddNotice">添加</el-button>
    </el-form-item>
  </el-form>
 <el-table :data="tableData" style="width: 100%">
   <el-table-column prop="content" label="内容" />
   <el-table-column label="图片" width="200" >
     <template #default="scope">
      <img :src="scope.row.address" style="height:60px;width:80px" />
     </template>
   </el-table-column>
   <el-table-column label="创建时间" width="200" >
     <template #default="scope">
       {{!scope.row.createTime?'-':moment(scope.row.createTime).format('yyyy-MM-DD hh:mm:ss')}}
     </template>
   </el-table-column>
   <el-table-column fixed="right" label="操作" width="160">
     <template #default="scope">
      <el-button link type="primary" size="small" @click="handleEdit(scope.row.announcementId)"
         >编辑</el-button
       >
       <el-button link type="danger" size="small" @click="handleDelete(scope.row.announcementId)"
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
import {getNoticeListApi,delNoticeApi,addNoticeApi} from '@/api/notice'
import { ElMessage, ElMessageBox } from 'element-plus';
import {ref} from 'vue'
import moment from 'moment'
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
/**
 * 搜索
 */
const formInline = reactive({
  categoryName: '',
})
/**
 * 添加
 */
const router = useRouter();
const handleAddNotice = ()=>{
  router.push('/admin/notice-detail')
}
/**
 * 表格
 */
const tableData=ref([])
function getNoticeList(){
  getNoticeListApi({categoryName:formInline.categoryName}).then(res=>{
 tableData.value=res.data
})
}
getNoticeList();
/**
 * 编辑
 */
const handleEdit=(id)=>{
  router.push('/admin/notice-detail?id='+id)

}
/**
 * 删除
 */
const handleDelete = async (id) => {
 await ElMessageBox.confirm(
   '请确认是否删除该公告?',
   {
     confirmButtonText: '确认',
     cancelButtonText: '取消',
     type: 'warning',
   }
 )
 await delNoticeApi(id)
 ElMessage.success('删除成功！')
 getNoticeList()
}


</script>
