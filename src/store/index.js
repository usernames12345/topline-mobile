// 1.npm i vuex
// 2.配置
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 3.创建容器实例
const store = new Vuex.Store({
  //  容器的状态（驱动视图更新的数据）
  state: {
   // 初始化的时候从本地存储获取用户信息（里面欧token内容）
   user: JSON.parse(window.localStorage.getItem('user'))
  },
  // 容器的methods 用来修改state的状态
  mutations: {
    setUser (state, user) {
      state.usezar = user
      // 持久化到本地存储，防止页面数据丢失
      window.localStorage.setItem('user',JSON.stringify(state.user))
    }
  },
  actions: {

  }
})
// 4.导出容器
export default store
// 在main.js中将store配置到vue实例的store中
