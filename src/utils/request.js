import axios from 'axios'
import router from '@/router'
import store from '@/store'
import storage from 'store'
import { Notification, Message } from 'ant-design-vue'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 60000
})
// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const status = error.response.status
    const data = error.response.data
    const url = error.response.config.url
    const whiteList = ['userLogin', 'getLogout', 'getMyUserInfo']

    if (status === 500 && !whiteList.some(v => url.indexOf(v) > -1)) { // 当500错误，且接口不在白名单里时，跳转至500页
      router.push('/500')
    } else if (status !== 200) {
      Notification.error({
        message: `[${status}] ${url}`,
        description: data.message || data.msg,
        duration: process.env.NODE_ENV === 'production' ? 6 : 0
      })
    }
  }
  return Promise.reject(error)
}

// 请求拦截器
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN) || 'null'
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, errorHandler)

// 响应拦截器
request.interceptors.response.use((res) => {
  res = res.data

  const codePrefix = res.code.substring(0, 1) // code前缀

  if (codePrefix === 'M') {
    Message.success(res.msg)
  } else if (codePrefix === 'S') {
    // 成功类code，不弹框
  } else {
    Notification.error({
      message: res.code,
      description: res.msg,
      duration: 6
    })
  }
  if (!['M', 'S'].includes(codePrefix)) { // code不以M或S开头时，一律视为失败返回码
    switch (res.code) {
      case 'ACCOUNT_006': // 用户未登录
        store.dispatch('Logout').then(() => {
          router.push('/user/login')
        })
        break
      default:
        break
    }
    return Promise.reject(res)
  } else {
    return res
  }
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
