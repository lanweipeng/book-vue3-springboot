
import request from '@/utils/request'
import {addQuery} from '@/api/utils'
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
    url:addQuery('/home/selectReAnnouncementById',{
      announcementId:id
    }),
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

//添加公告
export function editNoticeApi({address,content,announcementId}) {
  return request({
    url: `/home/updateReAnnouncement`,
    data:{
      address,content,announcementId
    },
    method: 'put',
    timeout: 20000
  })
}

