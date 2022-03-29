import React, { useEffect } from 'react'
import http from '../../config'
import 'moment/locale/zh-cn'
import moment from 'moment'
import { Avatar, Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UsergroupDeleteOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons'
import './index.scss'
import { Link, Outlet } from 'react-router-dom'
const { Header, Sider, Content, Footer } = Layout
moment.locale('zh-cn')
export default function Home() {
  const [collapsed, setCollapsed] = React.useState(false)
  useEffect(() => {
    http
      .get('/user/1')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.data.msg)
      })
  }, [])
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>电子化管理顾客水疗信息</div>
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['chart']}>
          <Menu.Item key='chart' icon={<HomeOutlined />}>
            <Link to='/chart'>首页</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<UsergroupDeleteOutlined />}>
            <Link to='/user'>用户信息</Link>
          </Menu.Item>
          <Menu.Item key='3' icon={<SettingOutlined />}>
            <Link to='/setting'>设置</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed)
          })}
          <div className='top-nav'>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <span className='top-name'>管理员</span>
          </div>
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Copyright © 2022 flysch. Powered by <a href='https://flysch.cn'>flysch.cn</a>
        </Footer>
      </Layout>
    </Layout>
  )
}
