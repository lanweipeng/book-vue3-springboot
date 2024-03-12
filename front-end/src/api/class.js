
import request from '@/utils/request'

// 分类列表
export function getClassListApi(params={}) {
  const {categoryName=''} = params;
  return request({
    url: `/administrator/selectCategoryList?categoryName=${categoryName}`,
    method: 'get',
    timeout: 20000
  })
}
// 删除分类
export function delClassApi(id) {
  return request({
    url: `/administrator/deleteCategory/${id}`,
    method: 'delete',
    timeout: 20000
  })
}
//获取分类
export function getClassByIdApi(id) {
  return request({
    url: `/administrator/deleteLeaveClass/${id}`,
    method: 'get',
    timeout: 20000
  })
}
//添加分类
export function addClassApi({categoryName,remark}) {
  return request({
    url: `/administrator/addCategory`,
    data:{
      categoryName,remark
    },
    method: 'post',
    timeout: 20000
  })
}
//编辑分类
export function ediClassApi({categoryName,remark,categoryId}) {
  return request({
    url: `/administrator/updateCategory`,
    data:{
      categoryName,remark,categoryId
    },
    method: 'put',
    timeout: 20000
  })
}

