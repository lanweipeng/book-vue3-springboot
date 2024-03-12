

import request from '@/utils/request'
import {addQuery} from '@/api/utils'
// 管理员列表
export function getAdminListApi(params={}) {
  const {
    deptName='',
    nickName='',
  }=params;

  return request({
    url:addQuery('/system/role/selectUserRole?roleId=3',{
      deptName,nickName
    }),
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

