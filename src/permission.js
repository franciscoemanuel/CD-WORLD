import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getUserFromLocalStorage } from '@/utils/auth'

const whiteList = ['/login', '/cadastro']
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log('Usuário autenticado: ' + getUserFromLocalStorage())
  if (getUserFromLocalStorage()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
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
