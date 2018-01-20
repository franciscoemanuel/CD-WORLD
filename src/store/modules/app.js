import Cookies from 'js-cookie'
import { getMenuItems } from '../../utils/menuItems'
import { get } from 'lodash'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    loading: false,
    menuItems: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LOADING: (state, isLoading) => {
      state.loading = isLoading
    },
    SET_MENU_ITEMS: (state, menuItems) => {
      state.menuItems = menuItems
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    LoadMenuItems({ commit }, user) {
      const userRoles = get(user, 'roles')
      const menuItems = getMenuItems(userRoles)
      commit('SET_MENU_ITEMS', menuItems)
    }
  }
}

export default app
