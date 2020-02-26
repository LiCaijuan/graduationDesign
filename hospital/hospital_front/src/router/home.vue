<template>
  <div id="home" :style="'height:'+fullHeight+'px;'">
    <div class="mainUp">
      <div class="searchDiv">
        <van-search shape="round" background="#3BB5B2" v-model="searchText" placeholder="搜索科室/医生" />
      </div>
      <div class="mainList">
        <div class="order" @click="test()">
          <img class="orderImg" src="../assets/img/order.png" alt="预约">
          <p>预约</p>
        </div>
        <div class="order">
          <img class="orderImg" src="../assets/img/consult.png" alt="咨询">
          <p>咨询</p>
        </div>
        <div class="order">
          <img class="orderImg" src="../assets/img/report.png" alt="报告">
          <p>报告</p>
        </div>
      </div>
      <div>

      </div>
    </div>
    <div>
      <van-tabbar v-model="tabNum" active-color="#07c160" inactive-color="#000">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="add-o">预约</van-tabbar-item>
        <van-tabbar-item icon="friends-o">个人中心</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { Field, Button, Icon, Search, Swipe, SwipeItem, Lazyload, Tabbar, TabbarItem, Grid, GridItem } from 'vant'
import '@/assets/css/icon.css'
export default {
  name: 'Home',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      searchText: '',
      swipeImages: [
        require('@/assets/img/banner1.png'),
        require('@/assets/img/banner2.png'),
        require('@/assets/img/banner3.png')
      ],
      tabNum: 0
    }
  },
  watch: {
    // 监控浏览器高度变化
    fullHeight (val) {
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    }
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Lazyload.name]: Lazyload,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },

  mounted () {
    this.get_bodyHeight()
  },

  methods: {
    // 动态获取浏览器高度
    get_bodyHeight () {
      const that = this
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          that.fullHeight = window.fullHeight
        })()
      }
    },

    test () {
      window.location.href = 'https://map.baidu.com/@10942437,4806177.73,12z'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin: 0;
  padding: 0;
}
  .searchDiv{
    width: 80%;
    margin: 0 auto;
    padding: 10px;
  }
  .mainUp{
    background-color: #3BB5B2;
  }
  .mainList{
    padding-bottom: 10px;
    width: 100%;
  }
  .order{
    height: 70px;
    width: 70px;
    border-radius: 40px;
    border: 1px solid #128784;
    background-color: #FFFFFF;
    display: inline-block;
    margin: 6%;
  }
  .orderImg{
    margin: 11px;
  }
  p{
    color: #ffffff;
    text-align: center;
  }
</style>
