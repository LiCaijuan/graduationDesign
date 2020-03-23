<template>
  <div id="report" :style="'height:'+fullHeight+'px;'">
    <van-nav-bar
      title="报告"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
  import {Field, NavBar, Icon} from 'vant'
  import '@/assets/css/icon/iconfont.css'

  export default {
    name: 'Login',
    data() {
      return {
        fullHeight: document.documentElement.clientHeight,
        icon: {
          username: 'gerenzhongxin-xiugaimima'
        }
      }
    },
    watch: {
      // 监控浏览器高度变化
      fullHeight(val) {
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
      [Icon.name]: Icon
    },

    mounted() {
      this.get_bodyHeight()
    },

    methods: {
      // 动态获取浏览器高度
      get_bodyHeight() {
        const that = this
        window.onresize = () => {
          return (() => {
            window.fullHeight = document.documentElement.clientHeight
            that.fullHeight = window.fullHeight
          })()
        }
      },
      onClickLeft() {
        this.$router.go(-1)
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
</style>
