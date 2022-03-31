import { Button, Descriptions, Divider, Form, Input,message } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import http from '../../config'
import './Setting.scss'
import { useState } from 'react'
export default function Setting() {
  const [loading, setLoading] = useState<boolean>(false)
  const onFinish = (values: any) => {
    setLoading(true)
    http
      .put('/admin', values)
      .then((res) => {
        if (res.data.code === 0) {
          message.success('修改成功')
          sessionStorage.removeItem('token')
          window.location.hash = '/login'
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
    <>
      <Descriptions title='管理员信息'>
        <Descriptions.Item label='用户名'>admin</Descriptions.Item>
        <Descriptions.Item label='创建时间'>2020-01-01</Descriptions.Item>
        <Descriptions.Item label='上次更新时间'>2020-01-01</Descriptions.Item>
        <Descriptions.Item label='店名'>重百沙坪坝玩奢专柜</Descriptions.Item>
        <Descriptions.Item label='Address'>重庆市沙坪坝区小龙坎新街77号</Descriptions.Item>
      </Descriptions>
      <Divider orientation='left'>修改密码</Divider>
      <Form name='normal_login' className='login-form' onFinish={onFinish} autoComplete='off'>
        <Form.Item name='password' rules={[{ required: true, message: '请输入旧密码！' }]}>
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='旧密码'
          />
        </Form.Item>
        <Form.Item
          name='newpassword'
          rules={[
            { required: true, message: '请输入新密码！' },
            { min: 8, message: '密码长度不能小于8位' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='新密码'
          />
        </Form.Item>
        <Form.Item
          name='rnewpassword'
          dependencies={['newpassword']}
          rules={[
            { required: true, message: '请输入新密码！' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newpassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次输入的密码不一致！'))
              }
            })
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='再次输入新密码'
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            block
            loading={loading}
          >
            确认修改
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
