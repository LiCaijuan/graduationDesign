import React, { Component } from "react";
import { Layout, Card } from 'antd';
import axios from 'axios'
import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import './index.css'
import ReactEcharts from 'echarts-for-react'
const { Content } = Layout;


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      orderCount: []
    }
  }
  componentDidMount() {
    this.getScheduleList()
  }

  getScheduleList = () => {
    axios.post('/getScheduleList')
    .then((res) => {
      console.log(res, 'res')
      var countedOrder = res.result.reduce((allOrder, order) =>{
        if (order.scheduleDate in allOrder) {
          allOrder[order.scheduleDate]++;
        } else {
          allOrder[order.scheduleDate] = 1;
        }
        return allOrder;
      }, {});
      let orderList = [];
      let orderCount = [];
      for(let key in countedOrder){
        orderList.push(key);
        orderCount.push(countedOrder[key])
      }
      this.setState({
        orderList: orderList,
        orderCount: orderCount
      })
    })
  }

  getOption = ()=>{
    let option = {
      title: {
        text: '折线图二',
        x: 'center'
      },
      tooltip:{
        trigger: 'axis'
      },
      xAxis: {
        boundaryGap: false,
        data: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
      },
      yAxis: {
        type: 'value' //数值轴，适用于连续数据
      },
      series : [{
        name:'订单量',
        type:'line',
        data:[1000, 1500, 2000, 3000, 2500, 1800, 1200],
        areaStyle: {}
      }]
    }
    return option;
  }
  getMonthOrder = () => {
    let mongthOption = {
      title: {
        text: '当月预约情况',
        x: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['最高气温', '最低气温']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.state.orderList
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}人次'
        }
      },
      series: [{
        name: '预约总人次',
        type: 'line',
        data: this.state.orderCount,
        markPoint: {
          data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        }
      },
    ]};
    return mongthOption;
  };
  getMonthSchedule = () => {
    let mongthOption = {
      title: {
        text: '当月预约情况',
        x: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['最高气温', '最低气温']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.state.orderList
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}人次'
        }
      },
      series: [{
        name: '预约总人次',
        type: 'line',
        data: this.state.orderCount,
        markPoint: {
          data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        }
      },
    ]};
    return mongthOption;
  }
  render () {
    return(
      <Layout style={{height: '100%',padding: 10 }}>
        <Content style={{margin: 10, background: '#fff'}}>
            <Card.Grid className="line_b">
                <ReactEcharts option={this.getMonthOrder()}/>
            </Card.Grid>
            <Card.Grid className="line_b">
                <ReactEcharts option={this.getMonthSchedule()}/>
            </Card.Grid>
            <Card.Grid className="line_b">
                <ReactEcharts option={this.getOption()}/>
            </Card.Grid>
            <Card.Grid className="line_b">
                <ReactEcharts option={this.getOption()}/>
            </Card.Grid>
        </Content>
      </Layout>
    )
  }
}