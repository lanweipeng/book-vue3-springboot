import request from '@/utils/request'

// 联系管理员
export function contactAdminApi({message}) {
  return request({
    url: `/personage/addMessage?message=${message}`,
    method: 'post',
    timeout: 20000
  })
}