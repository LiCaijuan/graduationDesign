import React, { Component } from "react";
import axios from 'axios'
import locale from 'antd/es/date-picker/locale/zh_CN';
import { Layout, Table, Button, Modal, Input, DatePicker, message, Form } from 'antd';
import './index.css'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { Content } = Layout;
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
export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      editVisible: false,
      scheduleList: [],
      doctorId: 0,
      depertmentId: 0,
      scheduleDate: '',
      interval: '',
      columns: [
        {
          title: '排班编号',
          dataIndex: 'scheduleId',
          key: 'scheduleId',
          align: 'center',
          fixed: 'left',
          width: 80
        },{
          title: '医生编号',
          dataIndex: 'doctorId',
          key: 'doctorId',
          width: 100,
          align: 'center'
        },{
          title: '科室编号',
          dataIndex: 'departmentId',
          width: 180,
          key: 'departmentId',
          align: 'center'
        },{
          title: '日期',
          dataIndex: 'scheduleDate',
          key: 'scheduleDate',
          width: 150, 
          align: 'center',
        },{
          title: '时段',
          dataIndex: 'interval',
          key: 'interval',
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
              <a style={{ marginRight: 16 }} onClick={()=>this.showEditModal(record.scheduleId)}>编辑</a>
              <a onClick = {() => this.showDeleteConfirm(record.scheduleId)}>删除</a>
            </span>
          ),
        },
      ]
    }
  }

  componentDidMount() {
    this.getScheduleList()
  }

  success = (msg) => {
    message.success(msg);
  };
  error = (msg) => {
    message.error(msg);
  };

  showDeleteConfirm = (scheduleId) => {
    confirm({
      title: '确定删除此条排班信息吗？',
      icon: <ExclamationCircleOutlined />,
      content: '该操作无法撤回',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.deleteSchedule(scheduleId)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  getScheduleList = () => {
    axios.post('/getScheduleList')
    .then((res) => {
      this.setState({
        scheduleList: res.result
      })
    })
  }

  deleteSchedule = (scheduleId) => {
    axios.post('/api/deleteSchedule', {
      scheduleId: scheduleId
    }).then((res) => {
      if(res.code === 1){
        this.success(res.msg)
      }else{
        this.error(res.msg)
      }
      this.getScheduleList()
    }).catch((err) => {
      console.log(err)
    })
  }

  addSchedule = () => {
    console.log(this.state.scheduleDate, 'date')
    if (this.state.doctorId !== 0 && this.state.departmentId !== 0 && this.state.scheduleDate !== '' && this.state.interval !== ''){
      axios.post('/api/addSchedule', {
        doctorId: this.state.doctorId,
        departmentId: this.state.depertmentId,
        scheduleDate: this.state.scheduleDate,
        interval: this.state.interval
      }).then((res) => {
        if(res.code === 1){
          this.success(res.msg)
        }else{
          this.error(res.msg)
        }
        this.getScheduleList()
      }).catch((err)=> {
        console.log(err)
      })
      this.hideModal()
    } else {
      this.error('请完善输入信息')
    }
  }
  updateSchedule = () => {
    console.log('update')
  }
  showEditModal = (scheduleId) => {
    axios.post('getScheduleByScheduleId', {
      scheduleId: scheduleId
    }).then((res) => {
      if(res.code === 1){
        this.success(res.msg)
        console.log(res)
      }else{
        this.error(res.msg)
      }
    }).catch((err) => {
      console.log(err)
    })
    this.setState({
      editVisible: true
    })
  }
  hideEditModal = () => {
    this.setState ({
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
    });
  };
  p = (s) => {
    return s < 10 ? '0' + s : s
  }
  render () {
    return(
      <Layout>
        <Content style={{margin: 10, background: '#fff'}}>
          <div>
            <Table
              columns={this.state.columns}
              dataSource={this.state.scheduleList}
              bordered
              rowKey={record => record.scheduleId}
              title={() => <Button type="primary" size='large' onClick={this.showModal}>添加排班</Button> }
              style={{margin: 20 }}/>
          </div>
          <div>
            <Modal
              title="添加排班"
              visible={this.state.visible}
              destroyOnClose={true}
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
                  label="医生编号"
                  name="doctorId"
                  rules={[
                    {
                      required: true,
                      message: '医生编号不能为空!',
                    },
                  ]}
                >
                  <Input style={{ width: 180 }} onChange={e => this.setState({doctorId: e.target.value})} />
                </Form.Item>
                <Form.Item
                  label="科室编号"
                  name="departmentId"
                  rules={[
                    {
                      required: true,
                      message: '科室编号不能为空!',
                    },
                  ]}
                >
                  <Input  style={{ width: 180 }} onChange={e => this.setState({departmentId: e.target.value})} />
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
                    style={{ width: 180 }}
                    locale={locale}
                    onChange={value => this.setState({scheduleDate: value._d.getFullYear()+'-'+this.p((value._d.getMonth()+1))+'-'+this.p(value._d.getDate())})} 
                  />
                </Form.Item>
                <Form.Item
                  label="时段"
                  name="interval"
                  rules={[
                    {
                      required: true,
                      message: '时段不能为空!',
                    },
                  ]}
                >
                  <Input style={{width:180}} onChange={e => this.setState({interval: e.target.value})} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" style={{marginRight: '20px'}} onClick={this.addSchedule}>
                    确认
                  </Button>
                  <Button htmlType="button" style={{marginLeft: '20px'}} onClick={this.hideModal}>
                    取消
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div>
            <Modal
              title="编辑排班"
              visible={this.state.editVisible}
              destroyOnClose={true}
              footer={null}
              onCancel={this.hideEditModal}
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
                  label="医生编号"
                  name="doctorId"
                  rules={[
                    {
                      required: true,
                      message: '医生编号不能为空!',
                    },
                  ]}
                >
                  <Input style={{ width: 180 }} onChange={e => this.setState({doctorId: e.target.value})} />
                </Form.Item>
                <Form.Item
                  label="科室编号"
                  name="departmentId"
                  rules={[
                    {
                      required: true,
                      message: '科室编号不能为空!',
                    },
                  ]}
                >
                  <Input  style={{ width: 180 }} onChange={e => this.setState({departmentId: e.target.value})} />
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
                    style={{ width: 180 }}
                    locale={locale}
                    onChange={value => this.setState({scheduleDate: value._d.getFullYear()+'-'+this.p((value._d.getMonth()+1))+'-'+this.p(value._d.getDate())})} 
                  />
                </Form.Item>
                <Form.Item
                  label="时段"
                  name="interval"
                  rules={[
                    {
                      required: true,
                      message: '时段不能为空!',
                    },
                  ]}
                >
                  <Input style={{width:180}} onChange={e => this.setState({interval: e.target.value})} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" style={{marginRight: '20px'}} onClick={this.updateSchedule}>
                    确认
                  </Button>
                  <Button htmlType="button" style={{marginLeft: '20px'}} onClick={this.hideEditModal}>
                    取消
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Content>
      </Layout>
    )
  }
}