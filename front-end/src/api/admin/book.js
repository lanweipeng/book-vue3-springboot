
import request from '@/utils/request'
import {addQuery} from '@/api/utils'
// 图书列表

export function getBookListApi(params={}) {
  console.log(params)
  const {bookName="",categoryName=""} = params;
  return request({
    url: addQuery('/administrator/selectBook',{
      bookName,categoryName,
    }),
    // url: `/administrator/selectBook?bookName=${bookName}&categoryName=${categoryName}`,
    method: 'get',
    timeout: 20000
  })
}
// 删除图书
export function delBookApi(id) {
  return request({
    url: `/administrator/deleteBook/${id}`,
    method: 'delete',
    timeout: 20000
  })
}
//获取图书
export function getBookByIdApi(id) {
  return request({
    url: addQuery('/home/selectBookById',{
      bookId:id
    }),
    method: 'get',
    timeout: 20000
  })
}
//添加图书
export function addBookApi(params) {
  const {
    bookName= '',
  bookAuthor= '',
  categoryIds=[],
  bookIntroduce='',
  bookCover=''
  }=params
  return request({
    url: `/administrator/addBook`,
    data:{bookName,bookAuthor,categoryIds,bookIntroduce,bookCover},
    method: 'post',
    timeout: 20000
  })
}
//编辑图书
export function editBookApi(params) {
  const {
    bookName= '',
  bookAuthor= '',
  categoryIds=[],
  bookIntroduce='',
  bookCover='',
  bookId=''
  }=params
  return request({
    url: `/administrator/updateBook`,
    data:{bookName,bookAuthor,categoryIds,bookIntroduce,bookCover,bookId},
    method: 'put',
    timeout: 20000
  })
}

