
import request from '@/utils/request'

// 留言记录
export function getMessageList() {
  return request({
    url: '/personage/selectMessageRecord',
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
