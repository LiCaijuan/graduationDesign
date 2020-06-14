<template>
  <div id="home" :style="'height:'+fullHeight-30+'px;'">
    <div class="home_content" v-show="active===0">
      <div class="swipePart">
        <van-swipe :autoplay="3000" class="swipe_img">
          <van-swipe-item v-for="(image, index) in swipeImages" :key="index">
            <img v-lazy="image"/>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div id="allmap" class="navi" @click="toMap()">
        <div><span class="naviTip">&nbsp;&nbsp;一键导航<br></span><span class="navitip">&nbsp;&nbsp;Go here</span></div>
        <img class="map" src="../assets/img/map1.png" alt="导航">
        <div class="loca">
          <div class="locaText">
            医院：浙江省中医院<br>
            地址：浙江省杭州市<br>
            详址：经济技术开发区9号大街9号
          </div>
        </div>
      </div>
      <br><br><br>
      <div class="mainList">
        <div class="order" @click="doctor()">
          <div class="icon_div">
            <van-icon
              id="iconfont_home"
              class="iconfont"
              class-prefix='icon'
              slot="icon"
              :name="icon.doctor"
            />
          </div>
          <!-- <img class="orderImg" src="../assets/img/doctor.png" alt="医生"> -->
          <p>找医生</p>
        </div>
        <div class="order" @click="department()">
          <div class="icon_div">
            <van-icon
              id="iconfont_home"
              class="iconfont"
              class-prefix='icon'
              slot="icon"
              :name="icon.department"
            />
          </div>
          <p>找科室</p>
        </div>
        <div class="order" @click="report()">
          <div class="icon_div">
            <van-icon
              id="iconfont_home"
              class="iconfont"
              class-prefix='icon'
              slot="icon"
              :name="icon.reportList"
            />
          </div>
          <!-- <img class="orderImg" src="../assets/img/navigation.png" alt="预约"> -->
          <p>查报告</p>
        </div>
      </div>
    </div>
    <div class="order_content" v-show="active===1">
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
          <van-card
            @click="showDeleteDialog()"
            class="record_cell"
            v-for="item in orderList"
            :key="item.orderId"
          >
            <div slot="bottom" class="van-card__bottom">就诊人： {{item.userName}}</div>
            <div slot="title" class="van-card__title">浙江省中医院</div>
            <div slot="tags" class="card_tag">
              <van-tag plain type="success" size="large">{{item.doctorType===1?'主任医师':item.doctorType===2?'副主任医师':item.doctorType===3?'主治医师':'住院医师'}}</van-tag>
            </div>
            <div slot="desc" class="van-card__desc">{{item.doctorName}} | {{item.departmentName}}</div>
            <div slot="footer" class="van-footer">就诊时间： {{item.orderDate}} | {{item.interval}}</div>
          </van-card>
      </van-list>
    </div>
    <div class="personalcenter_content" v-show="active===2">
      <van-nav-bar title="个人中心" left-text="返回" right-text="注销" left-arrow @click-right="deleteUser()" @click-left="onClickLeft()">
