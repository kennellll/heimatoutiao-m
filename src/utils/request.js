import axios from 'axios'

import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    // if (store.getters.token) {
    //   // token失效则清除token等个人信息并且跳到登录页
    //   if (IsCheckTimeOut()) {
    //     store.dispatch('user/logout')
    //     router.push('/login')
    //     return Promise.reject(new Error('token已失效'))
    //   }
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['Authorization'] = `Bearer ${store.getters.token}`
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  // 响应成功
  response => {
    // 解构一层data，方便后续调用
    const { message, data } = response.data
    // 响应成功提示
    Toast.success('操作成功')
    if (message === 'OK') {
      // 直接返回解构后的数据
      return data
    } else {
      // 弹错误提示

      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 当服务端通知token失效时，删除token和个人信息,error.response.data.code得知token是否失效
    if (error.response && error.response.data) {
      Toast.fail('操作失败')
      // store.dispatch('user/logout')
      // router.push('/login')
      console.log(error.response.data.message)
    } else {
      // 弹错误提示
      console.log(error.response.data.message)
    }
    // 返回错误对象
    return Promise.reject(error)
  }
)

export default request
