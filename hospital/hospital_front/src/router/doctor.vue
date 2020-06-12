<template>
  <div id="doctor" :style="'height:'+fullHeight+'px;'">
    <van-row type="flex" justify="center">
      <van-icon class="back_icon" name="arrow-left" color="#3bb5b2" size="30" @click="back()"/>
      <van-col span="6" class="left_col" @click="preDay()">前一天</van-col>
      <van-col span="6" class="center_col">{{myDate}}</van-col>
      <van-col span="6" class="right_col" @click="nextDay()">后一天</van-col>
    </van-row>
    <van-tabs v-model="activeName" color="#3bb5b2" line-width="65px" swipeable title-active-color="#3bb5b2">
      <van-tab title="主任医师" name="a">
        <van-list>
          <van-cell>
            <van-card
              v-for="item in chiefList"
              :key="item.doctorId"
              :thumb="item.doctorImg"
              @click="doctorOrder(item.doctorId)"
            >
              <div slot="desc" class="van-card__desc">{{item.doctorSynopsis}}</div>
              <div slot="title" class="van-card__title">{{item.doctorName}}</div>
              <div slot="tags" class="card_tag">
                <van-tag plain type="success" size="large" v-if="item.doctorIsOrder">可预约</van-tag>
                <van-tag plain type="success" size="large" v-if="!item.doctorIsOrder">不可预约</van-tag>
              </div>
              <div slot="bottom" class="van-card__bottom">
                {{item.doctorSynopsis}}
              </div>
              <div slot="footer" class="van-card__footer">
                挂号费：<span class="price">￥{{item.doctorPrice}}</span>
              </div>
            </van-card>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="副主任医师" name="b">
        <van-list>
          <van-cell>
            <van-card
              v-for="item in deputyChiefList"
              :key="item.doctorId"
              :thumb="item.doctorImg"
              @click="doctorOrder(item.doctorId)"
            >
              <div slot="desc" class="van-card__desc">{{item.doctorSynopsis}}</div>
              <div slot="title" class="van-card__title">{{item.doctorName}}</div>
              <div slot="tags" class="card_tag">
                <van-tag plain type="success" size="large" v-if="item.doctorIsOrder">可预约</van-tag>
                <van-tag plain type="success" size="large" v-if="!item.doctorIsOrder">不可预约</van-tag>
              </div>
              <div slot="bottom" class="van-card__bottom">
                {{item.doctorSynopsis}}
              </div>
              <div slot="footer" class="van-card__footer">
                挂号费：<span class="price">￥{{item.doctorPrice}}</span>
              </div>
            </van-card>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="主治医师" name="c">
        <van-list>
          <van-cell>
            <van-card
              v-for="item in attendingList"
              :key="item.number"
              :thumb="item.doctorImg"
              @click="doctorOrder(item.doctorId)"
            >
              <div slot="desc" class="van-card__desc">{{item.doctorSynopsis}}</div>
              <div slot="title" class="van-card__title">{{item.doctorName}}</div>
              <div slot="tags" class="card_tag">
                <van-tag plain type="success" size="large" v-if="item.doctorIsOrder">可预约</van-tag>
                <van-tag plain type="success" size="large" v-if="!item.doctorIsOrder">不可预约</van-tag>
              </div>
              <div slot="bottom" class="van-card__bottom">
                {{item.doctorSynopsis}}
              </div>
              <div slot="footer" class="van-card__footer">
                挂号费：<span class="price">￥{{item.doctorPrice}}</span>
              </div>
            </van-card>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="住院医师" name="d">
        <van-list
        >
          <van-cell >
            <van-card
              v-for="item in residentList"
              :key="item.number"
              :thumb="item.doctorImg"
              @click="doctorOrder(item.doctorId)"
            >
              <div slot="desc" class="van-card__desc">{{item.doctorSynopsis}}</div>
              <div slot="title" class="van-card__title">{{item.doctorName}}</div>
              <div slot="tags" class="card_tag">
                <van-tag plain type="success" size="large" v-if="item.doctorIsOrder">可预约</van-tag>
                <van-tag plain type="success" size="large" v-if="!item.doctorIsOrder">不可预约</van-tag>
              </div>
              <div slot="bottom" class="van-card__bottom">
                {{item.doctorSynopsis}}
              </div>
              <div slot="footer" class="van-card__footer">
                挂号费：<span class="price">￥{{item.doctorPrice}}</span>
              </div>
            </van-card>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {Icon, Search, List, Cell, Tab, Tabs, Card, Tag, Col, Row} from 'vant'
import '@/assets/css/icon/iconfont.css'

