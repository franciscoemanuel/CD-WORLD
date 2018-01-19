import * as firebase from 'firebase'
import { getMenuItems } from '../../utils/menuItems'
import { setLocalStorageUser, removeUserFromLocalStorage } from '@/utils/auth'
import { get } from 'lodash'

const user = {
  state: {
    user: null
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ID: (state, id) => {
      if (state.user) state.id = id
    },
    SET_NAME: (state, name) => {
      if (state.user) state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      if (state.user) state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      if (state.user) state.roles = roles
    },
    SET_EMAIL: (state, email) => {
      if (state.user) state.email = email
    },
    SET_MENU_ITEMS: (state, menuItems) => {
      if (state.user) state.menuItems = menuItems
    }
  },

  actions: {
    async Login({ commit }, userInfo) {
      const email = userInfo.email.trim()
      const password = userInfo.password
      const registeredUser = await firebase.auth().signInWithEmailAndPassword(email, password)
      const appUser = {
        id: registeredUser.uid,
        email: registeredUser.email,
        name: registeredUser.displayName
      }
      commit('SET_USER', appUser)
      setLocalStorageUser(user)
    },

    async FetchUserData({ commit, getters }) {
      const userId = get(getters.user, 'id')
      const data = await firebase.database().ref('users').child(userId).once('value')
      const userData = data.val()
      const userRoles = userData.roles || []
      commit('SET_ROLES', userRoles)
    },

    LoadMenuItems({ commit, getters }) {
      const userRoles = get(getters.user, 'roles')
      const menuItems = getMenuItems(userRoles)
      commit('SET_MENU_ITEMS', menuItems)
    },

    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        firebase.auth().signOut()
        commit('SET_USER', null)
        removeUserFromLocalStorage()
        resolve({})
      })
    },

    async SignUp({ commit }, user) {
      const createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      await createdUser.updateProfile({ displayName: user.username })
      const newUser = { id: createdUser.uid, roles: ['customer'] }
      return firebase.database().ref('users').child(newUser.id).set(newUser)
    },

    AutoSignIn({ commit }, registeredUser) {
      commit('SET_LOADING', true)
      commit('SET_ID', registeredUser.uid)
      commit('SET_EMAIL', registeredUser.email)
      commit('SET_NAME', registeredUser.displayName)
      commit('SET_LOADING', false)
    }
  }
}

export default user
