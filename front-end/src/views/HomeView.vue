
<template>
  <div class="home">
    <Header />
    <main>
      <div class="banner"></div>
      <div class="statistics">
        <div class="class">
          <div class="title">
            最受欢迎分类Top3
          </div>
          <ul>
            <li v-for="item in classes" :key="item.key">
              <div class="name">{{item.name}}</div>
              <div class="per-box">
                <div class="per__wrapper">
                  <span class="per" :style="{width:item.per,background:item.color}"></span>
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
        <td>A1</td>
        <td>A2</td>
        <td>A3</td>
        <td>A4</td>
      </tr>
      <tr>
        <td>B1</td>
        <td>B2</td>
        <td>B3</td>
        <td rowspan="2">B4</td>
      </tr>
      <tr>
        <td>C1</td>
        <td>C2</td>
        <td>C3</td>
      </tr>
      <tr>
        <td>D1</td>
        <td>D2</td>
        <td colspan="2">D3</td>
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
const classes=[
  {
    name:'小说',
    per:'50%',
    color:'red'
  },
  {
    name:'小说',
    per:'20%',
    color:'green'
    
  },
  {
    name:'小说',
    per:'30%',
    color:'yellow'
  }
]
</script>
<style scoped lang="scss">
@import '@/scss/var.scss';
@import '@/scss/mixin.scss';
main{
  padding: 20px 200px;
  .statistics{
    display: flex;
    height: 400px;
    .class{
      width:300px;
      margin-right: 20px;
      li{
        margin-bottom: 10px;
        .name{
          margin-bottom: 10px;
        }
        .per-box{
          display: flex;
          align-items: center;
          .per__wrapper{
            width: 70%;
            margin-right: 20px;
            height: 8px;
            background: #ddd;
            position: relative;
            .per{
              height: 8px;
              display: inline-block;
              position: absolute;
            }
          }
          .per-text{
            display: inline-block;
          }
        }
      }
    }
    .borrow{
      background: #ccc;
      flex: 1;
    }
    .class,.borrow{
      padding: 20px;
      background: #ccc;
      font-size: 18px;
      color: #000;
      .title{
        margin-bottom: 20px;
      }
    }
  }
}
.home {


}</style>
