

import request from '@/utils/request'
import {addQuery} from '@/api/utils'

// 学院列表
export function getCollegeListApi() {
  return request({
    url: `/system/dept/list?pageNum=${1}&pageSize=${10}&username=&phonenumber=&status=&deptId=`,
    method: 'get',
    timeout: 20000
  })
}
// 删除学院
export function delCollegeApi(id) {
  return request({
    url: `/system/dept/${id}`,
    method: 'delete',
    timeout: 20000
  })
}
// 添加学院
export function addCollegeApi(params={}) {
  const {deptName=''}=params;
  return request({
    url: '/system/dept/addCollege',
    data:{
      deptName
    },
    method: 'post',
    timeout: 20000
  })
}
//所有学院
export function getAllCollegeListApi(){
  return request({
    url: '/system/dept/selectCollege',
    method: 'get',
    timeout: 20000
  })
}