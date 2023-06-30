import Vue from 'vue'
import Router from 'vue-router'
import Register from '../components/Reguser.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Mains from '../components/Main.vue'
import VideoList from '../components/VideoList.vue'
import Search from '../components/Search.vue'
import Play from '../components/Play.vue'
import Dianying from '../components/dianying.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },

    {
      path: '/home',
      component: Home,
      redirect: '/mains',
      children: [
        {
          path: '/mains',
          component: Mains,
          redirect: '/videolist',
          children: [{ path: '/videolist', component: VideoList }]
        },
        { path: '/search', component: Search },
        { path: '/play', component: Play },
        { path: '/dianying', component: Dianying },
        { path: '/zongyi', component: Dianying },
        { path: '/dongman', component: Dianying },
        { path: '/dongzuopian', component: Dianying },
        { path: '/xijupian', component: Dianying },
        { path: '/aiqingpian', component: Dianying },
        { path: '/kehuanpian', component: Dianying },
        { path: '/kongbupian', component: Dianying },
        { path: '/juqingpian', component: Dianying },
        { path: '/zhanzhengpian', component: Dianying },
        { path: '/guochanju', component: Dianying },
        { path: '/gangtaiju', component: Dianying },
        { path: '/rihanju', component: Dianying },
        { path: '/oumeiju', component: Dianying }

      ]
    }
  ]
})

// 挂载路由导航卫士
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  if (to.path === '/login' || to.path === '/register' || to.path === '/play') return next()
  // 获取 token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
