
import request from '@/utils/request'

// 联系管理员
export function getMessageListApi() {
  return request({
    url: `/administrator/selectMessageRecordList`,
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
//获取留言
export function getMessageByIdApi(id) {
  return request({
    url: `/personage/selectMessageRecordById?leaveMessageId=${id}`,
    method: 'get',
    timeout: 20000
  })
}
//回复留言
export function replyMessageByIdApi({id,recover}) {
  return request({
    url: `/administrator/replyMessage?leaveMessageId=${id}&recover=${recover}`,
  
    method: 'put',
    timeout: 20000
  })
}

