<template>
  <div>
    <Header />
    <div class="container">
      <aside>
        <ul>
          <li v-for="item in categorys" :key="item.categoryId" 
            @click="handleClickClass(item.categoryId)"
            :class="{ 'is-active': item.categoryId == formInline.categoryId }">{{
            item.categoryName }}</li>
        </ul>
      </aside>
      <main>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="formInline.bookName" placeholder="书本" clearable />
          </el-form-item>
          <el-form-item>
            <el-input v-model="formInline.bookAuthor" placeholder="作者" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getRecommendList">查询</el-button>
          </el-form-item>
        </el-form>
        <ul class="recommend-list">
          <li v-for="item in recommends" class="c-p" :key="item.bookId" @click="gotoDetail(item.bookId)">
            <div class="cover">
              <img :src="item.bookCover" alt="">
            </div>
            <div class="content">
              <div>{{ item.bookName }}</div>
              <div class="book-author">{{ item.bookAuthor }}</div>
            </div>
            <div class="oprator">

            </div>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>

<script setup>

import Header from '@/views/components/Header.vue'

import { ref, reactive } from 'vue'
import { getClassListApi } from '@/api/class'
import { getRecommendListApi } from '@/api/recommend'
import {useRouter} from 'vue-router'
/**
 * 分类
 */
const categorys = ref([])
getClassListApi()
  .then(res => {
    const { data } = res;
    categorys.value = data
    formInline.categoryId = data[0].categoryId
    getRecommendList()
  })
const handleClickClass=(id)=>{
  formInline.categoryId=id
  getRecommendList()
}
/**
 * 搜索
 */
const formInline = reactive({
  bookAuthor: '',
  bookName: '',
  categoryId: '',
})
const recommends = ref([])
function getRecommendList() {
  getRecommendListApi({
    bookAuthor:formInline.bookAuthor,
    bookName:formInline.bookName,
    categoryId:formInline.categoryId,
  })
    .then(res => {
      recommends.value = res.data;
    })
}
const router=useRouter()
const gotoDetail=id=>{
  router.push('/recommend-detail?id='+id)
}
</script>

<style lang='scss' scoped>
@import '@/scss/var.scss';

.container {
  padding: 60px 200px;
  display: flex;

  aside {
    min-width: 160px;

    li {
      cursor: pointer;
      margin-bottom: 30px;
      font-size: 18px;

      &.is-active {
        color: $main-color;
      }
    }
  }

  main {
    .recommend-list {
      width: 680px;
      li {
        background-color: #ecf5ff;
        margin-bottom: 20px;
        padding: 20px;
        display: flex;

        .cover {
          width: 100px;
          height: 80px;
          margin-right: 20px;

          img {
            width: 100px;
            height: 80px;
          }
        }
        .book-author{
          font-size: 14px;
          color: #888;
        }
      }

    }
  }
}
</style>