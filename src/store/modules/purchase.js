import * as firebase from 'firebase'
import { set, get } from 'lodash'
import { normalizeObjectsToArrayById } from '@/utils/firebase'

const purchase = {
  state: {
    loadedStorePurchases: null
  },
  mutations: {
    SET_LOADED_STORE_PURCHASES: (state, purchases) => {
      set(state, 'loadedStorePurchases', purchases)
    }
  },
  actions: {
    async insertNewPurchase({ commit }, newPurchase) {
      await firebase.database().ref('purchases').push(newPurchase)
    },
    async fetchStorePurchases({ commit }) {
      const snapshot = await firebase.database().ref('purchases').once('value')
      const purchasesData = snapshot.val()
      const purchases = normalizeObjectsToArrayById(purchasesData)
      const albumPromises = await purchases.map(async purchase => {
        const albumId = get(purchase, 'albumId')
        const albumSnapshot = await firebase.database().ref('albums').child(albumId).once('value')
        const album = albumSnapshot.val()
        set(purchase, 'albumData', album)
      })
      await Promise.all(albumPromises)
      commit('SET_LOADED_STORE_PURCHASES', purchases)
    }
  }
}

export default purchase
