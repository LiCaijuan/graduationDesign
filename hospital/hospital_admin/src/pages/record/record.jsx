import React, { Component } from "react";
import axios from 'axios'
import { Layout, Table, Modal, message } from 'antd';
import './index.css'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Content } = Layout;
const pagination = {
  pageSize: 8
};
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
  },
  {
    title: '身份证号',
    dataIndex: 'userCard',
    key: 'userCard',
    width: 180,
    align: 'center',
  },{
    title: '医生',
    dataIndex: 'doctorName',
    key: 'doctorName',
    width: 100,
    align: 'center',
  },{
    title: '医生职称',
    dataIndex: 'doctorType',
    key: 'doctorType',
    fixed: 'left',
    width: 130,
    align: 'center',
    render: (text, record) => (
      <span>{record.doctorType===1?'主任医师':record.doctorType===2?'副主任医师':record.doctorType===3?'主治医师':'住院医师'}</span>
    ),
  },{
    title: '科室', 
    dataIndex: 'departmentName',
    key: 'departmentName',
    align: 'center',
    width: 100
  },{
    title: '科室地址',
    dataIndex: 'address',
    width: 200,
    key: 'address',
    align: 'center'
  },{
    title: '日期', 
    dataIndex: 'orderDate',
    key: 'orderDate',
    align: 'center',
    width: 130
  },{
    title: '时段', 
    dataIndex: 'interval',
    key: 'interval',
    align: 'center',
    width: 130
  },{
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 110,
    align: 'center',
    render: (text, record) => (
      <span>
        <a onClick={()=>showDeleteConfirm(record.orderId)}>删除</a>
      </span>
    ),
  },
];

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