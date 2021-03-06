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
        :src="doctorImg"
      />
      <div class="doct_info">
        <van-panel
          :title="doctorName"
          :desc="doctorDepartment"
        >
          <van-tag class="doct_type" size="large" type="success">{{doctorType}}</van-tag>
          <div>浙江省中医院下沙院区</div>
        </van-panel>
      </div>
      <div class="time">
        <van-icon class="time_icon" color="#3bb5b2" size="30" name="notes-o"/>
        <div class="time_text">选择预约时间</div>
        <div class="time_choose">
          <div class="time_date">{{date}}</div>
          <van-grid>
            <van-grid-item
              class="time_grid"
              v-for="item in intervalList"
              :key="item"
              :text="item"
              @click="showDialog(item)"
            />
          </van-grid>
        </div>
      </div>
      <div class="doctor">
        <van-icon class="doct_icon" name="manager-o" color="#3bb5b2" size="30"/>
        <div class="doct_text">医生简介</div>
        <div class="doct_speciality">擅长：{{doctorSpeciality}}</div>
        <div class="doct_synopsis">简介：{{doctorSynopsis}}</div>
      </div>
      <van-action-sheet v-model="showActionsheet" title="请输入预约者信息">
        <div class="content">
          <van-form @submit="onSubmit">
            <van-field
              style="marginLeft: 70px"
              v-model="userCard"
              name="userCard"
              label="身份证号"
              placeholder="身份证号"
              :rules="[{ required: true, message: '请填写身份证号' }]"
            />
            <van-button class="user_btn" round block type="info" native-type="submit">提交</van-button>
          </van-form>
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
import { Icon, Image, NavBar, Panel, Grid, GridItem, Dialog, ActionSheet, Form, Field, Button, Tag, Toast } from 'vant'
import '@/assets/css/icon/iconfont.css'

