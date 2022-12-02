import Vue from 'vue'
import Vuex from 'vuex'
// 引用getters模块
import getters from './getters'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user
  }
})
