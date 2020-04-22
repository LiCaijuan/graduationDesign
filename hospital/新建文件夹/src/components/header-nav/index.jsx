import React, { Component } from "react";
import './index.less';
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
// } from '@ant-design/icons';
// const { Header } = Layout;


export default class HeaderNav extends Component {
 
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
            <span>2020-4-3 22:58</span>
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" />
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}