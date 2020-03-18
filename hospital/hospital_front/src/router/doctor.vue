<template>
  <div id="doctor" :style="'height:'+fullHeight+'px;'">
    <van-row type="flex" justify="center">
      <van-icon class="back_icon" name="arrow-left" color="#3bb5b2" size="30" @click="back()"/>
      <van-col span="6" class="left_col" @click="preDay()">前一天</van-col>
      <van-col span="6" class="center_col">{{myDate}}</van-col>
      <van-col span="6" class="right_col" @click="nextDay()">后一天</van-col>
    </van-row>
    <van-tabs v-model="activeName" color="#3bb5b2" line-width="65px" swipeable title-active-color="#3bb5b2">
      <van-tab title="主任医师" name="a">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
        >
          <van-cell @click="doctorOrder()">
            <van-card
              v-for="item in list"
              :key="item.number"
              :thumb="item.thumb"
            >
              <div slot="desc" class="van-card__desc">{{item.desc}}</div>
              <div slot="title" class="van-card__title">{{item.name}}</div>
              <div slot="tags" class="card_tag">
                <van-tag plain type="success" size="large">{{item.isOrder}}</van-tag>
              </div>
              <div slot="bottom" class="van-card__bottom">
                test
              </div>
              <div slot="footer" class="van-card__footer">
                挂号费：<span class="price">￥{{item.price}}</span>
              </div>
            </van-card>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="副主任医师" name="b">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
        >
          <van-cell v-for="item in listA" :key="item" :title="item">
            this is {{item}}
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="主治医师" name="c">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
        >
          <van-cell v-for="item in listB" :key="item" :title="item">
            this is {{item}}
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="住院医师" name="d">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
        >
          <van-cell v-for="item in listC" :key="item" :title="item">
            this is {{item}}
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Icon, Search, List, Cell, Tab, Tabs, Card, Tag, Col, Row } from 'vant'
import '@/assets/css/icon/iconfont.css'
export default {
  name: 'doctor',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      // day: 0,
      // nday: 0,
      myDate: '',
      nowDate: '',
      value: '',
      list: [
        {
          number: 1,
          name: '王大锤',
          desc: '主任医师',
          image: '../assets/img/map.png',
          isOrder: '可预约',
          thumb: 'http://img1.imgtn.bdimg.com/it/u=561326960,1564995287&fm=11&gp=0.jpg',
          price: 10
        }, {
          number: 2,
          name: '肖恩',
          desc: '住院医师',
          image: '../assets/img/map.png',
          isOrder: '可预约',
          thumb: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          price: 0
        }
      ],
      listA: [2],
      listB: [3],
      listC: [4],
      loading: false,
      finished: false,
      activeName: 'a'
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
    [Icon.name]: Icon,
    [Search.name]: Search,
    [List.name]: List,
    [Cell.name]: Cell,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Row.name]: Row
  },

  mounted () {
    this.get_bodyHeight()
    this.getDate()
  },

  methods: {
    getDate () {
      this.nowDate = (new Date()).getTime()
      var yesterday = new Date(this.nowDate)
      this.myDate = yesterday.getFullYear() + '-' + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : '0' +
        (yesterday.getMonth() + 1)) + '-' + (yesterday.getDate() > 9 ? (yesterday.getDate()) : '0' + (yesterday.getDate()))
    },
    preDay () {
      // this.day += 1
      this.nowDate = this.nowDate - 24 * 60 * 60 * 1000
      var yesterday = new Date(this.nowDate)
      this.myDate = yesterday.getFullYear() + '-' + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : '0' +
        (yesterday.getMonth() + 1)) + '-' + (yesterday.getDate() > 9 ? (yesterday.getDate()) : '0' + (yesterday.getDate()))
    },
    nextDay () {
      // this.nday += 1
      this.nowDate = this.nowDate + 24 * 60 * 60 * 1000
      var yesterday = new Date(this.nowDate)
      this.myDate = yesterday.getFullYear() + '-' + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : '0' +
        (yesterday.getMonth() + 1)) + '-' + (yesterday.getDate() > 9 ? (yesterday.getDate()) : '0' + (yesterday.getDate()))
    },
    doctorOrder () {
      this.$router.push('./doctorOrder')
    },
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
    back () {
      this.$router.push('./')
    }
    // onLoad () {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .card_tag{
    margin: 10px;
    float: right;
  }
  .van-card__title{
    font-size: 20px;
    line-height: 50px;
    float: left;
  }
  .van-card__desc{
    font-size: 16px;
    line-height: 40px;
    float: left;
    margin: 7px 0 0 15px;
    color: #3bb5b2;
  }
  .van-card__footer{
    font-size: 17px;
    margin: -25px 5px 5px 0;
  }
  .price{
    color: rgb(111, 123, 134);
  }
  .center_col{
    background-color: #3bb5b2;
    color: #FFFFFF;
  }
  .left_col{
    border-radius: 3px 0 0 3px;
    color: #3bb5b2;
  }
  .right_col{
    border-radius: 0 3px 3px 0;
    color: #3bb5b2;
  }
  .van-col--6{
    margin: 5px 0;
    height: 30px;
    line-height: 30px;
    border: 1px solid #3bb5b2;
    text-align: center;
  }
  .back_icon{
    margin-top: 6px;
    left: -37px;
  }
  .van-card__thumb img{
    border-radius: 0 !important;
  }
  .van-card__thumb{
    margin: 10px;
  }
</style>
