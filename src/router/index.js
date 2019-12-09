import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout.vue'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: Layout,
    redirect: '/index'
  },
  {
    path: '/index',
    component: Layout,
    children: [{
      path: '/',
      name: 'index',
      component: () => import('@/views/index/index.vue')
    }],
    meta: {
      title: '首页',
      index: 1
    }
  },
  {
    path: '/design',
    name: 'design',
    component: () => import('@/views/design/index.vue'),
    meta: {
      title: '定制',
      index: 2,
      istitle: true
    }
  },
  {
    path: '/shopcar',
    component: Layout,
    children: [{
      path: '/',
      name: 'shopcar',
      component: () => import('@/views/shopcar/index.vue'),
      meta: {
        title: '购物车',
        index: 3,
        istitle: true
      }
    }]
  },
  {
    path: '/mine',
    component: Layout,
    children: [{
      path: '/',
      name: 'mine',
      component: () => import('@/views/mine/index.vue'),
      meta: {
        title: '我的',
        index: 4
      }
    }]
  }
  ]
})

router.beforeEach((to, from, next) => {
  // const whiteList = ['login', 'register', 'forget']
  // if (whiteList.indexOf(to.name) === -1) {
  //   console.log(to)
  //   next({ name: 'login' })
  // }

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
