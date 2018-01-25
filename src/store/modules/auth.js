import * as firebase from 'firebase'
import { removeUserFromLocalStorage } from '@/utils/auth'
import { get, set } from 'lodash'

const user = {
  state: {
    user: null
  },

  mutations: {
    SET_USER: (state, user) => {
      set(state, 'user', user)
    },
    SET_ID: (state, id) => {
      set(state, 'user.id', id)
    },
    SET_NAME: (state, name) => {
      set(state, 'user.name', name)
    },
    SET_AVATAR: (state, avatar) => {
      set(state, 'user.avatar', avatar)
    },
    SET_ROLES: (state, roles) => {
      set(state, 'user.roles', roles)
    },
    SET_EMAIL: (state, email) => {
      set(state, 'user.email', email)
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
    },

    async FetchUserData({ commit, getters }) {
      const userId = get(getters.user, 'id')
      const data = await firebase.database().ref('users').child(userId).once('value')
      const userData = data.val()
      const userRoles = userData.roles || []
      commit('SET_ROLES', userRoles)
    },

    LogOut({ commit, state }) {
      firebase.auth().signOut()
      commit('SET_USER', null)
      removeUserFromLocalStorage()
    },

    async SignUp({ commit }, user) {
      const createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      await createdUser.updateProfile({ displayName: user.username })
      const newUser = { id: createdUser.uid, roles: ['customer'] }
      return firebase.database().ref('users').child(newUser.id).push(newUser)
    },

    AutoSignIn({ commit }, localStorageUser) {
      commit('SET_USER', localStorageUser)
    }
  }
}

export default user
