
import request from '@/utils/request'

// 学院列表
export function getReaderListApi() {
  return request({
    url: `/system/user/list?deptName=&status=`,
    method: 'get',
    timeout: 20000
  })
}