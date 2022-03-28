import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.scss'
import http from '../../config'
import { message } from 'antd'

export default function Index() {
  const [loading, setLoading] = useState<boolean>(false)
  const onFinish = (values: any) => {
    setLoading(true)
    http
      .post('/admin', values)
      .then((res) => {
        if (res.data.code === 0) {
          message.success('登录成功')
          localStorage.setItem('token', res.data.data.token)
          window.location.hash = '/'
        } else {
          message.error(res.data.msg)
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err.data.msg)
        setLoading(false)
      })
  }

  return (
    <div className='login'>
      <div className='login-box'>
        <div className='login-title'>欢迎来到登录页面</div>
        <div className='login-tooltip'>电子化管理顾客水疗信息</div>
        <Form name='basic' onFinish={onFinish} autoComplete='off'>
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: '请输入用户名！'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='请输入用户名'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: '请输入密码！'
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='请输入密码'
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block loading={loading}>
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <p className='footer'>
        Copyright © 2022 flysch. Powered by <a href='https://flysch.cn'>flysch.cn</a>
      </p>
    </div>
  )
}
