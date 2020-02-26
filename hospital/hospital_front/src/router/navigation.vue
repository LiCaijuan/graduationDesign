<template>
  <div id="allmap" :style="'height:'+fullHeight+'px;'">
  </div>
</template>

<script>
import { Field, Button } from 'vant'
import '@/assets/css/icon.css'
import BMap from 'BMap'
import BMapSymbolSHAPEPOINT from 'BMap_Symbol_SHAPE_POINT'
export default {
  name: 'Login',
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
    [Field.name]: Field,
    [Button.name]: Button
  },

  mounted () {
    this.get_bodyHeight()
    this.baiduMap()
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
    },

    baiduMap () {
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
  #allmap{
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
  }
</style>
