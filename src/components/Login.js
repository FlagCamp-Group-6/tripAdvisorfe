import { Button, Form, Input, message, Modal, Space, Row, Col } from 'antd'
import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login, register } from '../utils'
 
function Login({ handleLoginSuccess }) {
    const formRef = React.createRef();
    const [displayModal, setDisplayModal] = useState(false)
 
  const handleCancel = () => {
    setDisplayModal(false)
  }
 
  const signinOnClick = () => {
    setDisplayModal(true)
  }
 
  const onFinish = () => {
    console.log("finish form");
  };

  const handleLogin = async() => {
    const formInstance = formRef.current;
 
    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    try {
      console.log(formInstance.getFieldsValue(true));
        const resp = await login(formInstance.getFieldsValue(true));
        setDisplayModal(false);
        message.success("Welcome back");
        handleLoginSuccess(resp.token);
    } catch (error) {
        message.error(error.message);
    }
  }

  const handleRegister = async() => {
    const formInstance = formRef.current;
 
    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    try {
        const resp = await register(formInstance.getFieldsValue(true));
        setDisplayModal(false)
        message.success("`Register Successfully")
    } catch (error) {
        message.error(error.message);
    }
  }
 
  return (
    <>
      <Button shape="round" onClick={signinOnClick} style={{ marginRight: '20px' }}>
        Login
      </Button>
      <Modal
        title="Log in"
        visible={displayModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="normal_login"
          onFinish={onFinish}
          preserve={false}
          ref={formRef}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Space>
          <Button
            onClick={handleLogin}
            shape="round"
            type="primary"
            htmlType="submit"           
          >
            Log in
          </Button>
          <Button
            onClick={handleRegister}
            shape="round"
            type="primary"
          >
            Register
          </Button>
          </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
 
export default Login