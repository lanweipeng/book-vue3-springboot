
import request from '@/utils/request'
// 归还
export function renewBookApi(params={}) {
  const {bookId='',borrowOver=''} = params;
  return request({
    url:'/borrow/renewBorrowBookName',
    // url:'/borrow/returnBorrowBook',
    data:{
      bookId,borrowOver,
    },
    method: 'put',
    timeout: 20000
  })
}