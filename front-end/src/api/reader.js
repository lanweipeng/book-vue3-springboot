

import request from '@/utils/request'
import {addQuery} from '@/api/utils'

// 读者列表
export function getReaderListApi(params={}) {
  const {
    deptName='',
    nickName='',
  }=params;

  return request({
    url:addQuery('/system/role/selectUserRole?roleId=2',{
      deptName,nickName
    }),
    method: 'get',
    timeout: 20000
  })
}
// 删除读者
export function delReaderApi(id) {
  return request({
    url: `/system/user/${id}`,
    method: 'delete',
    timeout: 20000
  })
}
//获取读者
export function getReaderByIdApi(id) {
  return request({
    url: `/system/user/selectUserById?userId=${id}`,
    method: 'get',
    timeout: 20000
  })
}
//添加读者
export function addReaderApi(params={}) {
  const {
    deptId= '',
      nickName= "",
      password= "",
      phonenumber= "",
      status= "",
      userName= "",
  }=params;
  return request({
    url: `/system/user`,
    data:{
      deptId,nickName,password,phonenumber,status,userName
    },
    method: 'post',
    timeout: 20000
  })
}
//编辑读者
export function editReaderApi(params={}) {
  const {
    deptId= '',
      nickName= "",
      password= "",
      phonenumber= "",
      status= "",
      userName= "",
      userId=''
  }=params;
  return request({
    url: `/system/user`,
    data:{
      deptId,nickName,password,phonenumber,status,userName,userId
    },
    method: 'put',
    timeout: 20000
  })
}

