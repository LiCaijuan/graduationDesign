<template>
  <div id="login" :style="'height:'+fullHeight+'px;'">
    <img class="logo" src="../assets/img/logo.png" />
    <div class="logtext">
      <van-field class="user" left-icon="contact" v-model="username" label="用户" />
      <van-field class="pwd" left-icon="browsing-history-o" v-model="password" label="密码" type="password" />
    </div>
    <div class="mainbtn">
      <van-button class="logbtn" type="default" @click="login()">登录</van-button><br>
      <van-button class="regbtn" type="info" @click="toRegister()">注册</van-button>
    </div>
  </div>
</template>

<script>
import { Field, Button, Icon } from 'vant'
import '@/assets/css/icon.css'
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      password: '',
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
    [Field.name]: Field,
    [Button.name]: Button
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

    toRegister () {
      this.$router.push('/register')
    },

    login () {
      this.$router.push('/home')
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
  #login{
    background-color: #3bb5b2;
    width: 100%;
    height: 667px;
  }
  .logtext{
    width: 60%;
    height: 60px;
    border-radius: 10px;
    background-color: rgba(255,255,255,0.2);
    margin: 0 auto;
    padding: 5% 5%;
    margin-top: 15%;
    margin-bottom: 15%;
  }
  /* .user .pwd{
    margin: 10%;
  } */
  .logbtn{
    width: 70%;
    color: #3bb5b2;
    border-radius: 20px;
    margin: 5% 15%;
    font-size: 18px;
  }
  .regbtn{
    width: 70%;
    color: #FFFFFF;
    border: 1px solid #FFFFFF;
    border-radius: 20px;
    margin: 0 15% 5% 15%;
    font-size: 18px;
    background-color: #3bb5b2;
  }
  .logo{
    width: 100%;
  }
  .van-cell{
    font-size: 16px;
    line-height: 32px;
    background-color: rgba(0,0,0,0);
  }
</style>
