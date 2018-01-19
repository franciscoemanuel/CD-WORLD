import * as firebase from 'firebase'
import { getMenuItems } from '../../utils/menuItems'

const user = {
  state: {
    id: '',
    name: '',
    avatar: '',
    roles: [],
    email: '',
    menuItems: []
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_MENU_ITEMS: (state, menuItems) => {
      state.menuItems = menuItems
    }
  },

  actions: {
    async Login({ commit }, userInfo) {
      const email = userInfo.email.trim()
      const password = userInfo.password
      const registeredUser = await firebase.auth().signInWithEmailAndPassword(email, password)
      commit('SET_ID', registeredUser.uid)
      commit('SET_EMAIL', registeredUser.email)
      commit('SET_NAME', registeredUser.displayName)
    },

    async FetchUserData({ commit, getters }) {
      commit('SET_LOADING', true)
      const userId = getters.userId
      const data = await firebase.database().ref('users').child(userId).once('value')
      const userData = data.val()
      const userRoles = userData.roles || []
      commit('SET_ROLES', userRoles)
      commit('SET_LOADING', false)
    },

    LoadMenuItems({ commit, getters }) {
      const userRoles = getters.roles
      const menuItems = getMenuItems(userRoles)
      commit('SET_MENU_ITEMS', menuItems)
    },

    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        firebase.auth().signOut()
        commit('SET_ID', null)
        commit('SET_EMAIL', null)
        commit('SET_NAME', null)
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
