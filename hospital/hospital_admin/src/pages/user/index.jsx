import React, { Component } from "react";
import axios from 'axios'
import { Layout, Table, Modal, message } from 'antd';
import './index.css'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Content } = Layout;
const columns = [
  {
    title: '编号',
    dataIndex: 'orderId',
    key: 'orderId',
    fixed: 'left',
    width: 60,
    align: 'center'
  },{
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
    fixed: 'left',
    width: 90,
    align: 'center'
  },{
    title: '号码',
    dataIndex: 'userPhone',
    key: 'userPhone',
    width: 120,
    align: 'center'
  }
];
const pagination = {
  pageSize: 8
};
export default class Record extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: []
    }
  }

  componentDidMount() {
    this.getUserList()
  }

  success = (msg) => {
    message.success(msg);
  };
  error = (msg) => {
    message.error(msg);
  };

  getUserList = () => {
    axios.post('/getUserList')
      .then((res) => {
        this.setState({
          userList: res.result
        })
        console.log(this.state.userList)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render () {
    return(
      <Layout>
        <Content style={{margin: 10, background: '#fff'}}>
          <div>
            <Table
              columns={columns}
              dataSource={this.state.userList}
              bordered
              rowKey={user => user.userId}
              style={{margin: 20 }}
              pagination={pagination}
            />
          </div>
        </Content>
      </Layout>
    )
  }
}