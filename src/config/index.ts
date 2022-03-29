/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import { message } from 'antd'
import store from '../store'

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = (msg: any) => {
  message.warning(msg)
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const ToLogin = () => {
  window.location.hash = '/login'
}
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number, other: any) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      ToLogin()
      tip('未登录或登录已过期，请重新登录')
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('登陆过期，请重新登录')
      sessionStorage.removeItem('token')
      setTimeout(() => {
        ToLogin()
      }, 1000)
      break
    // 404请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    case 500:
      tip('服务器错误')
      break
    default:
      console.log(other)
  }
}

// 创建axios实例
let instance = axios.create({ timeout: 1000 * 12, baseURL: 'http://192.168.31.122:8086/api/v1' })
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  (config) => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = store()
    const configs = config.headers as any
    token && (configs.Authorization = token)
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (res) => {
    const ErrorCode = res.data.code
    if (res.status === 200) {
      if (ErrorCode === 0 || ErrorCode === -1) {
        return Promise.resolve(res)
      } else {
        // 获取错误信息
        const ErrorMsg = res.data.msg
        // 根据状态码进行错误处理
        errorHandle(ErrorCode, ErrorMsg)
        return Promise.reject(res)
      }
    }
  },
  // 请求失败
  (error) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.msg)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false)
      tip('网络连接失败，请检查网络设置')
      return Promise.reject(response)
    }
  }
)

export default instance
