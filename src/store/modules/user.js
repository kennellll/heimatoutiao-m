import { getItem, setItem } from '@/utils/storage.js'
// 命名存储用户信息的名字
const USER_KEY = 'TOUTIAO_USER'
export default {
  namespaced: true,
  state: () => {
    // 用户信息
    return {
      user: getItem(USER_KEY)
    }
  },
  mutations: {
    // 修改用户信息
    setUser (state, data) {
      state.user = data
      // 本地持久化
      setItem(USER_KEY, state.user)
    }
  },
  actions: {

  }
}