export default {
  name: 'doctorOrder',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      userName: '',
      userPhone: '',
      userCard: '',
      doctorId: 0,
      date: '',
      isDialog: false,
      showActionsheet: false,
      intervalList: [],
      doctorImg: '',
      doctorName: '',
      doctorDepartment: '',
      doctorType: '',
      doctorSpeciality: '',
      doctorSynopsis: '',
      orderInterval: '',
      address: '',
      orderDoctorType: 0
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
    [Toast.name]: Toast,
    [Image.name]: Image,
    [NavBar.name]: NavBar,
    [Panel.name]: Panel,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [ActionSheet.name]: ActionSheet,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component,
    [Tag.name]: Tag
  },
  mounted () {
    this.getInterval()
    this.get_bodyHeight()
    this.getDoctorById()
  },

  methods: {
    getDepartmentByName () {
      this.axios.post('/api/getDepartmentByName', {
        departmentName: this.doctorDepartment
      }).then((res) => {
        this.address = res.data.result[0].departmentAddress
      }).catch((err) => {
        console.log(err)
      })
    },
    getInterval () {
      this.date = this.$store.state.doctorDate
      this.doctorId = this.$store.state.doctorId
      this.axios.post('/api/getScheduleByDoctorCondition', {
        doctorId: this.doctorId,
        scheduleDate: this.date
      }).then((res) => {
        this.intervalList = res.data.result.map(item => {
          return item.interval
        })
        console.log(res, 'interval')
      }).catch((err) => {
        console.log(err)
      })
    },
    getDoctorById () {
      console.log(localStorage, 'local')
      this.axios.post('/api/getDoctorById', {
        doctorId: this.doctorId
      }).then((res) => {
        let doctor = res.data.result[0]
        this.doctorName = doctor.doctorName
        this.doctorDepartment = doctor.doctorDepartment
        this.orderDoctorType = doctor.doctorType // 用于预约
        // 用于显示
        switch (doctor.doctorType) {
          case 1:
            this.doctorType = '主任医师'
            break
          case 2:
            this.doctorType = '副主任医师'
            break
          case 3:
            this.doctorType = '主治医师'
            break
          default:
            this.doctorType = '住院医师'
            break
        }
        this.doctorImg = doctor.doctorImg
        this.doctorSpeciality = doctor.doctorSpeciality
        this.doctorSynopsis = doctor.doctorSynopsis
      }).catch((err) => {
        console.log(err)
      })
    },
    onClickLeft () {
      this.$store.commit('changeBackDate', {
        backDate: this.date
      })
      this.$router.go(-1)
    },
    onSubmit (values) {
      this.getDepartmentByName()
      // 调用接口，如果预约成功使得showActionsheet=false
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.showActionsheet = false
      this.axios.post('/api/addOrder', {
        doctorType: this.orderDoctorType,
        doctorName: this.doctorName,
        departmentName: this.doctorDepartment,
        orderDate: this.date,
        interval: this.orderInterval,
        userName: userInfo.username,
        userId: userInfo.userId,
        userPhone: userInfo.phone,
        userCard: values.userCard,
        address: this.address
      }).then((res) => {
        Toast.success(res.data.msg)
        if (res.data.code === 1) {
          this.axios.post('/api/getScheduleByCondition', {
            doctorId: this.doctorId,
            departmentId: this.doctorDepartment,
            scheduleDate: this.date,
            interval: this.orderInterval
          }).then((res) => {
            console.log(res)
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log('test')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    showDialog (item) {
      this.orderInterval = item
      // this.isDialog = true
      this.$dialog.confirm({
        // title: "hello",
        message: '确认预约当前时段吗？',
        confirmButtonText: '预约',
        cancelButtonText: '取消'
      }).then(() => {
        this.showActionsheet = true
      }).catch(() => {
      })
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

<style scoped>
  * {
    margin: 0;
    padding: 0;
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
  .doctor_content {
    margin: 2%;
    /* margin-left: 20px; */
  }
  .doct_img {
    float: left;
  }
  .doct_info {
    float: left;
    width: 60%;
    margin: 6% 5%;
  }
  .van-panel__header-value {
    color: #128784;
  }
  .time {
    float: left;
    margin-top: 5%;
  }
  .time_icon {
    float: left;
    margin-left: 15px;
  }
  .time_text {
    font-size: 20px;
    line-height: 30px;
    float: left;
    margin-left: 10px;
  }
  .doct_text {
    font-size: 20px;
    line-height: 30px;
    margin: 0 0 15px 10px;
    float: left;
    width: 300px;
  }
  .time_choose {
    float: left;
    margin: 20px 15px;
    width: 325px;
    border-radius: 2px;
    border: 1px solid #8b95a3;
  }
  .time_date {
    width: 135px;
    margin: 10px 100px;
    font-size: 20px;
  }
  .time_grid {
    flex-basis: 33% !important;
  }
  .exit_dialog {
    width: 75%;
  }
  .exit_text {
    margin: 15% 20%;
  }
  .doct_icon {
    margin-left: 15px;
    float: left;
  }
  .doct_synopsis {
    margin-left: 15px;
    font-size: 18px;
    line-height: 35px;
  }
  .doct_speciality {
    margin-left: 15px;
    font-size: 18px;
    line-height: 35px;
    color: rgb(83, 165, 241);
  }
  .van-grid-item__content {
    background-color: #128784 !important;
  }
  .van-grid-item__text {
    color: #ffffff;
  }
  .van-dialog__message{
    font-size: 17px !important;
    padding: 40px 24px !important;
  }
  .van-cell{
    width: 100%;
    margin: 5% 15%;
    font-size: 16px;
  }
  .user_btn{
    width: 70%;
    margin: 2% 15%;
    font-size: 17px;
    background-color: #128784;
    border: 1px solid #FFF;
  }
  .content{
    padding: 10px 0px;
  }
  .van-action-sheet__header{
    font-size: 18px;
  }
  .van-action-sheet__close{
    right: 10px;
  }
  .doct_type{
    position: relative;
    float: right;
    margin-top: -35px;
    margin-right: -20px;
    padding: 3px 4px;
    z-index: 10;
  }
  .van-cell[data-v-7ef4cec2]{
    margin: 2% 0%;
  }
</style>
