<template>
  <div id="register" :style="'height:'+fullHeight+'px;'">
    <img class="logo" src="../assets/img/logo1.png"/>
    <div class="logtext">
      <van-field class="user" placeholder="用户" left-icon="manager" v-model="paramsData.username"/>
      <van-field class="pwd" placeholder="密码" left-icon="lock" v-model="paramsData.password" type="password"/>
      <van-field class="phone" placeholder="号码" left-icon="phone" v-model="paramsData.phone" type="tel"/>
    </div>
    <div class="mainbtn">
      <van-button class="logbtn" type="default" @click="toRegister()">注册</van-button>
      <br>
      <van-button class="regbtn" type="info" @click="toLogin()">登录</van-button>
    </div>
  </div>
</template>

<script>
import {Field, Button, Icon} from 'vant'
import '@/assets/css/icon/iconfont.css'
// import { register } from '@/api'

export default {
  name: 'Register',
  data () {
    return {
      paramsData: {
        username: '',
        password: '',
        phone: ''
      },

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
    [Icon.name]: Icon,
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

    toLogin () {
      this.$router.push('/login')
    },

    toRegister () {
      this.axios.post('/api/register', {
        username: this.paramsData.username,
        password: this.paramsData.password,
        phone: this.paramsData.phone
      }).then((res) => {
        console.log(res)
        this.$router.push('/login')
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
  #register {
    background-color: #3bb5b2;
    width: 100%;
    height: 667px;
  }
  .logtext {
    width: 60%;
    height: 90px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    margin: 0 auto;
    padding: 5% 5%;
    margin-top: 15%;
    margin-bottom: 9%;
  }
  .logbtn {
    width: 70%;
    color: #3bb5b2;
    border-radius: 20px;
    margin: 5% 15%;
    font-size: 18px;
  }
  .regbtn {
    width: 70%;
    background-color: #3bb5b2;
    color: #FFFFFF;
    border: 1px solid #FFFFFF;
    border-radius: 20px;
    margin: 0 15% 5% 15%;
    font-size: 18px;
  }
  .logo {
    width: 100%;
  }
  .van-cell {
    font-size: 18px;
    line-height: 32px;
    background-color: rgba(0, 0, 0, 0);
    color: #FFFFFF;
  }
</style>
