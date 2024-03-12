
import request from '@/utils/request'
import {addQuery} from '@/api/utils'

// 书籍列表
export function getRecommendListApi(params={}) {
  const {
    bookAuthor='',
    bookName='',
    categoryId='',
  }=params;
  return request({
    url:addQuery('/home/selectBookList',{
      bookAuthor,bookName,categoryId
    }),
    method: 'get',
    timeout: 20000
  })
}