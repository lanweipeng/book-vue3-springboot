
import request from '@/utils/request'

// 图书列表
export function getBookListApi(params={}) {
  const {bookName='',loanStatus=''} = params;
  return request({
    url: `/administrator/selectPersonalRecordsList?bookName=${bookName}&loanStatus=${loanStatus}`,
    method: 'get',
    timeout: 20000
  })
}
// 删除图书
export function delBookApi(id) {
  return request({
    url: `/administrator/deleteCategory/${id}`,
    method: 'delete',
    timeout: 20000
  })
}
//获取图书
export function getBookByIdApi(id) {
  return request({
    url: `/administrator/deleteLeaveBook/${id}`,
    method: 'get',
    timeout: 20000
  })
}
//添加图书
export function addBookApi({categoryName,remark}) {
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

