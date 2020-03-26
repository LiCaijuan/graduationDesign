<template>
  <div id="order" :style="'height:'+fullHeight+'px;'">
    预约
    <div class="swipImg">
      <van-tabbar v-model="active">
        <van-tabbar-item @click="toHome()">
          <van-icon class="iconfont"
                    class-prefix='icon'
                    slot="icon"
                    :name="icon.home_normal">
          </van-icon>
          <span>首页</span>
        </van-tabbar-item>
        <van-tabbar-item>
          <van-icon class="iconfont" class-prefix='icon' slot="icon" slot-scope="props"
                    :name="props.active?icon.order_active:icon.order_normal">
          </van-icon>
          <span>预约</span>
        </van-tabbar-item>
        <van-tabbar-item @click="toPersonalCenter()">
          <van-icon class="iconfont" class-prefix='icon' slot="icon"
                    :name="icon.center_normal">
          </van-icon>
          <span>个人中心</span>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import {Field, Button, Icon, Tabbar, TabbarItem} from 'vant'
import '@/assets/css/icon/iconfont.css'

export default {
  name: 'PersonalCenter',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      active: 0,
      icon: {
        home_normal: 'shouye2',
        order_active: 'yuyue-current',
        order_normal: 'A-yuyuedengjilei',
        center_normal: 'gerenzhongxin2'
      }
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
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
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
    toHome () {
      this.$router.push('./')
      this.active = 0
    },
    toPersonalCenter () {
      this.$router.push('./personalCenter')
      this.active = 0
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

</style>
