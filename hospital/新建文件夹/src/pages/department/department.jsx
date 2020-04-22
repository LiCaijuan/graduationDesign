import React, { Component } from "react";
import axios from 'axios'
import { Layout, Table, Button, Modal, Input, message, Form } from 'antd';
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
export default class Department extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      departmentList: [],
      departmentName: '',
      departmentImg: '',
      departmentAddress: '',
      departmentSpeciality: '',
      departmentDesc: '',
      columns: [
        {
          title: '科室编号',
          dataIndex: 'departmentId',
          key: 'departmentId',
          align:'center',
          fixed: 'left',
          width: 70
        },{
          title: '名称',
          dataIndex: 'departmentName',
          key: 'departmentName',
          
          width: 80,
          align: 'center'
        },{
          title: '地址',
          dataIndex: 'departmentAddress',
          width: 100,
          key: 'departmentAddress',
          align: 'center'
        },{
          title: '照片',
          dataIndex: 'departmentImg',
          key: 'departmentImg',
          width: 130,
          align: 'center',
        },{
          title: '擅长',
          dataIndex: 'departmentSpeciality',
          key: 'departmentSpeciality',
          width: 250,
          align: 'center',
        },{
          title: '简介', 
          dataIndex: 'departmentDesc',
          key: 'departmentDesc',
          align: 'center',
          width: 250
        },{
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 80,
          align: 'center',
          render: (text, record) => (
            <span>
              <a style={{ marginRight: 16 }}>编辑</a>
              <a onClick={() => this.showDeleteConfirm(record.departmentId)}>删除</a>
            </span>
          ),
        },
      ]
    }
  }
  componentDidMount () {
    this.getDepartmentList()
  }

  success = (msg) => {
    message.success(msg);
  };
  error = (msg) => {
    message.error(msg);
  };

  showDeleteConfirm = (departmentId) =>{
    confirm({
      title: '确定删除此条科室信息吗？',
      icon: <ExclamationCircleOutlined />,
      content: '该操作无法撤回',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.deleteDepartment(departmentId)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  getDepartmentList = () => {
    axios.post('/api/getDepartmentList')
    .then((res)=>{
      this.setState({
        departmentList: res.result
      })
      console.log(this.state.departmentList, 'depList')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  deleteDepartment = (departmentId) => {
    axios.post('/api/deleteDepartment',{
      departmentId: departmentId
    }).then((res) => {
      if(res.code === 1){
        this.success(res.msg)
      }else{
        this.error(res.msg)
      }
      this.getDepartmentList()
    }).catch((err) => {
      console.log(err)
    })
  }

  addDepartment = () => {
    if (this.state.departmentName !=='' && this.state.departmentImg !=='' && this.state.departmentAddress !=='' && this.state.departmentSpeciality !=='' && this.state.departmentDesc !=='') {
      axios.post('/api/addDepartment',{
        departmentName: this.state.departmentName,
        departmentImg: this.state.departmentImg,
        departmentAddress: this.state.departmentAddress,
        departmentSpeciality: this.state.departmentSpeciality,
        departmentDesc: this.state.departmentDesc,
      }).then((res) => {
        if(res.code === 1){
          this.success(res.msg)
        }else{
          this.error(res.msg)
        }
        this.getDepartmentList()
      }).catch((err) => {
        console.log(err)
      })
      this.hideModal()
    } else {
      this.error('请完善输入信息')
    }
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
              dataSource={this.state.departmentList}
              bordered
              rowKey={record => record.departmentId}
              title={() => <Button type="primary" size='large' onClick={this.showModal}>添加科室</Button> }
              style={{margin: 20 }}/>
          </div>
          <div>
            {/* <Button type="primary" onClick={this.showModal}>
              Modal
            </Button> */}
            <Modal
              title="添加科室"
              visible={this.state.visible}
              footer={null}
              destroyOnClose={true}
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
                  label="科室名称"
                  name="departmentName"
                  rules={[
                    {
                      required: true,
                      message: '科室名称不能为空!',
                    },
                  ]}
                >
                  <Input style={{ width: 180 }} onChange={e => this.setState({departmentName: e.target.value})} />
                </Form.Item>
                <Form.Item
                  label="科室地址"
                  name="departmentAddress"
                  rules={[
                    {
                      required: true,
                      message: '科室地址不能为空!',
                    },
                  ]}
                >
                  <Input onChange={e => this.setState({departmentAddress: e.target.value})} />
                </Form.Item>
                <Form.Item
                  label="科室图片"
                  name="departmentImg"
                  rules={[
                    {
                      required: true,
                      message: '科室图片不能为空!',
                    },
                  ]}
                >
                  <TextArea row={2} onChange={e => this.setState({departmentImg: e.target.value})} />
                </Form.Item>
                
                <Form.Item
                  label="擅长"
                  name="departmentSpeciality"
                  rules={[
                    {
                      required: true,
                      message: '擅长内容不能为空!',
                    },
                  ]}
                >
                  <TextArea onChange={e => this.setState({departmentSpeciality: e.target.value})} />
                </Form.Item>
                <Form.Item
                  label="科室简介"
                  name="departmentDesc"
                  rules={[
                    {
                      required: true,
                      message: '科室简介不能为空!',
                    },
                  ]}
                >
                  <TextArea row={3} onChange={e => this.setState({departmentDesc: e.target.value})} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" style={{marginRight: '10px'}} onClick={this.addDepartment}>
                    确认
                  </Button>
                  <Button htmlType="button" style={{marginLeft: '10px'}} onClick={this.hideModal}>
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