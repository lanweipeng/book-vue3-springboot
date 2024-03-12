
import request from '@/utils/request'


//获取信息
export function getInfoApi() {
  return request({
    url: '/personage/selectPersonalInformation',
    method: 'get',
    timeout: 20000
  })
}
//修改信息
export function editInfoApi(data) {
  return request({
    url: `/personage/updateNowUser`,
    data,
    method: 'put',
    timeout: 20000
  })
}

