<template>
  <div id="department" :style="'height:'+fullHeight+'px;'">
    <div class="searchDiv">
      <van-icon class="back_name" name="arrow-left" color="#ffffff" @click="back()"/>
      <van-search class="search_name" v-model="value" background="#3bb5b2" shape="round" placeholder="搜索科室"/>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell>
        <van-card
          v-for="item in list"
          :key="item.number"
          :thumb="item.thumb"
          @click="departmentOrder()"
        >
          <div slot="desc" class="van-card__desc">{{item.address}}</div>
          <div slot="title" class="van-card__title">{{item.name}}</div>
          <div slot="tags" class="card_tag">
            <van-tag plain type="success" size="large">{{item.isOrder}}</van-tag>
          </div>
          <div slot="bottom" class="van-card__bottom">{{item.desc}}</div>
        </van-card>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import {Search, Icon, List, Cell, Card, Tag} from 'vant'
import '@/assets/css/icon/iconfont.css'

export default {
  name: 'department',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      value: '',
      loading: false,
      finished: false,
      list: [
        {
          number: 1,
          name: '内科',
          address: 'aa楼四楼',
          image: '../assets/img/map.png',
          isOrder: '可预约',
          thumb: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          desc: '中医内科始建于1956年，是我院集医疗、教学、科研为一体的综合性临床科室，年门诊量达十余万人次，是我院门诊量最大的科室。'
        }, {
          number: 2,
          name: '外科',
          address: 'bb楼11楼',
          image: '../assets/img/map.png',
          isOrder: '可预约',
          thumb: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          desc: '中医内科始建于1956年，是我院集医疗、教学、科研为一体的综合性'
        }
      ]
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
    [Search.name]: Search,
    [Icon.name]: Icon,
    [List.name]: List,
    [Cell.name]: Cell,
    [Card.name]: Card,
    [Tag.name]: Tag
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
    back () {
      this.$router.push('./')
    },
    departmentOrder () {
      this.$router.push('./departmentOrder')
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .searchDiv {
    height: 40px;
    background-color: #3bb5b2;
  }

  .back_name {
    float: left;
    font-size: 30px;
    margin-top: 5px;
  }

  .search_name {
    float: left;
    width: 80%;
    margin: 3px 15px;
  }

  .card_tag {
    margin: 10px;
    float: right;
  }

  .van-card__title {
    font-size: 20px;
    line-height: 50px;
    float: left;
  }

  .van-card__desc {
    font-size: 16px;
    line-height: 40px;
    float: left;
    margin: 7px 0 0 15px;
    color: #3bb5b2;
  }

  .van-card__footer {
    font-size: 17px;
    margin: 5px;
  }

  .van-card__bottom {
    font-size: 15px;
  }
</style>
