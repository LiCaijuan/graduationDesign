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
      orderCount: [],
      reportList: [],
      reportCount: [],
      scheduleList: [],
      scheduleCount: []
    }
  }
  componentDidMount() {
    this.getScheduleList()
    this.getReportList()
    this.getOrderList()
  }

  getReportList = () => {
    axios.post('/getReportList')
        .then((res) => {
          console.log(res)
          const countedReport = res.result.reduce((allReport, report) =>{
            if (report.date in allReport) {
              allReport[report.date]++;
            } else {
              allReport[report.date] = 1;
            }
            return allReport;
          }, {});
          let reportList = [];
          let reportCount = [];
          for(let key in countedReport){
            reportList.push(key);
            reportCount.push(countedReport[key])
          }
          this.setState({
            reportList: reportList,
            reportCount: reportCount
          })
        }).catch((err) => {
          console.log(err)
    })
  };
  getOrderList = () => {
    axios.post('/getOrderList')
        .then((res) => {
          const countedOrder = res.result.reduce((allOrder, order) =>{
            if (order.orderDate in allOrder) {
              allOrder[order.orderDate]++;
            } else {
              allOrder[order.orderDate] = 1;
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
          console.log(res)
        }).catch((err) => {
          console.log(err)
    })
  };
  getScheduleList = () => {
    axios.post('/getScheduleList')
    .then((res) => {
      const countedSchedule = res.result.reduce((allSchedule, schedule) =>{
        if (schedule.scheduleDate in allSchedule) {
          allSchedule[schedule.scheduleDate]++;
        } else {
          allSchedule[schedule.scheduleDate] = 1;
        }
        return allSchedule;
      }, {});
      let scheduleList = [];
      let scheduleCount = [];
      for(let key in countedSchedule){
        scheduleList.push(key);
        scheduleCount.push(countedSchedule[key])
      }
      this.setState({
        scheduleList: scheduleList,
        scheduleCount: scheduleCount
      })
    })
  }

  getOption = ()=>{
    let option = {
      title: {
        text: '预约热门科室',
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
        text: '预约分析',
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
        name: '排班总数',
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
        text: '排班分析',
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
        data: this.state.scheduleList
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
        data: this.state.scheduleCount,
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
  getReport = () => {
    let reportOption = {
      title: {
        text: '报告分析',
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
        data: this.state.reportList
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
        data: this.state.reportCount,
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
    return reportOption;
  }
  render () {
    return(
      <Layout style={{height: '100%'}}>
        <Content style={{ background: '#fff'}}>
            <Card.Grid className="line_b">
                <ReactEcharts option={this.getMonthOrder()}/>
            </Card.Grid>
            <Card.Grid className="line_b">
                <ReactEcharts option={this.getMonthSchedule()}/>
            </Card.Grid>
            <Card.Grid className="line_b">
                <ReactEcharts option={this.getReport()}/>
            </Card.Grid>
            <Card.Grid className="line_b">
                <ReactEcharts option={this.getOption()}/>
            </Card.Grid>
        </Content>
      </Layout>
    )
  }
}