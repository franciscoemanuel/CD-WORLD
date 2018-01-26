import * as firebase from 'firebase'
import { normalizeObjectsToArrayById } from '@/utils/firebase'

const album = {
  state: {
    loadedAlbums: []
  },

  mutations: {
    SET_LOADED_ALBUMS: (state, albums) => {
      state.loadedAlbums = albums
    }
  },

  actions: {
    async loadAlbums({ commit }) {
      const data = await firebase.database().ref('albums').once('value')
      const obj = data.val()
      const albums = normalizeObjectsToArrayById(obj)
      commit('SET_LOADED_ALBUMS', albums)
    }
  }
}

export default album
