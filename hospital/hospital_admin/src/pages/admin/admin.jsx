import React, { Component } from "react";
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import './style.css'
import LeftNav from '../../components/left-nav'
import HeaderNav from '../../components/header-nav'
import Doctor from '../doctor/doctor'
import User from '../user'
import Department from '../department/department'
import Home from '../home/home'
import Record from '../record/record'
import Report from '../report/report'
import Schedule from '../schedule/schedule'
import memoryUtils  from '../../utils/memoryUtils'

const { Sider, Content } = Layout;


export default class Admin extends Component {
  render () {
    const user = memoryUtils.user
    if( !user || user._id ) {
      return <Redirect to='/login' />
    }
    return(
      <Layout style={{height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <HeaderNav/>
          
          <Content style={{ marginTop: 100 }}>
            <Switch>
              <Route path='/user' component={User}/>
              <Route path='/home' component={Home} />
              <Route path='/doctor' component={Doctor} />
              <Route path='/department' component={Department} />
              <Route path='/report' component={Report} />
              <Route path='/record' component={Record} />
              <Route path='/schedule' component={Schedule} />
              <Redirect to='/home' />
            </Switch>
          </Content>

        </Layout>
      </Layout>
    )
  }
}