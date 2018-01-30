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
    loadAlbums({ commit }) {
      const albumsRef = firebase.database().ref('albums')
      return new Promise((resolve, reject) => {
        albumsRef.on('value', snapshot => {
          const data = snapshot.val()
          const albums = normalizeObjectsToArrayById(data)
          commit('SET_LOADED_ALBUMS', albums)
          resolve()
        })
      })
    },
    async updateAlbumDate({ commit }, albumToUpdate) {
      const { id } = albumToUpdate
      await firebase.database().ref('albums').child(id).update(albumToUpdate)
    },
    async removeAlbum({ commit }, albumToRemove) {
      const { id } = albumToRemove
      await firebase.database().ref('albums').child(id).remove()
    },
    async insertNewAlbum({ commit }, albumToInsert) {
      const newAlbum = await firebase.database().ref('albums').push(albumToInsert)
      return newAlbum.key
    }
  }
}

export default album
