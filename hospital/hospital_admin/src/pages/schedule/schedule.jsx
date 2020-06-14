import React, { Component } from "react";
import axios from 'axios'
import moment from 'moment'
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
const pagination = {
  pageSize: 8
};
function disabledDate(current) {
  return current && current < moment().endOf('day');
}
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
              <a style={{ marginRight: 16 }} onClick={()=>this.showEditModal(record)}>编辑</a>
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
    if (this.state.doctorId !== 0 && this.state.departmentId !== 0 &&this.state.scheduleDate !== '' &&this.state.interval !== '') {
      axios.post('/updateSchedule',{
        scheduleId: this.state.scheduleId,
        doctorId: this.state.doctorId,
        departmentId: this.state.departmentId,
        scheduleDate: this.state.scheduleDate,
        interval: this.state.interval
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
      this.hideEditModal()
    } else {
      this.error('请完善输入信息')
    }
    this.setState({
      scheduleId: 0,
      doctorId: 0,
      departmentId: 0,
      scheduleDate: '',
      interval: ''
    })
  }
  showEditModal = (record) => {
    this.setState({
      scheduleId: record.scheduleId,
      doctorId: record.doctorId,
      departmentId: record.departmentId,
      scheduleDate: record.scheduleDate,
      interval: record.interval,
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
  };
  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
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
              style={{margin: 20 }}
              pagination={pagination}
            />
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
                    disabledDate={this.disabledDate}
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
                  <Button type="primary" htmlType="submit" style={{marginLeft: '-60px', marginRight: '20px'}} onClick={this.addSchedule}>
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
              title="更新排班"
              destroyOnClose={true}
              visible={this.state.editVisible}
              onCancel={this.hideEditModal}
              onOk={this.updateSchedule}
              okText="确认"
              cancelText="取消"
            >
              <label for="doctorId" style={{marginLeft: '120px'}}>医生编号：</label>
              <Input
                defaultValue={this.state.doctorId}
                style={{width: '180px'}}
                id="doctorId"
                onChange={e => this.setState({doctorId: e.target.value})}
              /><br/><br/>
              <label for="departmentId" style={{marginLeft: '120px'}}>科室编号：</label>
              <Input
                id="departmentId"
                defaultValue={this.state.departmentId}
                style={{width: '180px'}}
                onChange={e => this.setState({departmentId: e.target.value})}
              /><br/><br/>
              <label for="scheduleDate" style={{marginLeft: '120px'}}>日期：</label>
              <DatePicker
                id="scheduleDate"
                locale={locale}
                disabledDate={disabledDate}
                style={{width: '180px', marginLeft: '28px'}}
                // defaultValue={this.state.date}
                onChange={value => this.setState({scheduleDate: value._d.getFullYear() + '-' + this.p((value._d.getMonth() + 1)) + '-' + this.p(value._d.getDate())})}
              /><br/><br/>
              <label for="interval" style={{marginLeft: '120px'}}>时段：</label>
              <Input
                id="interval"
                defaultValue={this.state.interval}
                style={{width: '180px', marginLeft: '28px'}}
                onChange={e => this.setState({interval: e.target.value})}
              />
            </Modal>
          </div>
        </Content>
      </Layout>
    )
  }
}