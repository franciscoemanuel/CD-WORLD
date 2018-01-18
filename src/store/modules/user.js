import { getAuthenticatedUserId, setAuthenticatedUserId, removeAuthenticatedUserId } from '@/utils/auth'
import * as firebase from 'firebase'

const user = {
  state: {
    id: getAuthenticatedUserId(),
    name: '',
    avatar: '',
    roles: [],
    email: ''
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
      setAuthenticatedUserId(user.id)
    },

    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ID', state.id)
        commit('SET_NAME', state.name)
        commit('SET_EMAIL', state.email)
        resolve({})
      })
    },

    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ID', '')
        commit('SET_NAME', '')
        commit('SET_EMAIL', '')
        removeAuthenticatedUserId()
        resolve({})
      })
    },

    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_ID', '')
        removeAuthenticatedUserId()
        resolve()
      })
    },

    async SignUp({ commit }, user) {
      const createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      await createdUser.updateProfile({ displayName: user.username })
      const newUser = { id: createdUser.uid }
      return firebase.database()
        .ref('users')
        .child(newUser.id)
        .set(newUser)
    }
  }
}

export default user
