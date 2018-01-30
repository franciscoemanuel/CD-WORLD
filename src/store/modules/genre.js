import * as firebase from 'firebase'
import { set } from 'lodash'

const purchase = {
  state: {
    loadedGenres: null
  },
  mutations: {
    SET_LOADED_GENRES: (state, genres) => {
      set(state, 'loadedGenres', genres)
    }
  },
  actions: {
    async fetchGenres({ commit }) {
      const snapshot = await firebase.database().ref('genres').once('value')
      const genres = snapshot.val()
      commit('SET_LOADED_GENRES', genres)
    }
  }
}

export default purchase
