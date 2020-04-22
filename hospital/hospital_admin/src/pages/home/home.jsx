import React, { Component } from "react";

import { Layout } from 'antd';
const { Content } = Layout;


export default class Home extends Component {
  
  render () {
    return(
      <Layout style={{height: 685 }}>
        <Content style={{margin: 10, background: '#fff'}}>Home</Content>
      </Layout>
    )
  }
}