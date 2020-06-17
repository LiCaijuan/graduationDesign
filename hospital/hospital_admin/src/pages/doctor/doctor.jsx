import React, { Component } from "react";
import axios from 'axios'
import { Layout, Table, Tag, Button, Modal, Input, Select, message, Form } from 'antd';
import './index.css'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Content } = Layout;
const { Option } = Select;
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
const paginationProps = {
  pageSize: 8
};

export default class Doctor extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      editVisible: false,
      doctorList: [],
      // 新增数据
      doctorId: 0,
      doctorName: '',
      doctorDepartment: '',
      doctorPrice: 0,
      doctorImg: '',
      doctorType: 0,
      doctorIsOrder: 0,
      doctorSpeciality: '',
      doctorSynopsis: '',
      columns: [
        {
          title: '医生编号',
          dataIndex: 'doctorId',
          key: 'doctorId',
          align: 'center',
          fixed: 'left',
          width: 70
        },{
          title: '姓名',
          dataIndex: 'doctorName',
          key: 'doctorName',
          width: 70,
          fixed: 'left',
          align: 'center'
        },{
          title: '科室',
          dataIndex: 'doctorDepartment',
          width: 100,
          key: 'doctorDepartment',
          align: 'center'
        },{
          title: '职称',
          dataIndex: 'doctorType',
          key: 'doctorType',
          width: 100,
          align: 'center',
          render: (text, record) => (
            <span>{record.doctorType===1?'主任医师':record.doctorType===2?'副主任医师':record.doctorType===3?'主治医师':'住院医师'}</span>
          )
        },{
          title: '挂号费',
          dataIndex: 'doctorPrice',
          key: 'doctorPrice',
          width: 80,
          align: 'center'
        },{
          title: '预约情况',
          key: 'doctorIsOrder',
          dataIndex: 'doctorIsOrder',
          width: 100,
          align: 'center',
          render: (text, record) => (
            <span>
              <Tag color="magenta">{record.doctorIsOrder===0?'不可预约':'可预约'}</Tag>
            </span>
          )
        },{
          title: '擅长',
          dataIndex: 'doctorSpeciality',
          key: 'doctorSpeciality',
          width: 400,
          align: 'center',
          ellipsis: true
        },{
          title: '简介', 
          dataIndex: 'doctorSynopsis',
          key: 'doctorSynopsis',
          align: 'center',
          width: 400,
          ellipsis: true
        },{
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 110,
          align: 'center',
          render: (text, record) => (
            <span>
              <a style = {{marginRight: 16 }} onClick={()=>this.showEditModal(record)}>编辑</a>
              <a onClick={() => this.showDeleteConfirm(record.doctorId)}>删除</a>
            </span>
          ),
        },
      ]
    };
    
  }
    
  componentDidMount() {
    this.getDoctorList()
  }
  success = (msg) => {
    message.success(msg);
  };
  error = (msg) => {
    message.error(msg);
  };
  showDeleteConfirm = (doctorId) => {
    confirm({
      title: '确定删除此条医生信息吗？',
      icon: <ExclamationCircleOutlined />,
      content: '该操作无法撤回',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.deleteDoctor(doctorId)
      },
      onCancel() {
        console.log('Cancel');
      },
      
    });
  };
  deleteDoctor = (doctorId) => {
    axios.post('/api/deleteDoctor',{
      doctorId: doctorId
    }).then((res) => {
      if(res.code === 1){
        this.success(res.msg)
      }else{
        this.error(res.msg)
      }
      this.getDoctorList()
    }).catch((err)=>{
      console.log(err)
    })
  }
  addDoctor = () => {
    console.log(this.state.doctorName, 'test', this.state.doctorDepartment, this.state.doctorSpeciality, this.state.doctorIsOrder, this.state.doctorSynopsis)
    if (this.state.doctorName !=='' && this.state.doctorDepartment !=='' && this.state.doctorImg !=='' && this.state.doctorSpeciality !=='' && this.state.doctorSynopsis !=='') {
      axios.post('/api/addDoctor', {
        doctorName: this.state.doctorName,
        doctorDepartment: this.state.doctorDepartment,
        doctorPrice: this.state.doctorPrice,
        doctorImg: this.state.doctorImg,
        doctorType: this.state.doctorType,
        doctorIsOrder: this.state.doctorIsOrder,
        doctorSpeciality: this.state.doctorSpeciality,
        doctorSynopsis: this.state.doctorSynopsis
      }).then((res) => {
        if(res.code === 1){
          this.success(res.msg)
        }else{
          this.error(res.msg)
        }
        this.getDoctorList()
      }).catch((err) => {
        console.log(err)
      })
      this.hideModal()
    } else {
      this.error('请完善输入信息')
    }
  }
  deleteDoctor = (doctorId) => {
    axios.post('/api/deleteDoctor',{
      doctorId: doctorId
    })
    .then((res) => {
      if(res.code === 1){
        this.success(res.msg)
      }else{
        this.error(res.msg)
      }
      this.getDoctorList()
    })
    .catch((err) => {
      console.log(err)
    })
  }
  updateDoctor = () => {
    if (this.state.doctorName !=='' && this.state.doctorDepartment !=='' && this.state.doctorImg !=='' && this.state.doctorSpeciality !=='' && this.state.doctorSynopsis !=='') {
      axios.post('/api/updateDoctor', {
        doctorId: this.state.doctorId,
        doctorName: this.state.doctorName,
        doctorDepartment: this.state.doctorDepartment,
        doctorPrice: this.state.doctorPrice,
        doctorImg: this.state.doctorImg,
        doctorType: this.state.doctorType,
        doctorIsOrder: this.state.doctorIsOrder,
        doctorSpeciality: this.state.doctorSpeciality,
        doctorSynopsis: this.state.doctorSynopsis
      }).then((res) => {
        if(res.code === 1){
          this.success(res.msg)
        }else{
          this.error(res.msg)
        }
        this.getDoctorList()
      }).catch((err) => {
        console.log(err)
      })
      this.hideEditModal()
    } else {
      this.error('请完善输入信息')
    }
  }
  getDoctorList = () => {
    axios.post('/api/getDoctorList')
    .then((res) => {
      this.setState({
        doctorList: res.result
      })
      console.log(this.state.doctorList, 'doctList')
    })
    .catch((err) => {
      console.log(err, 'err')
    })
  }

  showEditModal = (record) => {
    this.setState({
      doctorId: record.doctorId,
      doctorName: record.doctorName,
      doctorDepartment: record.doctorDepartment,
      doctorPrice: record.doctorPrice,
      doctorImg: record.doctorImg,
      doctorType: record.doctorType,
      doctorIsOrder: record.doctorIsOrder,
      doctorSpeciality: record.doctorSpeciality,
      doctorSynopsis: record.doctorSynopsis,
      editVisible: true
    })
    // console.log(record, 'record')
  }
  hideEditModal = () => {
    this.setState({
      editVisible: false,
      doctorId: 0,
      doctorName: '',
      doctorDepartment: '',
      doctorPrice: 0,
      doctorImg: '',
      doctorType: 0,
      doctorIsOrder: 0,
      doctorSpeciality: '',
      doctorSynopsis: ''
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
  
  render () {
    return(
      <Layout>
        <Content style={{margin: 10, background: '#fff'}}>
          <div>
            <Table
              columns={this.state.columns}
              dataSource={this.state.doctorList}
              bordered
              scroll={{ x: 1800}}
              rowKey={record => record.doctorId}
              title={() => <Button type="primary" size='large' onClick={this.showModal}>添加医生</Button> }
              style={{margin: 15 }}
              pagination={ paginationProps }
            />
          </div>
          <div>
            <Modal
              title="添加医生"
              visible={this.state.visible}
              footer ={null}
              onCancel={this.hideModal}
              destroyOnClose={true}
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
                  label="医生姓名"
                  name="doctorName"
                  rules={[
                    {
                      required: true,
                      message: '医生姓名不能为空!',
                    },
                  ]}
                >
                  <Input style={{ width: 180 }} onChange={e => this.setState({doctorName: e.target.value})} />
                </Form.Item>
                <Form.Item
                  label="科室"
                  name="doctorDepartment"
                  rules={[
                    {
                      required: true,
                      message: '科室不能为空!',
                    },
                  ]}
                >
                  <Input style={{ width: 180 }} onChange={e => this.setState({doctorDepartment: e.target.value})} />
                </Form.Item>
                <Form.Item
                  label="职称"
                  name="doctorType"
                  rules={[
                    {
                      required: true,
                      message: '职称不能为空!',
                    },
                  ]}
                >
                  <Select defaultValue="1" style={{ width: 180 }} onChange={value => this.setState({doctorType: value})}>
                    <Option value="1">主任医师</Option>
                    <Option value="2">副主任医师</Option>
                    <Option value="3">主治医师</Option>
                    <Option value="4">住院医师</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="挂号费"
                  name="doctorPrice"
                  rules={[
                    {
                      required: true,
                      message: '挂号费不能为空!',
                    },
                  ]}
                >
                  <Input style={{ width: 180 }} onChange={e => this.setState({doctorPrice: e.target.value})} />
                </Form.Item>
                <Form.Item
                  label="预约情况"
                  name="doctorIsOrder"
                  rules={[
                    {
                      required: true,
                      message: '预约情况不能为空!',
                    },
                  ]}
                >
                  <Select defaultValue="1" style={{ width: 180 }} onChange={value => this.setState({doctorIsOrder: value})}>
                    <Option value="0">不可预约</Option>
                    <Option value="1">可预约</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="医生照片"
                  name="doctorImg"
                  rules={[
                    {
                      required: true,
                      message: '医生照片不能为空!',
                    },
                  ]}
                >
                  <TextArea onChange={e => this.setState({doctorImg: e.target.value})} />
                </Form.Item>
                <Form.Item
                  label="擅长"
                  name="doctorSpeciality"
                  rules={[
                    {
                      required: true,
                      message: '擅长内容不能为空!',
                    },
                  ]}
                >
                  <TextArea onChange={e => this.setState({doctorSpeciality: e.target.value})} />
                </Form.Item>
                <Form.Item
                  label="简介"
                  name="doctorSynopsis"
                  rules={[
                    {
                      required: true,
                      message: '简介内容不能为空!',
                    },
                  ]}
                >
                  <TextArea onChange={e => this.setState({doctorSynopsis: e.target.value})} />
                </Form.Item>
                
                <Form.Item {...tailLayout}>
                  <Button type="primary" style={{marginRight: '20px'}} onClick={this.addDoctor}>
                    确认
                  </Button>
                  <Button htmlType="button" style={{marginLeft: '20px'}} onClick={this.hideModal}>
                    取消
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="更新医生"
              destroyOnClose={true}
              visible={this.state.editVisible}
              onCancel={this.hideEditModal}
              onOk={this.updateDoctor}
              okText="确认"
              cancelText="取消"
            >
              <label for="doctorName">医生姓名：</label>
              <Input
                id="doctorName"
                defaultValue={this.state.doctorName}
                style={{ width: 250}}
                onChange={e => this.setState({doctorName: e.target.value})}
              /><br/><br/>
              <label for="doctorDepartment">所属科室：</label>
              <Input
                id="doctorDepartment"
                style={{ width: 250 }}
                defaultValue={this.state.doctorDepartment}
                onChange={e => this.setState({doctorDepartment: e.target.value})}
              /><br/><br/>
              <label for="doctorType">医生职称：</label>
              <Select
                id="doctorType"
                defaultValue={this.state.doctorType.toString()}
                style={{ width: 250 }}
                onChange={value => this.setState({doctorType: value})}
              >
                <Option value="1">主任医师</Option>
                <Option value="2">副主任医师</Option>
                <Option value="3">主治医师</Option>
                <Option value="4">住院医师</Option>
              </Select><br/><br/>
              <label for="doctorPrice">挂号价格：</label>
              <Input
                id="doctorPrice"
                defaultValue={this.state.doctorPrice}
                style={{ width: 250 }}
                onChange={e => this.setState({doctorPrice: e.target.value})}
              /><br/><br/>
              <label for="doctorIsOrder">预约情况：</label>
              <Select
                id="doctorIsOrder"
                defaultValue={this.state.doctorIsOrder.toString()}
                style={{ width: 250 }}
                onChange={value => this.setState({doctorIsOrder: value})}
              >
                <Option value="0">不可预约</Option>
                <Option value="1">可预约</Option>
              </Select><br/><br/>
              <label for="doctorImg">医生照片：</label>
              <TextArea
                id="doctorImg"
                defaultValue={this.state.doctorImg}
                onChange={e => this.setState({doctorImg: e.target.value})}
                style={{ width: 480 }}
              /><br/><br/>
              <label for="doctorSpeciality">擅长：</label>
              <TextArea
                id="doctorSpeciality"
                defaultValue={this.state.doctorSpeciality}
                onChange={e => this.setState({doctorSpeciality: e.target.value})}
                style={{ width: 480, marginLeft:28}}
              /><br/><br/>
              <label for="doctorSynopsis">简介：</label>
              <TextArea
                id="doctorSynopsis"
                defaultValue={this.state.doctorSynopsis}
                onChange={e => this.setState({doctorSynopsis: e.target.value})}
                style={{width: 480, marginLeft: 28}}
              />
            </Modal>
          </div>
        </Content>
      </Layout>
    )
  }
}