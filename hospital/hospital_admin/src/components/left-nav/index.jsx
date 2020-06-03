import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd';

import {
  HomeOutlined,
  UserAddOutlined,
  CalendarOutlined,
  DashboardOutlined,
  SolutionOutlined,
  CarryOutOutlined
} from '@ant-design/icons';
const { Sider } = Layout;


class LeftNav extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render () {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname;
    return(
      <div className="left-nav">
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
          trigger={null} 
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" selectedKeys={[path]} style={{marginTop: 65 }}>
            <Menu.Item key="/home">
              <Link to='/home'>
                <HomeOutlined />
                <span>首页</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/doctor">
              <Link to='/doctor'>
                <UserAddOutlined />
                <span>医生管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/department">
              <Link to='/department'>
                <CalendarOutlined />
                <span>科室管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/schedule">
              <Link to='/schedule'>
                <DashboardOutlined />
                <span>排班管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/report">
              <Link to='/report'>
                <SolutionOutlined />
                <span>报告管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/record">
              <Link to='/record'>
                <CarryOutOutlined />
                <span>预约管理</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    )
  }
}
/*
  withRouter高阶组件
  包装非路由组件，返回一个新的组件
  新的组件向非路由组件传递三个属性：history/Location/match
*/
export default withRouter(LeftNav)