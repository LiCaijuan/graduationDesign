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

function showDeleteConfirm(orderId) {
  confirm({
    title: '确定删除此条预约记录吗？',
    icon: <ExclamationCircleOutlined />,
    content: '该操作无法撤回',
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      axios.post('/api/deleteOrder', {
        orderId: orderId
      }).then((res) => {
        alert(res.msg)
      }).catch((err)=>{
        console.log(err)
      })
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}
export default class Record extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recordList: []
    }
  }

  componentDidMount() {
    this.getRecordList()
  }

  success = (msg) => {
    message.success(msg);
  };
  error = (msg) => {
    message.error(msg);
  };

  getRecordList = () => {
    axios.post('/getOrderList')
      .then((res) => {
        this.setState({
          recordList: res.result
        })
        console.log(this.state.recordList)
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
              dataSource={this.state.recordList}
              bordered
              rowKey={record => record.recordId}
              style={{margin: 20 }}
              pagination={pagination}
            />
          </div>
        </Content>
      </Layout>
    )
  }
}