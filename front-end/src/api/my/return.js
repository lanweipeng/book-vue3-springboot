
import request from '@/utils/request'
import {addQuery} from '@/api/utils'
// 归还
export function returnBookApi(params={}) {
  const {bookId=''} = params;
  console.log(bookId)
  return request({
    // url: `/personage/selectPersonalRecords?bookName=${bookName}`,
    url:addQuery('/borrow/returnBorrowByBookId',{
      bookId
    }),
    // url:'/borrow/returnBorrowBook',
    data:{
      bookId
    },
    method: 'put',
    timeout: 20000
  })
}