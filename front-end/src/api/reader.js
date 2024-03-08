

import request from '@/utils/request'

// 读者列表
export function getReaderListApi(params={}) {
  const {
    deptName='',
    nickName='',
  }=params;

  return request({
    url: `/system/role/selectUserRole?roleId=3&deptName=${deptName}&nickName=${nickName}`,
    method: 'get',
    timeout: 20000
  })
}
// 删除读者
export function delReaderApi(id) {
  return request({
    url: `/administrator/deleteCategory/${id}`,
    method: 'delete',
    timeout: 20000
  })
}
//获取读者
export function getReaderByIdApi(id) {
  return request({
    url: `/administrator/deleteLeaveReader/${id}`,
    method: 'get',
    timeout: 20000
  })
}
//添加读者
export function addReaderApi({categoryName,remark}) {
  return request({
    url: `/administrator/addCategory`,
    data:{
      categoryName,remark
    },
    method: 'post',
    timeout: 20000
  })
}

