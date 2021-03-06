import React, { Component } from "react";
import axios from 'axios'
import { Layout, Table, Button, Modal, Input, message, Form } from 'antd';
// import { Resizable } from 'react-resizable';
import './index.css'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Content } = Layout;
const { TextArea } = Input;
const paginationProps = {
  pageSize: 8
};

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
export default class Department extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      editVisible: false,
      departmentList: [],
      departmentId: 0,
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
          width: 85
        },{
          title: '名称',
          dataIndex: 'departmentName',
          key: 'departmentName',
          width: 90,
          fixed: 'left',
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
          width: 250,
          align: 'center',
          ellipsis: true,
        },{
          title: '擅长',
          dataIndex: 'departmentSpeciality',
          key: 'departmentSpeciality',
          width: 480,
          align: 'center',
          ellipsis: true,
        },{
          title: '简介', 
          dataIndex: 'departmentDesc',
          key: 'departmentDesc',
          align: 'center',
          width: 500,
          ellipsis: true,
        },{
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 120,
          align: 'center',
          render: (text, record) => (
            <span>
              <a style={{ marginRight: 16 }} onClick={()=> this.showEditModal(record)}>编辑</a>
              <a onClick={() => this.showDeleteConfirm(record.departmentId)}>删除</a>
            </span>
          ),
        },
      ]
    }
  }
  componentDidMount () {
    this.getDepartmentList()
    this.getTitle()
  }
  getTitle = () => {
    const path = this.props.location.pathname
    console.log(path, 'path')
  };

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
  updateDepartment = () => {
    if(this.state.departmentName !=='' && this.state.departmentImg !=='' && this.state.departmentAddress !=='' && this.state.departmentSpeciality !=='' && this.state.departmentDesc !=='') {
      axios.post('/api/updateDepartment', {
        departmentId: this.state.departmentId,
        departmentName: this.state.departmentName,
        departmentImg: this.state.departmentImg,
        departmentAddress: this.state.departmentAddress,
        departmentSpeciality: this.state.departmentSpeciality,
        departmentDesc: this.state.departmentDesc
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
      this.hideEditModal()
    } else {
      this.error('请完善输入信息')
    }
  }

  showEditModal = (record) => {
    this.setState({
      departmentId: record.departmentId,
      departmentName: record.departmentName,
      departmentImg: record.departmentImg,
      departmentAddress: record.departmentAddress,
      departmentSpeciality: record.departmentSpeciality,
      departmentDesc: record.departmentDesc,
      editVisible: true
    })
  }
  hideEditModal = () => {
    this.setState({
      editVisible: false,
      departmentId: 0,
      departmentName: '',
      departmentImg: '',
      departmentAddress: '',
      departmentSpeciality: '',
      departmentDesc: '',
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
  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };
  render () {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    return(
      <Layout>
        <Content style={{margin: 10, background: '#fff'}}>
          <div>
            <Table
              columns={this.state.columns}
              // components={this.components}
              dataSource={this.state.departmentList}
              bordered
              scroll={{ x: 1800}}
              rowKey={record => record.departmentId}
              title={() => <Button type="primary" size='large' onClick={this.showModal}>添加科室</Button> }
              style={{margin: 15 }}
              pagination={ paginationProps }
              pagination={pagination}
            />
          </div>
          <div>
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
            <Modal
              title="更新科室"
              visible={this.state.editVisible}
              destroyOnClose={true}
              onCancel={this.hideEditModal}
              onOk={this.updateDepartment}
              okText="确认"
              cancelText="取消"
            >
              <label for="departmentName" >科室名称：</label>
              <Input
                id="departmentName"
                style={{ width: 180 }}
                defaultValue={this.state.departmentName}
                onChange={e => this.setState({departmentName: e.target.value})}
              /><br/><br/>
              <label for="departmentAddress">科室地址：</label>
              <Input
                id="departmentAddress"
                style={{ width: 480 }}
                defaultValue={this.state.departmentAddress}
                onChange={e => this.setState({departmentAddress: e.target.value})}
              /><br/><br/>
              <label for="departmentImg" >科室图片：</label>
              <TextArea
                id="departmentImg"
                style={{ width: 480}}
                row={2}
                defaultValue={this.state.departmentImg}
                onChange={e => this.setState({departmentImg: e.target.value})}
              /><br/><br/>
              <label for="departmentSpeciality" >擅长：</label>
              <TextArea
                id="departmentSpeciality"
                style={{ width: 480, marginLeft: '28px' }}
                defaultValue={this.state.departmentSpeciality}
                onChange={e => this.setState({departmentSpeciality: e.target.value})}
              /><br/><br/>
              <label for="departmentDesc" >科室简介：</label>
              <TextArea
                id="departmentDesc"
                style={{ width: 480 }}
                row={3}
                defaultValue={this.state.departmentDesc}
                onChange={e => this.setState({departmentDesc: e.target.value})}
              />
            </Modal>
          </div>
        </Content>
      </Layout>
    )
  }
}