export default {
  name: 'doctor',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      myDate: '',
      nowDate: '',
      value: '',
      scheduleList: [],
      doctorList: [],
      // 主任医师列表
      chiefList: [],
      // 副主任医师列表
      deputyChiefList: [],
      // 主治医师
      attendingList: [],
      // 住院医师
      residentList: [],
      loading: false,
      finished: false,
      activeName: 'a'
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
    [Search.name]: Search,
    [List.name]: List,
    [Cell.name]: Cell,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Row.name]: Row
  },

  mounted () {
    this.get_bodyHeight()
    this.getDate()
    this.getDoctorList()
  },

  methods: {
    getDate () {
      this.nowDate = (new Date()).getTime()
      var yesterday = new Date(this.nowDate)
      this.myDate = yesterday.getFullYear() + '-' + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : '0' +
          (yesterday.getMonth() + 1)) + '-' + (yesterday.getDate() > 9 ? (yesterday.getDate()) : '0' + (yesterday.getDate()))
    },
    preDay () {
      this.chiefList = []
      this.deputyChiefList = []
      this.attendingList = []
      this.residentList = []
      this.nowDate = this.nowDate - 24 * 60 * 60 * 1000
      var yesterday = new Date(this.nowDate)
      this.myDate = yesterday.getFullYear() + '-' + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : '0' +
          (yesterday.getMonth() + 1)) + '-' + (yesterday.getDate() > 9 ? (yesterday.getDate()) : '0' + (yesterday.getDate()))
      this.getDoctorList()
    },
    nextDay () {
      this.chiefList = []
      this.deputyChiefList = []
      this.attendingList = []
      this.residentList = []
      this.nowDate = this.nowDate + 24 * 60 * 60 * 1000
      var yesterday = new Date(this.nowDate)
      this.myDate = yesterday.getFullYear() + '-' + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : '0' +
          (yesterday.getMonth() + 1)) + '-' + (yesterday.getDate() > 9 ? (yesterday.getDate()) : '0' + (yesterday.getDate()))
      this.getDoctorList()
    },
    doctorOrder (doctorId) {
      this.emitId = doctorId
      this.$store.commit('changeDoctorDate', {
        doctorDate: this.myDate
      })
      this.$store.commit('changeDoctorId', {
        doctorId: doctorId
      })
      this.$router.push('./doctorOrder')
    },
    getDoctorList () {
      this.axios.post('/api/getScheduleByDate', {
        scheduleDate: this.myDate
      }).then((res) => {
        this.scheduleList = res.data.result.map(item => {
          return item.doctorId
        })
        this.scheduleList.map(item => {
          this.axios.post('/api/getDoctorById', {
            doctorId: item
          }).then((res) => {
            let doctor = res.data.result[0]
            switch (doctor.doctorType) {
              case 1:
                this.chiefList.push(doctor)
                let obj = {}
                this.chiefList = this.chiefList.reduce((item, next) => {
                  if (!obj[next.doctorName]) {
                    item.push(next)
                    obj[next.doctorName] = true
                  }
                  return item
                }, [])
                break
              case 2:
                this.deputyChiefList.push(doctor)
                let obj1 = {}
                this.deputyChiefList = this.deputyChiefList.reduce((item, next) => {
                  if (!obj1[next.doctorName]) {
                    item.push(next)
                    obj1[next.doctorName] = true
                  }
                  return item
                }, [])
                break
              case 3:
                this.attendingList.push(doctor)
                let obj2 = {}
                this.attendingList = this.attendingList.reduce((item, next) => {
                  if (!obj2[next.doctorName]) {
                    item.push(next)
                    obj2[next.doctorName] = true
                  }
                  return item
                }, [])
                break
              default:
                this.residentList.push(doctor)
                let obj3 = {}
                this.residentList = this.residentList.reduce((item, next) => {
                  if (!obj3[next.doctorName]) {
                    item.push(next)
                    obj3[next.doctorName] = true
                  }
                  return item
                }, [])
            }
          }).catch((err) => {
            console.log(err)
          })
        })
      }).catch((err) => {
        console.log(err)
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
    back () {
      this.$router.push('./')
    }
  }
}
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .card_tag {
    margin: 10px;
    float: right;
  }

  .van-card__title {
    font-size: 20px;
    line-height: 50px;
    float: left;
  }

  .van-card__desc {
    font-size: 16px;
    line-height: 40px;
    float: left;
    margin: 7px 0 0 15px;
    color: #3bb5b2;
  }

  .van-card__footer {
    font-size: 17px;
    margin: -25px 5px 5px 0;
  }

  .price {
    color: rgb(111, 123, 134);
  }

  .center_col {
    background-color: #3bb5b2;
    color: #FFFFFF;
  }

  .left_col {
    border-radius: 3px 0 0 3px;
    color: #3bb5b2;
  }

  .right_col {
    border-radius: 0 3px 3px 0;
    color: #3bb5b2;
  }

  .van-col--6 {
    margin: 5px 0;
    height: 30px;
    line-height: 30px;
    border: 1px solid #3bb5b2;
    text-align: center;
  }
  .back_icon {
    margin-top: 5px;
    left: -30px;
  }
  .van-card__thumb img {
    border-radius: 0 !important;
  }

  .van-card__thumb {
    margin: 10px;
  }
</style>
