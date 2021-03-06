import React, { Component } from "react";
import './index.less';
import jsonp from 'jsonp'
import menuList from '../../config/menuConfig'
import { withRouter } from 'react-router-dom'
import { Popconfirm, message } from 'antd';

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
    const path = this.props.location.pathname;
    let title
    menuList.find(item => {
      if (item.key === path) {
        title = item.title
      }
    })
    return title
  };
  confirm = (e) => {
    console.log(e);
    this.props.history.push('/login')
    sessionStorage.removeItem('adminInfo')
  }

  cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  }

  render () {
    const title = this.getTitle()
    const adminName = JSON.parse(sessionStorage.getItem('adminInfo')).username
    return(
      <div className="HeaderNav" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="header-top">
          <span>欢迎，{adminName}</span>
          <Popconfirm
            title="确定退出当前账号吗?"
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="退出"
            cancelText="取消"
          >
            <a href="#">退出</a>
          </Popconfirm>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
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