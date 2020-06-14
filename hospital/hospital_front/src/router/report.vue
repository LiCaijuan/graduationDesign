<template>
  <div id="report" :style="'height:'+fullHeight+'px;'">
    <van-nav-bar
      title="报告"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-list>
      <van-swipe-cell>
        <van-card
          class="record_cell"
          v-for="item in reportList"
          :key="item.number"
        >
          <div slot="bottom" class="van-card__bottom">就诊人： {{item.username}}</div>
          <div slot="title" class="van-card__title">浙江省中医院下沙院区</div>
<!--          <div slot="tags" class="card_tag">-->
<!--            <van-tag plain type="success" size="large">{{item.type}}</van-tag>-->
<!--          </div>-->
          <div slot="desc" class="van-card__desc">{{item.department}}</div>
            <div slot="footer" class="van-footer">报告日期： {{item.date}} | {{item.interval}}</div>
          </van-card>
        <van-button
          slot="right"
          square
          text="删除"
          type="danger"
          class="delete-button"
        />
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import {Field, NavBar, Icon, List, Cell, Card, Tag, SwipeCell, Button} from 'vant'
import '@/assets/css/icon/iconfont.css'

export default {
  name: 'Login',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      icon: {
        username: 'gerenzhongxin-xiugaimima'
      },
      reportList: []
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
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [List.name]: List,
    [Cell.name]: Cell,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button
  },
  mounted () {
    this.get_bodyHeight()
    this.getReportList()
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
    onClickLeft () {
      this.$router.go(-1)
    },
    getReportList () {
      this.axios.post('/api/getReportList').then((res) => {
        this.reportList = res.data.result
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
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
  .van-nav-bar__title {
    max-width: 100%;
    color: #ffffff;
  }
  .van-nav-bar .van-icon {
    color: #ffffff;
  }
  .van-nav-bar__text {
    color: #ffffff;
  }
  .van-nav-bar__arrow {
    font-size: 20px;
  }
  .van-nav-bar {
    background-color: #128784;
  }
  .van-nav-bar__title {
    max-width: 100%;
    color: #ffffff;
  }
  .van-nav-bar .van-icon {
    color: #ffffff;
  }
  .van-nav-bar__text {
    color: #ffffff;
  }
  .van-nav-bar__arrow {
    font-size: 20px;
  }
  .van-nav-bar {
    background-color: #128784;
  }
  .record_cell {
    padding: 15px;
  }
  .van-card__title {
    font-size: 20px;
    line-height: 25px;
  }
  .van-card__desc {
    float: left;
    font-size: 16px;
    line-height: 25px;
  }
  .van-card__bottom {
    font-size: 16px;
  }
  .van-card__footer {
    font-size: 16px;
    text-align: left;
  }

  .van-tag--success.van-tag--plain {
    float: right;
  }
</style>
