<template>
  <div id="departmentOrder" :style="'height:'+fullHeight+'px;'">
    <van-nav-bar
      style="color: #fff"
      title="科室详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft()"
    />
    <div class="doctor_content">
      <van-image
        class="doct_img"
        width="100"
        height="100"
        fit="cover"
        :src="departmentImg"
      />
      <div class="doct_info">
        <van-panel
          :title="departmentName"
          :desc="isOrder"
          :status="departmentAddress"
        >
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
              :key="item.departmentId"
              :text="item.interval"
              @click="showDialog(item)"
            />
            <van-empty v-if="intervalList.length<1" description="当前日期无可预约时段" />
          </van-grid>
        </div>
      </div>
      <div class="doctor">
        <van-icon class="doct_icon" name="manager-o" color="#3bb5b2" size="30"/>
        <div class="doct_text">科室简介</div>
        <div class="doct_speciality">擅长：{{departmentSpeciality}}</div>
        <div class="doct_synopsis">简介：{{departmentDesc}}</div>
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
import { Icon, Image, NavBar, Panel, Grid, GridItem, Dialog, ActionSheet, Form, Field, Button, Toast, Empty } from 'vant'
import '@/assets/css/icon/iconfont.css'

export default {
  name: 'departmentOrder',
  departmentId: 0,
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      userName: '',
      userPhone: '',
      userCard: '',
      date: '',
      isDialog: false,
      showActionsheet: false,
      doctorImgUrl: 'http://img2.imgtn.bdimg.com/it/u=23084897,262291329&fm=11&gp=0.jpg',
      departmentAddress: '',
      departmentDesc: '',
      departmentId: 0,
      departmentImg: '',
      departmentName: '',
      departmentSpeciality: '',
      intervalList: [],
      doctorType: 0,
      doctorName: '',
      orderInterval: '',
      scheduleId: 0,
      isOrder: ''
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
    [ActionSheet.name]: ActionSheet,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Empty.name]: Empty,
    [Dialog.Component.name]: Dialog.Component
  },

  mounted () {
    this.get_bodyHeight();
    this.getDepartmentById();
    this.getInterval()
  },

  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onSubmit (values) {
      console.log(values, 'sub')
      // 调用接口，如果预约成功使得showActionsheet=false
      this.showActionsheet = false
      this.axios.post('/api/addOrder', {
        doctorType: this.doctorType,
        doctorName: this.doctorName,
        departmentName: this.departmentName,
        orderDate: this.date,
        interval: this.orderInterval,
        userName: values.userName,
        userPhone: values.userPhone,
        userCard: values.userCard,
        address: this.departmentAddress
      }).then((res) => {
        Toast.success(res.data.msg)
        // 预约成功删掉改时段
        if (res.data.code === 1) {
          this.axios.post('/api/deleteSchedule', {
            scheduleId: this.scheduleId
          }).then((res) => {
            console.log(res)
            if (res.data.code === 1) {
              this.getInterval()
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      }).catch((err) => {
        console.log(err)
      })
      console.log('submit')
    },
    showDialog (item) {
      this.orderInterval = item.interval
      this.scheduleId = item.scheduleId
      console.log(item, 'item')
      this.axios.post('/api/getDoctorById', {
        doctorId: item.doctorId
      }).then((res) => {
        console.log(res)
        this.doctorName = res.data.result[0].doctorName
        this.doctorType = res.data.result[0].doctorType
      }).catch((err) => {
        console.log(err)
      })
      this.$dialog.confirm({
        // title: "hello",
        message: '确认预约当前时段吗？',
        confirmButtonText: '预约',
        cancelButtonText: '取消'
      }).then(() => {
        this.showActionsheet = true
        // console.log("点击了确认按钮噢")
      }).catch(() => {
        // console.log("点击了取消按钮噢")
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
    },
    getDepartmentById () {
      let departmentId = this.$store.state.departmentId
      this.axios.post('/api/getDepartmentById', {
        departmentId: departmentId
      }).then((res) => {
        let department = res.data.result[0]
        this.departmentAddress = department.departmentAddress
        this.departmentDesc = department.departmentDesc
        this.departmentId = department.departmentId
        this.departmentImg = department.departmentImg
        this.departmentName = department.departmentName
        this.departmentSpeciality = department.departmentSpeciality
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    getInterval () {
      this.axios.post('/api/getScheduleByDepartmentCondition', {
        departmentId: this.$store.state.departmentId,
        scheduleDate: this.$store.state.departmentDate
      }).then((res) => {
        // let department = res.data.result[0]
        this.intervalList = res.data.result
        if (this.intervalList.length > 0) {
          this.isOrder = '可预约'
        } else {
          this.isOrder = '不可预约'
        }
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
    color: #ffffff!important;
  }
  .van-nav-bar .van-icon {
    color: #ffffff;
  }
  .van-nav-bar__text{
    color: #FFF;
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
    width: 70%;
    margin: 0 0 5% 0%;
    font-size: 16px;
  }
  .van-cell__label{
    font-size: 16px;
    margin-top: 2px;
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
  .van-panel__title{
    font-size: 20px;
  }
  .van-empty{
    width: 325px;
  }
</style>
