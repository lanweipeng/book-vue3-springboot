
import request from '@/utils/request'

// 公告列表
export function getNoticeListApi() {
  return request({
    url: `/home/selectReAnnouncement`,
    method: 'get',
    timeout: 20000
  })
}
// 删除公告
export function delNoticeApi(id) {
  return request({
    url: `/home/deleteReAnnouncement/${id}`,
    method: 'delete',
    timeout: 20000
  })
}
//获取公告
export function getNoticeByIdApi(id) {
  return request({
    url: `/administrator/deleteLeaveNotice/${id}`,
    method: 'get',
    timeout: 20000
  })
}
//添加公告
export function addNoticeApi({address,content}) {
  return request({
    url: `/home/addReAnnouncement`,
    data:{
      address,content
    },
    method: 'post',
    timeout: 20000
  })
}

