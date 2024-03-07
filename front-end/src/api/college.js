

import request from '@/utils/request'

// 学院列表
export function getCollegeListApi() {
  return request({
    url: `/system/dept/list?pageNum=${1}&pageSize=${10}&username=&phonenumber=&status=&deptId=`,
    method: 'get',
    timeout: 20000
  })
}
// 删除留言
export function delMessageApi(id) {
  return request({
    url: `/administrator/deleteLeaveMessage/${id}`,
    method: 'delete',
    timeout: 20000
  })
}