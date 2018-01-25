import { get, set, sumBy, findIndex, pick } from 'lodash'
import * as firebase from 'firebase'

const purchase = {
  state: {
    cart: {
      albums: [],
      totalPrice: 0.0
    },
    userPurchases: []
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
    SET_USER_PURCHASES: (state, purchases) => {
      state.userPurchases = purchases
    }
  },

  actions: {
    addToCart({ commit }, album) {
      album.subTotal = album.price
      commit('ADD_ALBUM_TO_CART', album)
    },
    calculateTotalPrice({ commit, getters }, albumPrice) {
      const albums = get(getters.cart, 'albums')
      const totalPrice = sumBy(albums, 'subTotal')
      commit('SET_TOTAL_PRICE', totalPrice)
    },
    recalculateSubTotal({ commit, getters }, album) {
      const newSubTotal = (album.quantity * album.price)
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
      const newPurchase = { userId, albums, totalPrice, purchaseDate }
      await firebase.database().ref('purchases').push(newPurchase)
    },
    cleanCart({ commit }) {
      const emptyCart = { albums: [], totalPrice: 0.0 }
      commit('SET_CART', emptyCart)
    },
    async fetchUserPurchases({ commit, getters }) {
      const userId = get(getters.user, 'id')
      const purchaseData = (await firebase.database().ref('purchases').orderByChild('userId').equalTo(userId).once('value')).val()
      console.log(purchaseData)
    }
  }
}

export default purchase
