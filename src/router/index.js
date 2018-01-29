import Vue from 'vue'
import Router from 'vue-router'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
 title: 'title'               the name show in submenu and breadcrumb (recommend set)
 icon: 'svg-name'             the icon show in the sidebar,
}
**/
export const constantRouterMap = [
  { path: '*', component: () => import('@/views/404'), hidden: true },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/cadastro',
    component: () => import('@/views/signUp/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/loja'
  },

  {
    path: '/loja',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Loja',
        component: () => import('@/views/shop/index'),
        meta: { title: 'Loja' }
      }
    ]
  },

  {
    path: '/carrinho',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Carrinho',
        component: () => import('@/views/cart/index'),
        meta: { title: 'Carrinho' }
      }
    ]
  },

  {
    path: '/perfil',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Perfil',
        component: () => import('@/views/profile/index'),
        meta: { title: 'Meu perfil' }
      }
    ]
  },

  {
    path: '/minhas-compras',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'minhas-compras',
        component: () => import('@/views/purchases/index'),
        meta: { title: 'Minhas compras' }
      }
    ]
  },

  {
    path: '/gerente/estoque',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'estoque',
        component: () => import('@/views/manager/stock/index'),
        meta: { title: 'Estoque' }
      }
    ]
  },

  {
    path: '/gerente/relatorios',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'relatorios',
        component: () => import('@/views/manager/reports/index'),
        meta: { title: 'Relatórios' }
      }
    ]
  }

]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
