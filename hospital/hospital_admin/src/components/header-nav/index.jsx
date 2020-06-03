import React, { Component } from "react";
import './index.less';
import jsonp from 'jsonp'
import { withRouter } from 'react-router-dom'
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
// } from '@ant-design/icons';
// const { Header } = Layout;


class HeaderNav extends Component {
  constructor(props) {
    super();
    this.state = {
      weather: '',
      dayPictureUrl: '',
      date: ''
    }
  }
  componentDidMount() {

    const url = `http://api.map.baidu.com/telematics/v3/weather?location=杭州&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    jsonp(url, {}, (err, data) => {
      console.log('jsonp', err, data)
      if (!err && data.status === 'success') {
        const { dayPictureUrl, weather, date } = data.results[0].weather_data[0]
        this.setState({
          weather: weather,
          dayPictureUrl: dayPictureUrl,
          date: date
        })
      } else {
        console.log('天气信息获取失败')
      }
    })

    this.getTitle()
  }
  getTitle = () => {
    const path = this.props.location.pathname
    console.log(path, 'path')
  }

  render () {
    return(
      <div className="HeaderNav" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="header-top">
          <span>欢迎，admin</span>
          <a href="javascript:">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
          <div className="header-bottom-right">
            <span>{this.state.date}</span>
            <img src={this.state.dayPictureUrl} />
            <span>{this.state.weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(HeaderNav)