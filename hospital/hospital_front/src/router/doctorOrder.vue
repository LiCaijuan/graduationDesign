<template>
  <div id="doctorOrder" :style="'height:'+fullHeight+'px;'">
    <van-nav-bar
      title="医生详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft()"
    />
    <div class="doctor_content">
      <van-image
        class="doct_img"
        width="100"
        height="100"
        round
        fit="cover"
        :src="doctorImgUrl"
      />
      <div class="doct_info">
        <van-panel
          :title="list.name"
          :desc="list.department"
          :status="list.title"
        >
          <div>{{list.hospital}}</div>
        </van-panel>
      </div>
      <div class="time">
        <van-icon class="time_icon" color="#3bb5b2" size="30" name="notes-o" />
        <div class="time_text">选择预约时间</div>
        <div class="time_choose">
          <div class="time_date">{{list.date}}</div>
          <van-grid>
            <van-grid-item
              class="time_grid"
              v-for="item in list.interval"
              :key="item"
              :text="item"
              @click="showDialog()"
            />
          </van-grid>
        </div>
      </div>
      <div class="doctor">
        <van-icon class="doct_icon" name="manager-o" color="#3bb5b2" size="30" />
        <div class="doct_text">医生简介</div>
        <div class="doct_speciality">擅长：</div>
        <div class="doct_synopsis">简介：</div>
      </div>
      <van-dialog v-model="isDialog" show-cancel-button class="exit_dialog">
        <div class="exit_text">确定预约当前时段吗？</div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import { Icon, Image, NavBar, Panel, Grid, GridItem, Dialog } from 'vant'
import '@/assets/css/icon/iconfont.css'
export default {
  name: 'doctorOrder',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      isDialog: false,
      doctorImgUrl: 'http://img2.imgtn.bdimg.com/it/u=23084897,262291329&fm=11&gp=0.jpg',
      list: {
        number: 1,
        name: '王大锤',
        title: '主任医师',
        department: '内科',
        hospital: '浙江省中医院下沙院区',
        date: '2020-03-15',
        interval: [
          '10:00-10:15',
          '10:20-10:35',
          '10:40-10:55',
          '11:00-11:15',
          '11:20-11:35',
          '11:40-11:55',
          '15:00-15:15',
          '15:20-15:35',
          '15:40-15:55',
          '16:00-16:15',
          '16:20-16:35',
          '16:40-16:55'
        ]
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
    [Icon.name]: Icon,
    [Image.name]: Image,
    [NavBar.name]: NavBar,
    [Panel.name]: Panel,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Dialog.Component.name]: Dialog.Component
  },

  mounted () {
    this.get_bodyHeight()
    this.getDate()
  },

  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    showDialog () {
      this.isDialog = true
    },
    getDate () {
      this.nowDate = (new Date()).getTime()
      var yesterday = new Date(this.nowDate)
      this.myDate = yesterday.getFullYear() + '-' + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : '0' +
        (yesterday.getMonth() + 1)) + '-' + (yesterday.getDate() > 9 ? (yesterday.getDate()) : '0' + (yesterday.getDate()))
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
  .doctor_content{
    margin: 2%;
    /* margin-left: 20px; */
  }
  .doct_img{
    float: left;
  }
  .doct_info{
    float: left;
    width: 60%;
    margin: 6% 5%;
  }
  .van-panel__header-value{
    color: #128784;
  }
  .time{
    float: left;
    margin-top: 5%;
  }
  .time_icon{
    float: left;
    margin-left: 15px;
  }
  .time_text{
    font-size: 20px;
    line-height: 30px;
    float: left;
    margin-left: 10px;
  }
  .doct_text{
    font-size: 20px;
    line-height: 30px;
    margin: 0 0 15px 10px;
    float: left;
    width: 300px;
  }
  .time_choose{
    float: left;
    margin: 20px 15px;
    width: 325px;
    height: 240px;
    border-radius: 2px;
    border: 1px solid #8b95a3;
  }
  .time_date{
    width: 135px;
    margin: 10px 100px;
    font-size: 20px;
  }
  .time_grid{
    flex-basis: 33%!important;
  }
  .exit_dialog{
    width: 75%;
  }
  .exit_text{
    margin: 15% 20%;
  }
  .doct_icon{
    margin-left: 15px;
    float: left;
  }
  .doct_synopsis{
    margin-left: 15px;
    font-size: 18px;
    line-height: 35px;
  }
  .doct_speciality{
    margin-left: 15px;
    font-size: 18px;
    line-height: 35px;
    color: rgb(83, 165, 241);
  }
  .van-grid-item__content{
    background-color: #128784!important;
  }
  .van-grid-item__text{
    color: #ffffff;
  }
</style>
