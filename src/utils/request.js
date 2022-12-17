import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  transformResponse: [function(data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return data
    }
  }],
  timeout: 5000
})

// 配置处理后端返回数据中超出 js 安全整数范围问题
// request.defaults.transformResponse = [
//   function (data) {
//     try {
//       return jsonBig.parse(data)
//     } catch (err) {
//       return {}
//     }
//   }
// ]

// 请求拦截器
request.interceptors.request.use(
  config => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    if (store.getters.userInfo) {
      //   // token失效则清除token等个人信息并且跳到登录页
      //   if (IsCheckTimeOut()) {
      //     store.dispatch('user/logout')
      //     router.push('/login')
      //     return Promise.reject(new Error('token已失效'))
      //   }
      //   // let each request carry token
      //   // ['X-Token'] is a custom headers key
      //   // please modify it according to the actual situation
      config.headers.Authorization = `Bearer ${store.getters.userInfo.token}`
    }
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
    Toast.success('数据刷新成功')
    if (message === 'OK') {
      // 直接返回解构后的数据
      return data
    } else {
      // 弹错误提示

      return Promise.reject(new Error(message))
    }
  },
  error => {
    Toast.fail('操作失败')
    // 当服务端通知token失效时，删除token和个人信息
    if (error.response && error.response.status === 401) {
      store.commit('user/setUser', {})
      router.push('/login')
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
