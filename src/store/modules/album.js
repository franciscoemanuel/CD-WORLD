import * as firebase from 'firebase'

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
      const albums = Object.keys(obj).map(key => {
        const album = obj[key]
        album.id = key
        return album
      })
      commit('SET_LOADED_ALBUMS', albums)
    }
  }
}

export default album
