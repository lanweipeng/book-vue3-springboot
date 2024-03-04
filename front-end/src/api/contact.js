import request from '@/utils/request'

// 联系管理员
export function contactAdminApi({message,userId}) {
  return request({
    url: '/personage/addMessage',
    body:{
      message,userId
    },
    method: 'post',
    timeout: 20000
  })
}