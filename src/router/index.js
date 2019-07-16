import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/',
      component: () => import('@/views/login')
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('@/views/home')
    }

  ]
})
