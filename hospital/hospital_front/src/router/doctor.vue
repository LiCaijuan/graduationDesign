<template>
  <div id="doctor" :style="'height:'+fullHeight+'px;'">
    医生
  </div>
</template>

<script>
import { Icon } from 'vant'
import '@/assets/css/icon/iconfont.css'
export default {
  name: 'doctor',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight
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
    [Icon.name]: Icon
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
</style>
