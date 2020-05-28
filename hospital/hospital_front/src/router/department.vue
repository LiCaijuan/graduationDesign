<template>
  <div id="department" :style="'height:'+fullHeight+'px;'">
    <!-- <div class="searchDiv">
      <van-icon class="back_name" name="arrow-left" color="#ffffff" @click="back()"/>
      <van-search class="search_name" v-model="value" background="#3bb5b2" shape="round" placeholder="搜索科室"/>
    </div> -->
    <van-row type="flex" justify="center">
      <van-icon class="back_icon" name="arrow-left" color="#3bb5b2" size="30" @click="back()"/>
      <van-col span="6" class="left_col" @click="preDay()">前一天</van-col>
      <van-col span="6" class="center_col">{{myDate}}</van-col>
      <van-col span="6" class="right_col" @click="nextDay()">后一天</van-col>
    </van-row>
    <van-list>
      <van-empty
        style="margin-top: 100px"
        class="custom-image"
        v-if="isEmpty"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="今日已无可预约号源"
      />
      <van-cell>
        <van-card
          v-for="item in departmentList"
          :key="item.departmentId"
          :thumb="`https://img.yzcdn.cn/vant/ipad.jpeg`"
          @click="departmentOrder(item.departmentId)"
        >
          <div slot="desc" class="van-card__desc">{{item.departmentAddress}}</div>
          <div slot="title" class="van-card__title">{{item.departmentName}}</div>
          <div slot="tags" class="card_tag">
            <van-tag plain type="success" size="large">wu</van-tag>
          </div>
          <div slot="bottom" class="van-card__bottom">{{item.departmentDesc}}</div>
        </van-card>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import {Search, Icon, List, Cell, Card, Tag, Col, Row, Empty } from 'vant'
import '@/assets/css/icon/iconfont.css'

export default {
  name: 'department',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      value: '',
      myDate: '',
      nowDate: '',
      loading: false,
      finished: false,
      departmentList: [],
      scheduleList: [],
      isEmpty: false,
      list: [
        {
          number: 1,
          name: '内科',
          address: 'aa楼四楼',
          image: '../assets/img/map.png',
          isOrder: '可预约',
          thumb: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          desc: '中医内科始建于1956年，是我院集医疗、教学、科研为一体的综合性临床科室，年门诊量达十余万人次，是我院门诊量最大的科室。'
        }, {
          number: 2,
          name: '外科',
          address: 'bb楼11楼',
          image: '../assets/img/map.png',
          isOrder: '可预约',
          thumb: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          desc: '中医内科始建于1956年，是我院集医疗、教学、科研为一体的综合性'
        }
      ]
    }
  },

  watch: {
    // 监控浏览器高度变化
    fullHeight (val) {
      if (!this.timer) {
        this.fullHeight = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    }
  },
  components: {
    [Search.name]: Search,
    [Icon.name]: Icon,
    [List.name]: List,
    [Cell.name]: Cell,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Row.name]: Row,
    [Empty.name]: Empty
  },

  mounted () {
    this.getDate();
    this.get_bodyHeight();
    this.getDepartmentList()
  },

  methods: {
    // 动态获取浏览器高度
    get_bodyHeight () {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight;
          that.fullHeight = window.fullHeight
        })()
      }
    },
    getDate () {
      this.nowDate = (new Date()).getTime();
      var yesterday = new Date(this.nowDate);
      this.myDate = yesterday.getFullYear() + '-' + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : '0' +
          (yesterday.getMonth() + 1)) + '-' + (yesterday.getDate() > 9 ? (yesterday.getDate()) : '0' + (yesterday.getDate()))
    },
    preDay () {
      this.chiefList = [];
      this.deputyChiefList = [];
      this.attendingList = [];
      this.residentList = [];
      this.nowDate = this.nowDate - 24 * 60 * 60 * 1000;
      var yesterday = new Date(this.nowDate);
      this.myDate = yesterday.getFullYear() + '-' + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : '0' +
          (yesterday.getMonth() + 1)) + '-' + (yesterday.getDate() > 9 ? (yesterday.getDate()) : '0' + (yesterday.getDate()));
      this.getDepartmentList()
    },
    nextDay () {
      this.chiefList = [];
      this.deputyChiefList = [];
      this.attendingList = [];
      this.residentList = [];
      this.nowDate = this.nowDate + 24 * 60 * 60 * 1000;
      var yesterday = new Date(this.nowDate);
      this.myDate = yesterday.getFullYear() + '-' + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : '0' +
          (yesterday.getMonth() + 1)) + '-' + (yesterday.getDate() > 9 ? (yesterday.getDate()) : '0' + (yesterday.getDate()))
      this.getDepartmentList()
    },
    back () {
      this.$router.push('./')
    },
    getDepartmentList () {
      this.axios.post('/api/getScheduleByDate', {
        scheduleDate: this.myDate
      }).then((res) => {
        console.log(res);
        this.scheduleList = res.data.result.map(item => {
          return item.departmentId
        });
        this.scheduleList.map(item => {
          this.axios.post('/api/getDepartmentById', {
            departmentId: item
          }).then((res) => {
            console.log(res, 'log')
            this.departmentList = res.data.result
            this.isEmpty = this.departmentList.length>0?false:true
          }).catch((err) => {
            console.log(err)
          })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    departmentOrder (departmentId) {
      this.$store.commit('changeDepartmentId', {
        departmentId: departmentId
      });
      this.$store.commit('changeDepartmentDate', {
        departmentId: this.myDate
      });
      this.$router.push('./departmentOrder')
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
  .searchDiv {
    height: 40px;
    background-color: #3bb5b2;
  }
  .back_name {
    float: left;
    font-size: 30px;
    margin-top: 5px;
  }
  .search_name {
    float: left;
    width: 80%;
    margin: 3px 15px;
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
    margin: 5px;
  }
  .van-card__bottom {
    font-size: 15px;
    /*margin-top: -45px;*/
    display: -webkit-box;/*作为弹性伸缩盒子模型显示*/
    -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
    overflow: hidden; /*超出的文本隐藏*/
    text-overflow: ellipsis; /* 溢出用省略号*/
    -webkit-box-orient: vertical;/*伸缩盒子的子元素排列：从上到下*/
  }
  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
</style>