<!--        <van-icon name="setting-o" slot="right"/>-->
      </van-nav-bar>
      <div class="portrait">
        <div class="portrait_content">
          <van-uploader>
            <img class="por_img" src="../assets/img/timg.jpg" alt="" />
          </van-uploader>
          <div class="name_tip">
            <div class="name">{{userInfo.username}}</div>
            <div class="phone">{{userInfo.phone}}</div>
          </div>
        </div>
        <div class="center_content">
          <van-cell-group class="cell_content">
            <van-cell title="预约记录" icon="add-square" size="large" is-link @click="record()">
              <van-icon
                id="iconfont_per"
                class="iconfont"
                class-prefix='icon'
                slot="icon"
                :name="icon.record"
              />
            </van-cell>
            <van-cell title="报告记录" icon="column" size="large" is-link @click="report()">
              <van-icon
                id="iconfont_per"
                class="iconfont"
                class-prefix='icon'
                slot="icon"
                :name="icon.report"
              />
            </van-cell>
            <van-cell title="修改密码" icon="checked" size="large" is-link @click="showChangepw()">
              <van-icon
                id="iconfont_per"
                class="iconfont"
                class-prefix='icon'
                slot="icon"
                :name="icon.changePw"
              />
            </van-cell>
            <van-cell title="退出登录" icon="clear" size="large" is-link @click="showDialog()">
              <van-icon
                id="iconfont_per"
                class="iconfont"
                class-prefix='icon'
                slot="icon"
                :name="icon.exit"
              />
            </van-cell>
          </van-cell-group>
        </div>
      </div>
      <!-- <van-dialog v-model="isDialog" title="退出登录" show-cancel-button class="exit_dialog">
        <div class="exit_text">确定退出当前账号吗？</div>
      </van-dialog> -->
      <van-overlay :show="isChangePw" @click="isChangePw=false">
        <div class="wrapper" @click.stop>
          <div class="block">
            <van-icon name="cross" class="cancelpw_icon" @click="cancelOverlay()"/>
            <van-form @submit="pwSubmit" class="pw_form">
              <van-field
                class="pw_field"
                type="password"
                name="oldPw"
                v-model ="oldPw"
                label="原密码"
                placeholder="原密码"
                :rules="[{ required: true, message: '请填写原密码' }]"
              />
              <van-field
                class="pw_field"
                v-model ="newPw"
                name="newPw"
                type="password"
                label="新密码"
                placeholder="新密码"
                :rules="[{ required: true, message: '请填写新密码' }]"
              />
              <div style="margin: 12px 0;">
                <van-button block type="primary" class="pwBtn" native-type="submit">
                  提交
                </van-button>
              </div>
            </van-form>
          </div>
        </div>
      </van-overlay>
    </div>
    <div class="swipImg">
      <van-tabbar
        v-model="active"
        active-color="#1da37f"
        inactive-color="#8a8a8a">
        <van-tabbar-item>
          <van-icon class="iconfont" class-prefix='icon'
                    slot="icon" slot-scope="props"
                    :name="props.active?icon.home_active:icon.home_normal">
          </van-icon>
          <span>首页</span>
        </van-tabbar-item>
        <van-tabbar-item @click="order()">
          <van-icon class="iconfont"
                    class-prefix='icon'
                    slot="icon"
                    slot-scope="props"
                    :name="props.active?icon.order_active:icon.order_normal"
          >
          </van-icon>
          <span>预约记录</span>
        </van-tabbar-item>
        <van-tabbar-item>
          <van-icon class="iconfont"
                    class-prefix='icon' slot="icon"
                    slot-scope="props"
                    :name="props.active?icon.center_active:icon.center_normal"
          >
          </van-icon>
          <span>个人中心</span>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import {
  Field, Button, Icon, Search, Swipe, SwipeItem, Lazyload, Tabbar,
  TabbarItem, Grid, GridItem, NavBar, Cell, CellGroup, Uploader, DropdownMenu,
  DropdownItem, Popup, Form, Dialog, Overlay, List, Card, Tag, SwipeCell, Toast
} from 'vant'
import '@/assets/css/icon/iconfont.css'
import BMap from 'BMap'

