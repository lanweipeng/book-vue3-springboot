
import request from '@/utils/request'

// 借阅列表
export function getBorrowListApi(params={}) {
  const {bookName='',bookAuthor=''} = params;
  return request({
    url: `/borrow/selectBorrowBook?bookName=${bookName}&bookAuthor=${bookAuthor}`,
    method: 'get',
    timeout: 20000
  })
}
// 借阅
export function borrowApi(bookId) {
  return request({
    url: `/borrow/addBorrowBook`,
    data:{
      bookId
    },
    method: 'post',
    timeout: 20000
  })
}
//获取借阅
export function getBorrowByIdApi(id) {
  return request({
    url: `/administrator/deleteLeaveBorrow/${id}`,
    method: 'get',
    timeout: 20000
  })
}
//添加借阅
export function addBorrowApi({categoryName,remark}) {
  console.log({addCategory:{categoryName,remark}})
  return request({
    url: `/administrator/addCategory`,
    body:{
      addCategory:{categoryName,remark}
    },
    method: 'post',
    timeout: 20000
  })
}

