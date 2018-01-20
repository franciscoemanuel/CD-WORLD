import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { getUserFromLocalStorage } from '@/utils/auth'
const whiteList = ['/login', '/cadastro']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getUserFromLocalStorage()) {
    if (whiteList.includes(to.path)) {
      next({ path: '/' })
    } else {
      if (!store.getters.user) store.dispatch('AutoSignIn', getUserFromLocalStorage())
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
