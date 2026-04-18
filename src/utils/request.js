/* 封装axios用于发送请求 */
import axios from 'axios'
import { Toast, Dialog } from 'vant'
import { getInfo, removeInfo } from '@/utils/storage'
import router from '@/router'
// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'https://www.chandev.top/api',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '请求中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  // 在发送请求之前做些什么
  const token = getInfo()?.token?.access || ''// 获取本地存储的Token

  if (token) {
    // Django JWT认证要求的格式：Authorization: Bearer <token>
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Toast.clear()
  return response.data
}, function (error) {
  // 对响应错误做点什么
  console.log(error)

  Toast.clear()
  if (!error.response) {
    Toast.fail('网络异常，请稍后重试')
    return new Promise(() => {}) // 卡住，不抛异常
  }
  if (error.response && error.response.status === 401) {
    Toast.clear()

    Dialog.confirm({
      title: '温馨提示',
      message: '您还未登录，请重新登录后再试',
      cancelButtonText: '再逛逛',
      confirmButtonText: '去登录'
    })
      .then(() => {
        removeInfo()
        router.replace({
          path: '/login',
          query: {
            backUrl: router.history.current.fullPath
          }
        })
      })
      .catch(() => {
        router.replace('/home')
      })
    return new Promise(() => {})
  }
  return Promise.reject(error)
})

export default request
