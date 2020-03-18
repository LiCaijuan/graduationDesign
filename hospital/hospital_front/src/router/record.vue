<template>
  <div id="record" :style="'height:'+fullHeight+'px;'">
    <van-nav-bar
      title="预约记录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell>
        <van-card
          class="record_cell"
          v-for="item in list"
          :key="item.number"
        >
          <div slot="bottom" class="van-card__bottom">就诊人： {{item.user}}</div>
          <div slot="title" class="van-card__title">{{item.hospital}}</div>
          <div slot="tags" class="card_tag">
            <van-tag plain type="success" size="large">{{item.type}}</van-tag>
          </div>
          <div slot="desc" class="van-card__desc">{{item.doctor}} | {{item.department}}</div>
          <div slot="footer" class="van-footer">就诊时间： {{item.time}}</div>
        </van-card>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { Icon, NavBar, List, Cell, Card, Tag } from 'vant'
import '@/assets/css/icon/iconfont.css'
export default {
  name: 'record',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      loading: false,
      finished: false,
      icon: {
        username: 'gerenzhongxin-xiugaimima'
      },
      list: [
        {
          number: 1,
          hospital: '浙江省中医院',
          doctor: '王大锤',
          department: '内科',
          user: '李哆啦',
          time: '2020-03-15',
          type: '专家号'
        }, {
          number: 2,
          hospital: '浙江省中医院',
          doctor: '肖恩',
          department: '外科',
          user: '李哆啦',
          time: '2020-03-15 11:00-11:15',
          type: '普通号'
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
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
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
    onClickLeft () {
      this.$router.go(-1)
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
  .van-nav-bar__title{
    max-width: 100%;
    color: #ffffff;
  }
  .van-nav-bar .van-icon{
    color: #ffffff;
  }
  .van-nav-bar__text{
    color: #ffffff;
  }
  .van-nav-bar__arrow{
    font-size: 20px;
  }
  .van-nav-bar{
    background-color: #128784;
  }
  .record_cell{
    padding: 15px;
  }
  .van-card__title{
    font-size: 20px;
    line-height: 25px;
  }
  .van-card__desc{
    float: left;
    font-size: 16px;
    line-height: 25px;
  }
  .van-card__bottom{
    font-size: 16px;
  }
  .van-card__footer{
    font-size: 16px;
  }
  .van-tag--success.van-tag--plain{
    float: right;
  }
</style>
