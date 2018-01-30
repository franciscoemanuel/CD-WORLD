import { get, set, sumBy, findIndex, pick } from 'lodash'
import * as firebase from 'firebase'
import { normalizeObjectsToArrayById } from '@/utils/firebase'
import * as shortid from 'shortid'

const purchase = {
  state: {
    cart: {
      albums: [],
      totalPrice: 0.0
    },
    userPurchases: [],
    loadedSales: []
  },
  mutations: {
    SET_CART: (state, cart) => {
      set(state, 'cart', cart)
    },
    SET_ALBUMS: (state, albums) => {
      set(state, 'cart.albums', albums)
    },
    SET_TOTAL_PRICE: (state, totalPrice) => {
      set(state, 'cart.totalPrice', totalPrice)
    },
    ADD_ALBUM_TO_CART: (state, album) => {
      state.cart.albums.push(album)
    },
    UPDATE_ALBUM_SUBTOTAL: (state, { albumId, newSubTotal }) => {
      const album = state.cart.albums.find(album => album.id === albumId)
      album.subTotal = newSubTotal
    },
    REMOVE_FROM_CART: (state, albumId) => {
      const albums = get(state.cart, 'albums')
      const albumToRemove = findIndex(albums, album => album.id === albumId)
      state.cart.albums.splice(albumToRemove, 1)
    },
    SET_USER_PURCHASES: (state, userPurchases) => {
      set(state, 'userPurchases', userPurchases)
    },
    SET_LOADED_SALES: (state, loadedSales) => {
      set(state, 'loadedSales', loadedSales)
    }
  },

  actions: {
    addToCart({ commit }, album) {
      album.subTotal = album.sellingPrice
      commit('ADD_ALBUM_TO_CART', album)
    },
    calculateTotalPrice({ commit, getters }, albumPrice) {
      const albums = get(getters.cart, 'albums')
      const totalPrice = sumBy(albums, 'subTotal')
      commit('SET_TOTAL_PRICE', totalPrice)
    },
    recalculateSubTotal({ commit, getters }, album) {
      const newSubTotal = (album.quantity * album.sellingPrice)
      const albumId = get(album, 'id')
      commit('UPDATE_ALBUM_SUBTOTAL', { albumId, newSubTotal })
    },
    removeFromCart({ commit }, albumToRemove) {
      const albumId = get(albumToRemove, 'id')
      commit('REMOVE_FROM_CART', albumId)
    },
    async checkoutPurchase({ commit, getters }) {
      const cart = getters.cart
      const { totalPrice } = cart
      const purchaseDate = new Date().toISOString()
      const userId = getters.user.id
      const albums = cart.albums.map(album => pick(album, ['id', 'quantity', 'subTotal']))
      const status = 'enviado'
      const shortId = shortid.generate()
      const newPurchase = { userId, albums, totalPrice, status, shortId, purchaseDate }
      await firebase.database().ref('sales').push(newPurchase)
    },
    cleanCart({ commit }) {
      const emptyCart = { albums: [], totalPrice: 0.0 }
      commit('SET_CART', emptyCart)
    },
    async fetchUserPurchases({ commit, getters }) {
      const userId = get(getters.user, 'id')
      const purchaseData = (await firebase.database().ref('sales').orderByChild('userId').equalTo(userId).once('value')).val()
      const userPurchases = normalizeObjectsToArrayById(purchaseData)
      commit('SET_USER_PURCHASES', userPurchases)
    },
    async fetchPurchase({ commit }, purchaseId) {
      const purchaseData = (await firebase.database().ref('sales').child(purchaseId).once('value')).val()
      purchaseData.id = purchaseId
      const albumsPromises = purchaseData.albums.map(async album => {
        const albumData = (await firebase.database().ref('albums').child(album.id).once('value')).val()
        return { ...albumData, ...album }
      })
      const albums = await Promise.all(albumsPromises)
      set(purchaseData, 'albums', albums)
      return purchaseData
    },
    async fetchSales({ commit }) {
      const snapshot = await firebase.database().ref('sales').once('value')
      const salesData = snapshot.val()
      const sales = normalizeObjectsToArrayById(salesData)
      commit('SET_LOADED_SALES', sales)
    }
  }
}

export default purchase
