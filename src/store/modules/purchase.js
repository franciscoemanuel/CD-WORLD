import { get, set } from 'lodash'

const purchase = {
  state: {
    cart: {
      albums: [],
      totalPrice: 0.0
    }
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
      const albumToRemove = state.cart.albums.indexOf(album => album.id === albumId)
      state.cart.albums.splice(albumToRemove, 1)
    }
  },

  actions: {
    addToCart: ({ commit }, album) => {
      album.subTotal = album.price
      commit('ADD_ALBUM_TO_CART', album)
    },
    calculateTotalPrice: ({ commit, getters }, albumPrice) => {
      const totalPrice = getters.cart.totalPrice + albumPrice
      commit('SET_TOTAL_PRICE', totalPrice)
    },
    recalculateSubTotal: ({ commit, getters }, album) => {
      const newSubTotal = (album.quantity * album.price)
      const albumId = get(album, 'id')
      commit('UPDATE_ALBUM_SUBTOTAL', { albumId, newSubTotal })
    },
    removeFromCart: ({ commit }, albumToRemove) => {
      const albumId = get(albumToRemove, 'id')
      commit('REMOVE_FROM_CART', albumId)
    }
  }
}

export default purchase