export default {
  name: 'Home',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      searchText: '',
      loading: false,
      finished: false,
      isPopup: false,
      isDialog: false,
      isChangePw: false,
      isDeleteRecord: false,
      oldPw: '',
      newPw: '',
      orderList: [],
      swipeImages: [
        require('@/assets/img/banner1.png'),
        require('@/assets/img/banner2.png'),
        require('@/assets/img/banner3.png')
      ],
      tabNum: 0,
      active: 0,
      value1: 0,
      userInfo: {},
      icon: {
        home_active: 'shouye1',
        home_normal: 'shouye2',
        order_active: 'yuyue-current',
        order_normal: 'yuyue-current-copy',
        center_normal: 'gerenzhongxin2',
        center_active: 'gerenzhongxin2-copy',
        hospital_content: 'yiyuan1',
        department_content: 'keshi',
        record: 'yuyuejilu',
        report: 'report-audit',
        changePw: 'xiugaimima',
        exit: 'tuichudenglu',
        doctor: 'yisheng2',
        department: 'zu',
        reportList: 'baogao'
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
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Lazyload.name]: Lazyload,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Popup.name]: Popup,
    [Form.name]: Form,
    [Dialog.Component.name]: Dialog.Component,
    [Overlay.name]: Overlay,
    [List.name]: List,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Lazyload.name]: Lazyload,
    [SwipeCell.name]: SwipeCell,
    [Toast.name]: Toast
  },

  mounted () {
    this.get_bodyHeight()
    this.getUserInfo()
  },

  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log('test')
    },
    showDeleteDialog () {
      this.isDeleteRecord = true
    },
    getUserInfo () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
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
    toMap () {
      var map = new BMap.Map('allmap')
      var point = new BMap.Point(120.3540659, 30.3049286)
      map.centerAndZoom(point, 16)
      map.enableScrollWheelZoom()
      var myIcon = new BMap.Icon('myicon.png', new BMap.Size(30, 30), {
        anchor: new BMap.Size(10, 10)
      })
      var marker = new BMap.Marker(point, {icon: myIcon})
      map.addOverlay(marker)
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point)
          map.addOverlay(mk)
          // map.panTo(r.point); // 地图中心点移到当前位置
          var latCurrent = r.point.lat
          var lngCurrent = r.point.lng
          // alert('我的位置：'+ latCurrent + ',' + lngCurrent)
          location.href = 'http://api.map.baidu.com/direction?origin=' + latCurrent + ',' + lngCurrent + '&destination=30.2522100000,120.1658210000&mode=driving&region=北京&output=html'
        } else {
          alert('failed' + this.getStatus())
        }
      }, {enableHighAccuracy: true})
      map.addOverlay(marker)
      var licontent = '<b>浙江省中医院</b><br>'
      licontent += '<span><strong>地址：</strong>杭州经济技术开发区9号大街9号</span><br>'
      licontent += '<span><strong>电话：</strong>(0571)86918600</span><br>'
      var opts = {
        width: 200,
        height: 80
      }
      var infoWindow = new BMap.InfoWindow(licontent, opts)
      marker.openInfoWindow(infoWindow)
      marker.addEventListener('click', function () {
        marker.openInfoWindow(infoWindow)
      })
    },
    doctor () {
      this.$router.push('./doctor')
    },
    department () {
      this.$router.push('./department')
    },
    order () {
      this.active = 1
      console.log(JSON.parse(localStorage.getItem('userInfo')))
      const userId = JSON.parse(localStorage.getItem('userInfo')).userId
      this.axios.post('/api/getOrderByUserId', {
        userId: userId
      }).then((res) => {
        console.log(res)
        this.orderList = res.data.result
      }).catch((err) => {
        console.log(err)
      })
    },
    onClickLeft () {
      this.active = 0
    },
    deleteUser () {
      Dialog.confirm({
        title: '注销账号',
        message: '确认注销当前账号？'
      }).then(() => {
        this.axios.post('/api/deleteUser', {
          userId: this.userInfo.userId
        }).then((res) => {
          if (res.data.code === 1) {
            Toast.success('已成功注销当前账号，前往注册界面')
            localStorage.removeItem('Flag')
            localStorage.removeItem('userInfo')
            this.$router.push('/register')
          } else {
            Toast.fail(res.data.msg)
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.isDialog = false
      })
    },
    showPopup () {
      this.isPopup = true
    },
    onSubmit (values) {
      console.log('submit', values)
      this.isPopup = false
    },
    pwSubmit (values) {
      console.log('submit', values)
      if (values.newPw === values.oldPw) {
        Toast.fail('新密码与原密码相同')
      } else {
        if (values.oldPw === this.userInfo.password) {
          this.axios.post('/api/updateUser', {
            userId: this.userInfo.userId,
            username: this.userInfo.username,
            password: values.newPw,
            phone: this.userInfo.phone
          }).then((res) => {
            console.log(res)
            Toast.success('修改密码成功，请使用新密码重新登录')
            localStorage.removeItem('Flag')
            localStorage.removeItem('userInfo')
            this.$router.push('/login')
          }).catch((err) => {
            console.log(err)
          })
        } else {
          Toast.fail('原密码输入有误，修改密码失败')
        }
      }
      this.isChangePw = false
      this.oldPw = ''
      this.newPw = ''
    },
    showDialog () {
      Dialog.confirm({
        title: '退出登录',
        message: '确认退出当前账号？'
      }).then(() => {
        localStorage.removeItem('Flag')
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
        console.log('exit')
      }).catch(() => {
        this.isDialog = false
      })
    },
    showChangepw () {
      this.isChangePw = true
    },
    cancelOverlay () {
      this.isChangePw = false
      this.oldPw = ''
      this.newPw = ''
    },
    report () {
      this.$router.push('./report')
    },
    record () {
      this.active = 1
    },
    onSearch (val) {
      console.log('search', val)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .van-nav-bar__title {
    color: #ffffff;
    font-size: 18px;
  }
  .van-nav-bar__text{
    color: #fff;
    font-size: 18px;
  }
  .van-nav-bar .van-icon{
    color: #fff;
    font-size: 18px;
  }
</style>
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .searchDiv {
    width: 100%;
    margin: 0 auto;
    /* margin-top: 5px; */
  }
  .mainList {
    padding-bottom: 10px;
    width: 100%;
  }
  .order {
    height: 70px;
    width: 70px;
    background-color: #FFFFFF;
    display: inline-block;
    margin: 5% 4% 0 8%;
  }
  .orderImg {
    margin: 11px;
  }
  p {
    color: #128784;
    text-align: center;
  }
  .navi {
    width: 90%;
    height: 140px;
    margin: 8% 5%;
    border-radius: 10px;
  }
  .map {
    width: 40%;
    height: 130px;
    border: 1px solid #128784;
    border-radius: 10px 0px 0px 10px;
    margin-top: 5px;
    float: left;
    background-color: #3BB5B2;
    opacity: 0.5;
  }
  .loca {
    width: 59%;
    height: 130px;
    border: 1px solid #128784;
    border-style: solid solid solid none;
    border-radius: 0px 10px 10px 0px;
    margin-top: 5px;
    float: left;
  }
  .locaText {
    color: gray;
    margin: 20px 10px;
    line-height: 25px;
  }
  .naviTip {
    font-size: 18px;
    color: #636e72;
  }
  .navitip {
    font-size: 10px;
    color: #b2bec3;
  }
  .swip_img {
    width: 90%;
  }
  .van-swipe {
    border-radius: 10px;
    border: 1px solid #3bb5b2;
  }
  .swipePart {
    margin: 5% 3%;
    width: 94%;
  }
  .iconfont {
    font-size: 25px;
  }
  #iconfont_per {
    font-size: 30px;
    margin: 25px 10px 0 10px;
    color: #128784;
  }
  #iconfont_home {
    /* margin: 30px 0 0 10px; */
    margin-left: 15px;
    margin-bottom: 15px;
    font-size: 40px;
    color: #fff;
    line-height: 70px;
  }
  p {
    color: #4e5353;
    font-size: 20px;
    line-height: 40px;
  }
  .icon_div {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #3bb5b2;
  }
  .van-nav-bar .van-icon {
    color: #ffffff;
  }
  .van-nav-bar .van-icon[data-v-7730d21c]{
    font-size: 30px;
    margin-bottom: 8px;
  }
  .van-nav-bar__title{
    color: #fff;
  }
  .van-nav-bar__arrow {
    font-size: 20px;
  }
  .van-nav-bar__right {
    font-size: 20px;
  }
  .van-nav-bar {
    background-color: #128784;
  }
  .por_img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    float: left;
    position: absolute;
    z-index: 1;
  }
  .portrait_content {
    background-color: #128784;
  }
  .portrait {
    background-color: #128784;
    width: 275px;
    height: 470px;
    padding: 60px 50px 40px 50px;
  }
  .name {
    font-size: 22px;
    position: absolute;
    float: left;
    margin: 11% 0 0 30% !important;
    z-index: 1;
  }
  .phone {
    line-height: 25px;
    position: absolute;
    float: left;
    margin: 21% 0 0 30% !important;
    z-index: 1;
  }
  .cell_content {
    margin: 0 auto;
    padding: 55% 10% 0 10%;
    width: 100%;
    float: left;
    margin-left: -10%;
    border-radius: 10px;
    margin-top: 40px;
  }
  .van-cell--large .van-cell__title {
    font-size: 24px;
    line-height: 70px;
  }
  .van-cell__left-icon, .van-cell__right-icon {
    font-size: 24px;
    line-height: 70px;
    margin: 0 10px;
    color: #128784;
  }
  .hospital_content {
    margin: 15px 0;
  }
  #hospital_icon {
    margin-left: 5%;
  }
  .add_1 {
    font-size: 22px;
    color: #fff;
    margin-top: 65px;
    margin-left: 10px;
  }
  .add_2 {
    color: #ffffff;
    margin-top: 5px;
    margin-left: 10px;
  }
  .hospital_img {
    width: 96%;
    height: 150px;
    margin: 1% 2%;
    border-radius: 10px;
    background-repeat: no-repeat;
  }
  .ks_tip {
    font-size: 20px;
    color: slategrey;
  }
  .van-dropdown-menu {
    width: 94%;
    margin: 3%;
    border: 2px solid #a1b1b0;
    border-radius: 5px;
  }
  .info_arrow {
    float: right;
  }
  .popup_con {
    width: 65%;
    padding: 30px;
    border-radius: 10px;
  }
  .info_field {
    height: 50px;
  }
  .time_content {
    margin-top: 15px;
  }
  .exit_dialog {
    width: 80%;
  }
  .exit_text {
    margin: 10% 23%;
    color: red;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .block {
    width: 80%;
    border-radius: 10px;
    background-color: #fff;
  }
  .pw_form {
    margin: 25% 13% 10% 13%;
  }
  .pw_field {
    height: 50px;
    font-size: 18px;
  }
  .pwBtn {
    height: 40px;
    border-radius: 5px;
    font-size: 18px;
    line-height: 40px;
  }
  .cancelpw_icon {
    float: right;
    font-size: 25px;
    margin: 10px;
    color: grey;
  }
  .van-nav-bar__title {
    max-width: 100%;
    color: #ffffff;
  }
  .van-nav-bar .van-icon {
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
  }
  .van-tag--success.van-tag--plain {
    float: right;
  }
  .van-uploader__input-wrapper{
    width: 100px;
    height: 100px;
  }
  .van-footer {
    text-align: left;
  }
  .van-nav-bar__title {
    max-width: 100%;
    color: #ffffff!important;
  }
</style>
