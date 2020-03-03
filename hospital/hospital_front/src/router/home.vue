<template>
  <div id="home" :style="'height:'+fullHeight+'px;'">
    <div class="home_content" v-show="active===0">
      <div class="mainUp">
        <div class="searchDiv">
          <van-search shape="round" input-align="center" v-model="searchText" placeholder="搜索科室/医生" />
        </div>
      </div>
      <div class="swipePart">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in swipeImages" :key="index">
            <img v-lazy="image" />
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
            详址：江干区123号啥的
          </div>
        </div>
      </div><br><br><br>
      <div class="mainList">
        <div class="order" @click="doctor()">
          <img class="orderImg" src="../assets/img/doctor.png" alt="医生">
          <p>&nbsp;&nbsp;找医生</p>
        </div>
        <div class="order" @click="department()">
          <img class="orderImg" src="../assets/img/department.png" alt="科室">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;找科室</p>
        </div>
        <div class="order" @click="report()">
          <img class="orderImg" src="../assets/img/navigation.png" alt="预约">
          <p>&nbsp;&nbsp;查报告</p>
        </div>
      </div>
    </div>
    <div class="order_content" v-show="active===1">
      快速预约
    </div>
    <div class="personalcenter_content" v-show="active===2">
      <van-nav-bar title="个人中心" left-text="返回" left-arrow>
        <van-icon name="setting-o" slot="right" />
      </van-nav-bar>
      <div class="portrait">
        <div class="portrait_content">
          <img class="por_img" src="../assets/img/timg.jpg" alt="">
          <div class="name_tip">
            <div class="name">小白</div>
            <div class="phone">19909478033</div>
          </div>
        </div>
        <div class="center_content">
        </div>
      </div>
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
          <span>快速预约</span>
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
import { Field, Button, Icon, Search, Swipe, SwipeItem, Lazyload, Tabbar, TabbarItem, Grid, GridItem, NavBar } from 'vant'
import '@/assets/css/icon/iconfont.css'
import BMap from 'BMap'
export default {
  name: 'Home',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      searchText: '',
      swipeImages: [
        require('@/assets/img/banner1.png'),
        require('@/assets/img/banner2.png'),
        require('@/assets/img/banner3.png')
      ],
      tabNum: 0,
      active: 0,
      icon: {
        home_active: 'shouye1',
        home_normal: 'shouye2',
        order_active: 'yuyue-current',
        order_normal: 'yuyue2',
        center_normal: 'gerenzhongxin2',
        center_active: 'gerenzhongxin2-copy'
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
    [NavBar.name]: NavBar
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
    toMap () {
      var map = new BMap.Map('allmap')
      var point = new BMap.Point(116.709684, 39.89778)
      map.centerAndZoom(point, 16)
      map.enableScrollWheelZoom()
      var myIcon = new BMap.Icon('myicon.png', new BMap.Size(30, 30), {
        anchor: new BMap.Size(10, 10)
      })
      var marker = new BMap.Marker(point, { icon: myIcon })
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
          location.href = 'http://api.map.baidu.com/direction?origin=' + latCurrent + ',' + lngCurrent + '&destination=39.89778,116.709684&mode=driving&region=北京&output=html'
        } else {
          alert('failed' + this.getStatus())
        }
      }, {enableHighAccuracy: true})
      map.addOverlay(marker)
      var licontent = '<b>浙江省中医院</b><br>'
      licontent += '<span><strong>地址：</strong>北京市通州区滨河中路108号</span><br>'
      licontent += '<span><strong>电话：</strong>(010)81556565 / 6969</span><br>'
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
    },
    onClickLeft () {
      this.active = 0
    },
    onClickRight () {
      alert("设置")
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
  .searchDiv{
    width: 100%;
    margin: 0 auto;
    margin-top: 5px;
  }
  /* .mainUp{
    background-color: #3BB5B2;
  } */
  .mainList{
    padding-bottom: 10px;
    width: 100%;
  }
  .order{
    height: 70px;
    width: 70px;
    background-color: #FFFFFF;
    display: inline-block;
    margin: 6%;
  }
  .orderImg{
    margin: 11px;
  }
  p{
    color: #128784;
    text-align: center;
  }
  .navi{
    width: 90%;
    height: 140px;
    margin: 5% 5%;
    border-radius: 10px;
  }
  .map{
    width: 40%;
    height: 130px;
    border: 1px solid #128784;
    border-radius: 10px 0px 0px 10px;
    margin-top: 5px;
    float: left;
    background-color: #3BB5B2;
    opacity: 0.5;
  }
  .loca{
    width: 59%;
    height: 130px;
    border: 1px solid #128784;
    border-style: solid solid solid none;
    border-radius: 0px 10px 10px 0px;
    margin-top: 5px;
    float: left;
  }
  .locaText{
    color: gray;
    margin: 20px 10px;
    line-height: 25px;
  }
  .naviTip{
    font-size: 18px;
    color: #636e72;
  }
  .navitip{
    font-size: 10px;
    color: #b2bec3;
  }
  .swipImg{
    width: 90%;
  }
  .swipePart{
    margin-top: 10px;
  }
  .iconfont{
    font-size: 25px;
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
  .van-nav-bar__right{
    font-size: 20px;
  }
  .van-nav-bar{
    background-color: #3BB5B2;
  }
  .por_img{
    width: 100px;
    height: 100px;
    border-radius: 50px;
    float: left;
  }
  .portrait_content{
    background-color: #128784;
    margin-top: -12%;
  }
  .portrait{
    background-color: #128784;
    width: 100%;
    height: 100%;
    padding: 30% 0 0 10%;
  }
  .name_tip{
    float: left;
    margin: 13% 0 0 5%;
  }
  .name{
    font-size: 22px;
  }
  .phone{
    line-height: 25px;
  }
  .center_content{
    height: 80%;
    width: 90%;
    margin: 0 auto;
  }
</style>
