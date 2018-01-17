import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getAuthenticatedUserId } from '@/utils/auth'

const whiteList = ['/login', '/cadastro']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getAuthenticatedUserId()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          next()
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('Não foi possível recuperar informações do usuário')
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
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
