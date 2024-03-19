<template>
  <div class="home">
    <Header />
    <main>
      <div class="banner" v-if="banners.length>0">
        <ul>
          <li v-for="(item,i) in banners" :key="item.announcementId" :class="{show:i===index}">
            <!-- <div v-if="i===1"> -->
              <img :src="item.address" />
            <div class="bottom-text">{{ item.content }}</div>
            <!-- </div> -->
          </li>
        </ul>
      </div>
      <div class="statistics">
        <div class="class">
          <div class="title">
            最受欢迎分类Top3
          </div>
          <ul>
            <li v-for="item in classes" :key="item.key">
              <div class="name">{{ item.name }}</div>
              <div class="per-box">
                <div class="per__wrapper">
                  <span class="per" :style="{ width: item.per, background: item.color }"></span>
                </div>
                <div class="per-text">{{ item.per }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="borrow">
          <div class="title">
            本月借阅量最高读者Top3
            <table border="1" width="40%" align="center">
              <tr>
                <td style="width: 80px;">名次</td>
                <td style="width: 80px;">账号</td>
                <td style="width: 120px;">姓名</td>
                <td style="width: 80px;">借阅数</td>
              </tr>
              <tr v-for="(item, index) in borrowRows" :key="item.userId">
                <td style="width: 80px;">{{ index + 1 }}</td>
                <td style="width: 80px;">{{ item.userId }}</td>
                <td style="width: 120px;">{{ item.userName }}</td>
                <td style="width: 80px;">{{ item.num }}</td>
              </tr>
            </table>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import { getTop3HotCategoryApi, getTop3HotBorrowApi, getBannerListApi } from '@/api/home'
import { ref } from 'vue'
/**
 * banner
 */
const banners = ref([])
getBannerListApi()
  .then(res => {
    banners.value = res.data
  })
  const index=ref(0)
  setInterval(()=>{
    if(index.value===banners.value.length-1){
      index.value=0
    }else{
      index.value=index.value+1
    }
  
  },7000)
/**
 * 最欢迎小说
 */
const colors = ['red', 'green', 'yellow']
const classes = ref([])
getTop3HotCategoryApi()
  .then(res => {
    classes.value = res.data.map((item, index) => {
      const newItme = {}
      newItme.color = colors[index]
      newItme.name = item.categoryName
      newItme.per = (item.scale * 100).toFixed(2) + '%'
      return newItme
    }).splice(0, 3)

  })
/**
 * 最欢迎分类
 */
const borrowRows = ref([])
getTop3HotBorrowApi()
  .then(res => {
    borrowRows.value = res.data.splice(0, 3)
  })

</script>

<style scoped lang="scss">
@import '@/scss/var.scss';
@import '@/scss/mixin.scss';

main {
  padding: 20px 200px;

  .banner {
    position: relative;

    li {
      background-color: #ccc;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: none;
      &.show{
        display: block;
      }
      img {
        width: 100%;
        height: 100%;
      }

      .bottom-text {
        position: absolute;
        bottom: 0;
        height: 20px;
        left: 0;
        right: 0;
        color: white;
        background-color: rgba($color: #000000, $alpha: .1);
      }
    }

    margin-bottom: 20px;
    height: 300px;
  }

  .statistics {
    display: flex;
    height: 340px;

    .class {
      width: 300px;
      margin-right: 20px;

      li {
        margin-bottom: 10px;

        .name {
          margin-bottom: 10px;
        }

        .per-box {
          display: flex;
          align-items: center;

          .per__wrapper {
            width: 70%;
            margin-right: 20px;
            height: 8px;
            background: #ddd;
            position: relative;

            .per {
              height: 8px;
              display: inline-block;
              position: absolute;
            }
          }

          .per-text {
            display: inline-block;
          }
        }
      }
    }

    .borrow {
      background: #ccc;
      flex: 1;
    }

    .class,
    .borrow {
      padding: 20px;
      background: #ccc;
      font-size: 18px;
      color: #000;

      .title {
        margin-bottom: 20px;
      }
    }
  }
}

.home {}

table {
  margin: 20px auto;
  table-layout: fixed;
  border: 0;

  td {
    border: 0;
  }
}
</style>
