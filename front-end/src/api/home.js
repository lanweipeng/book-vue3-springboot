
import request from '@/utils/request'

// 最受欢迎分类
export function getTop3HotCategoryApi() {
  return request({
    url: `/home/selectPopularCategory`,
    method: 'get',
    timeout: 20000
  })
}
// 最受欢迎借阅
export function getTop3HotBorrowApi() {
  return request({
    url: `/home/selectBorrowedReaders`,
    method: 'get',
    timeout: 20000
  })
}
//公告列表
export function getBannerListApi() {
  return request({
    url: `/home/selectReAnnouncement`,
    method: 'get',
    timeout: 20000
  })
}
