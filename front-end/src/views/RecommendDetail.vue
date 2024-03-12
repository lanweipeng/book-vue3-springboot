<template>
<div>
  <Header />
  <main>
    <h2>图书详情</h2>
    <hr/>
    <div class="detail">
      <div class="info">
        <div class="img">
          <img :src="info.bookCover" alt="">
        </div>
        <div class="content">
          <div v-if="info.bookName" class="book-name">书名：{{ info.bookName }}</div>
          <div v-if="info.bookAuthor" class="author">作者：{{ info.bookAuthor }}</div>
          <div v-if="info.categoryName" class="category">分类：{{ info.categoryName }}</div>
        </div>
      </div>
      <div class="introduction">
        {{info.bookIntroduce}}
      </div>
    </div>
  </main>
</div>
</template>
<script setup>
import Header from '@/views/components/Header.vue';
import {getBookByIdApi} from '@/api/admin/book';
import {useRoute} from 'vue-router'
import {ref,reactive} from 'vue'
const route = useRoute();
const info = reactive({
  bookName:'',
  bookAuthor:'',
  bookCover:'',
  bookIntroduce:'',
  bookAuthor:'',
  categoryName:'',
})
getBookByIdApi(route.query.id)
.then(({data})=>{
  info.bookName=data.bookName
  info.bookAuthor=data.bookAuthor
  info.bookCover=data.bookCover
  info.bookIntroduce=data.bookIntroduce
  info.bookAuthor=data.bookAuthor
  info.categoryName = data.category.map(item=>item.categoryName).join('、')
})
</script>
<style lang='scss' scoped>
main{
  padding:20px 200px;
  hr{
    margin: 20px 0;
  }
  .detail{
    background-color: #ccc;
    padding: 20px 20px;
    .info{
      display: flex;
      .img {
        margin-right: 30px;
          img{
          width:200px;
          height:260px;
        }
      .content{
      background-color: #fff;
        display: flex;
        flex-direction: column;
       
        }
      }
    }
    .introduction{
      margin-top:30px;
      min-height:300px;
      background-color: #fff;
    }
  }
}
</style>