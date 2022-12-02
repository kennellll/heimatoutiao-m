export default {
  namespaced: true,
  state: () => {
    // 用户信息
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  mutations: {
    // 修改用户信息
    setUser (state, data) {
      state.user = data
      // 本地持久化
      localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {

  }
}
