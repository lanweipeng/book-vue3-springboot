

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
//获取用户信息
export function getUserByIdApi(id) {
  return request({
    url:addQuery('/system/user/selectUserById',{
      userId:id
    }),
    method: 'get',
    timeout: 20000
  })
}
//添加管理员
export function addAdminApi(params={}) {
  const {
      nickName= "",
      password= "",
      phonenumber= "",
      status= "",
      userName= ""
  }=params;
  return request({
    url: `/system/role/addUserRole`,
    data:{
      nickName,password,phonenumber,status,userName

    },
    method: 'post',
    timeout: 20000
  })
}


//编辑管理员

  export function editAdminApi(params={}) {
    const {
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
        nickName,password,phonenumber,status,userName,userId
      },
      method: 'put',
      timeout: 20000
    })
  }
  