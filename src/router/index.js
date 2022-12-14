import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  // 首页
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      }
    ]
  },
  // 问答页
  {
    path: '/qa',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'qa',
        component: () => import('@/views/qa')
      }
    ]
  },
  // 视频页
  {
    path: '/video',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'video',
        component: () => import('@/views/video')
      }
    ]
  },
  // 我的
  {
    path: '/my',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  // 搜索
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  // 文章详情
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 开启路由props传参
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
