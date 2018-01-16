const user = {
  state: {
    id: '',
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
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        if (username !== 'admin' && password !== 'admin') reject('Usuário incorreto')
        commit('SET_ID', 'SjJg6eIAmIQmtp9LukGhzgOxjgO2')
        commit('SET_NAME', 'teste')
        commit('SET_EMAIL', 'teste@teste.com')
        resolve()
      })
    },

    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ID', 'SjJg6eIAmIQmtp9LukGhzgOxjgO2')
        commit('SET_NAME', 'teste')
        commit('SET_EMAIL', 'teste@teste.com')
        resolve({})
      })
    },

    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ID', '')
        commit('SET_NAME', '')
        commit('SET_EMAIL', '')
      })
    },

    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        resolve()
      })
    }
  }
}

export default user
