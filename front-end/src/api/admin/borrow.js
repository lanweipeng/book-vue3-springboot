
import request from '@/utils/request'

// 借阅列表
export function getBorrowListApi(params={}) {
  const {bookName='',loanStatus=''} = params;
  return request({
    url: `/administrator/selectPersonalRecordsList?bookName=${bookName}&loanStatus=${loanStatus}`,
    method: 'get',
    timeout: 20000
  })
}
// 删除借阅
export function delBorrowApi(id) {
  return request({
    url: `/administrator/deleteCategory/${id}`,
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

