import Vue from 'vue'
import VueRouter from 'vue-router'

const Recommend = (resolve) => {
  import('../components/recommend/recommend').then((module) => {
    resolve(module)
  })
}

const Singer = (resolve) => {
  import('../components/singer/singer').then((module) => {
    resolve(module)
  })
}

const Rank = (resolve) => {
  import('../components/rank/rank').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('../components/search/search').then((module) => {
    resolve(module)
  })
}

const SingerDetail = (resolve) => {
  import('../components/singer-detail/singer-detail').then((module) => {
    resolve(module)
  })
}
const Disc = (resolve) => {
  import('../components/disc/disc').then((module) => {
    resolve(module)
  })
}

const TopList = (resolve) => {
  import('../components/top-list/top-list').then((module) => {
    resolve(module)
  })
}

const UserCenter = (resolve) => {
  import('../components/user-center/user-center').then((module) => {
    resolve(module)
  })
}

const Login = (resolve) => {
  import('../components/login/login').then((module) => {
    resolve(module)
  })
}

const Register = (resolve) => {
  import('../components/register/register').then((module) => {
    resolve(module)
  })
}

import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name:'recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Disc
      }
    ]
  },
  {
    path: '/singer',
    name:'singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/rank',
    name:'rank',
    component: Rank,
    children: [
      {
        path: ':id',
        component: TopList
      }
    ]
  },
  {
    path: '/search',
    name:'search',
    component: Search,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      auth: true
    },
    component: UserCenter
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.auth){
    if(store.state.token){
      next()
    }else{
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      })
    }
  }else{
    next()
  }
})

export default router
