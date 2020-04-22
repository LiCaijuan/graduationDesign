import React, { Component } from "react";
import axios from 'axios'
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { Layout, Table, Button, Modal, Input, message, DatePicker, Form } from 'antd';
import './index.css'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Content } = Layout;
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const { RangePicker } = DatePicker;

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      editVisible: false,
      reportList: [],
      reportId: 0,
      username: '',
      department: '',
      date: '',
      reportUrl: '',
      report: [],
      columns: [
        {
          title: '报告编号',
          dataIndex: 'reportId',
          key: 'reportId',
          align: 'center',
          fixed: 'left',
          width: 80
        },{
          title: '患者姓名',
          dataIndex: 'username',
          key: 'username',
          width: 100,
          align: 'center'
        },{
          title: '科室',
          dataIndex: 'department',
          key: 'department',
          width: 180,
          align: 'center'
        },{
          title: '日期',
          dataIndex: 'date',
          key: 'date',
          width: 150,
          align: 'center',
        },{
          title: '图片报告地址',
          dataIndex: 'reportUrl',
          key: 'reportUrl',
          width: 200,
          align: 'center',
        },{
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 110,
          align: 'center',
          render: (text, record) => (
            <span>
              <a style={{ marginRight: 16 }} onClick={()=>{this.showEditModal(record.reportId)}}>编辑</a>
              <a onClick={() => this.showDeleteConfirm(record.reportId)}>删除</a>
            </span>
          ),
        },
      ]
    }
  }

  componentDidMount () {
    this.getReportList()
  }

  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  success = (msg) => {
    message.success(msg);
  };
  error = (msg) => {
    message.error(msg);
  };

  p = (s) => {
    return s < 10 ? '0' + s : s
  };

  showDeleteConfirm = (reportId) => {
    confirm({
      title: '确定删除此条预约记录吗？',
      icon: <ExclamationCircleOutlined />,
      content: '该操作无法撤回',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () =>{
        this.deleteReport(reportId)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  getReportList = () => {
    axios.post('/getReportList')
    .then((res) => {
      this.setState({
        reportList: res.result
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
  addReport = () => {
    if (this.state.username !== '' && this.state.department !== '' &&this.state.date !== '' &&this.state.reportUrl !== '') {
      axios.post('/api/addReport', {
        username: this.state.username,
        department: this.state.department,
        date: this.state.date,
        reportUrl: this.state.reportUrl
      }).then((res) => {
        if(res.code === 1){
          this.success(res.msg)
        }else{
          this.error(res.msg)
        }
        this.getReportList()
      }).catch((err) => {
        console.log(err)
      })
      this.hideModal()
    } else {
      this.error('请完善输入信息')
    }
  }
  deleteReport = (reportId) => {
    axios.post('/api/deleteReport', {
      reportId: reportId
    }).then((res) => {
      if(res.code === 1){
        this.success(res.msg)
      }else{
        this.error(res.msg)
      }
      this.getReportList()
    }).catch((err) => {
      console.log(err)
    })
  }
  updateReport = () => {
    console.log('update')
    if (this.state.username !== '' && this.state.department !== '' &&this.state.date !== '' &&this.state.reportUrl !== '') {
      axios.post('/updateReport',{
        reportId: this.state.reportId,
        username: this.state.username,
        department: this.state.department,
        date: this.state.date,
        reportUrl: this.state.reportUrl
      }).then((res) => {
        if(res.code === 1){
          this.success(res.msg)
        }else{
          this.error(res.msg)
        }
        this.getReportList()
      }).catch((err) => {
        console.log(err)
      })
      this.hideEditModal()
    } else {
      this.error('请完善输入信息')
    }
    this.setState({
      reportId: 0,
      username: '',
      department: '',
      date: '',
      reportUrl: ''
    })
  }
  showEditModal = (reportId) => {
    axios.post('/api/getReportById', {
      reportId: reportId
    }).then((res) => {
      console.log(res)
      this.setState({
        reportId: res.result[0].reportId,
        username: res.result[0].username,
        department: res.result[0].department,
        date: res.result[0].date,
        reportUrl: res.result[0].reportUrl,
        editVisible: true
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
  hideEditModal = () => {
    this.setState({
      editVisible: false
    })
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
      reportId: 0,
      username: '',
      department: '',
      date: '',
      reportUrl: ''
    });
  };
  
  render () {
    return(
      <Layout>
        <Content style={{margin: 10, background: '#fff'}}>
          <div>
            <Table
              columns={this.state.columns}
              dataSource={this.state.reportList}
              bordered
              rowKey={record => record.reportId}
              title={() => <Button type="primary" size='large' onClick={this.showModal}>添加报告</Button> }
              style={{margin: 20 }}/>
          </div>
          <div>
            <Modal
              title="添加报告"
              destroyOnClose={true}
              visible={this.state.visible}
              footer={null}
              onCancel={this.hideModal}
            >
              <Form
                {...layout}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="患者姓名"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '患者姓名不能为空!',
                    },
                  ]}
                >
                  <Input value={this.state.username} style={{width: '180px'}} onChange={e => this.setState({username: e.target.value})} />
                </Form.Item>
                <Form.Item
                  label="科室"
                  name="department"
                  rules={[
                    {
                      required: true,
                      message: '科室不能为空!',
                    },
                  ]}
                >
                  <Input style={{width: '180px'}} onChange={e => this.setState({department: e.target.value})} />
                </Form.Item>
                <Form.Item
                  label="日期"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: '日期不能为空!',
                    },
                  ]}
                >
                  <DatePicker
                    locale={locale}
                    style={{width: '180px'}}
                    disabledDate={disabledDate}
                    onChange={value => this.setState({date: value._d.getFullYear() + '-' + this.p((value._d.getMonth() + 1)) + '-' + this.p(value._d.getDate())})} />
                </Form.Item>
                <Form.Item
                  label="报告地址"
                  name="reportUrl"
                  rules={[
                    {
                      required: true,
                      message: '报告地址不能为空!',
                    },
                  ]}
                >
                  <TextArea onChange={e => this.setState({reportUrl: e.target.value})} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" style={{marginRight: '10px'}} onClick={this.addReport}>
                    确认
                  </Button>
                  <Button htmlType="button" style={{marginLeft: '10px'}} onClick={this.hideModal}>
                    取消
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="更新报告"
              destroyOnClose={true}
              visible={this.state.editVisible}
              onCancel={this.hideEditModal}
              onOk={this.updateReport}
              okText="确认"
              cancelText="取消"
            >
              <Input
                defaultValue={this.state.username}
                style={{width: '180px'}}
                onChange={e => this.setState({username: e.target.value})}
              />
              <Input
                defaultValue={this.state.department}
                style={{width: '180px'}}
                onChange={e => this.setState({department: e.target.value})}
              />
              <DatePicker
                locale={locale}
                disabledDate={disabledDate}
                style={{width: '180px'}}
                // defaultValue={this.state.date}
                onChange={value => this.setState({date: value._d.getFullYear() + '-' + this.p((value._d.getMonth() + 1)) + '-' + this.p(value._d.getDate())})}
              />
              <TextArea
                onChange={e => this.setState({reportUrl: e.target.value})}
                defaultValue={this.state.reportUrl}
              />
            </Modal>
          </div>
        </Content>
      </Layout>
    )
  }
}