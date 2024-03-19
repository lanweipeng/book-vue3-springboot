
import request from '@/utils/request'
import {addQuery} from '@/api/utils'
// 借阅列表
export function getBorrowListApi(params={}) {
  const {bookName='',loanStatus=''} = params;
  return request({
    // url: `/personage/selectPersonalRecords?bookName=${bookName}`,
    url:addQuery('/personage/selectPersonalRecords',{
      bookName,loanStatus
    }),
    method: 'get',
    timeout: 20000
  })
}
// 删除借阅
export function delBorrowApi(id) {
  return request({
    url: `/administrator/deleteBorrowingRecord/${id}`,
    method: 'delete',
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

//归还书籍
export function returnBookApi({borrowId}) {
  return request({
    url: `/borrow/returnBorrowBook`,
    data:{
      borrowId
    },
    method: 'put',
    timeout: 20000
  })
}
export function returnBookByIdApi({borrowId}) {
  return request({
    url: `/borrow/returnBorrowByBookId`,
    data:{
      borrowId
    },
    method: 'put',
    timeout: 20000
  })
}
//续借
export function returnRenewByIdApi({borrowId}) {
  return request({
    url: `/borrow/renewBorrowBook`,
    data:{
      borrowId
    },
    method: 'put',
    timeout: 20000
  })
}
