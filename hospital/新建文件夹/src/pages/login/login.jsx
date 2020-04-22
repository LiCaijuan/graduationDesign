import React, { Component } from "react";
import { reqLogin } from "../../api";
import './index.css'
import memoryUtils from '../../utils/memoryUtils'
import { Form, Input, Button, Checkbox } from 'antd';
import { Redirect } from "react-router-dom";

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
const onFinish = async(values) => {
  console.log('Success:', values);
  
  // 解构赋值
  const { username, password } = values
  try{
    const response = await reqLogin(username, password)
    console.log(response.data)
    const user = response.data
    memoryUtils.user = user

    this.PaymentResponse.history.replcae('/')
  } catch (error) {
  }
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

export default class Login extends Component {
  
  render () {
    // 如果用户已经登陆，自动跳转到admin
    const user = memoryUtils.user
    if(user && user._id) {
      return <Redirect to="/" />
    }

    return(
      <div className="login">
        <div className="main">
          <div className="tip">预约挂号后台管理</div>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },{
                  max: 12, message: '用户名不超过12位'
                }, {
                  min: 4, message: '用户名不少于4位'
                }, {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: '用户名必须由英文、数字、下划线组成'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Please input your password!',
                }, {
                  min: 6,
                  message: '密码不少于4位'
                }, {
                  max: 16,
                  message: '密码不多于16位'
                }, {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: '用户名必须由英文、数字、下划线组成'
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
// 调用接口
// const {username, password} = values
// reqLogin(username,password).then(response => {

// }).catch(error =>{

// })

// async加在这层函数外面
// const {username, password} = values
    // try{
    //     const response = await reqLogin(username,password)
    //     console.log(response.data)
    // } catch (error) {

    // }
