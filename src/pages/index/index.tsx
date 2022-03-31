import React, { useEffect, useState } from 'react'
import http from '../../config'
import 'moment/locale/zh-cn'
import moment from 'moment'
import { Dropdown, Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  UserSwitchOutlined
} from '@ant-design/icons'
import './index.scss'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
const { Header, Sider, Content, Footer } = Layout
const { SubMenu } = Menu
moment.locale('zh-cn')

export default function Home() {
  const [menuKey, setMenuKey] = useState('/')
  const navigate = useNavigate()
  const pathArr = useLocation().pathname
  useEffect(() => {
    setMenuKey(pathArr)
  }, [pathArr])
  function Logout() {
    sessionStorage.removeItem('token')
    navigate('/login', { replace: true })
  }
  function handleClick(e: any) {
    setMenuKey(e.key)
  }
  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          navigate('setting')
          setMenuKey('/setting')
        }}
        key={'userSetting'}
        icon={<SettingOutlined />}
      >
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={Logout} key={'logout'} icon={<LogoutOutlined />}>
        退出登录
      </Menu.Item>
    </Menu>
  )
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>电子化管理顾客水疗信息</div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['/']}
          selectedKeys={[menuKey]}
          onClick={handleClick}
        >
          <Menu.Item key='/' icon={<HomeOutlined />}>
            <Link to='/'>首页</Link>
          </Menu.Item>
          <SubMenu key='/user' icon={<AppstoreOutlined />} title='客户管理'>
            <Menu.Item key='/userlist' icon={<UserOutlined />}>
              <Link to='/user'>客户信息</Link>
            </Menu.Item>
            <Menu.Item key='/useredit' icon={<UserSwitchOutlined />}>
              <Link to='/user'>客户管理</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='/setting' icon={<SettingOutlined />}>
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
          <Dropdown overlay={menu}>
            <div className='top-nav'>
              <UserOutlined />
              <span className='top-name'>管理员</span>
            </div>
          </Dropdown>
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
