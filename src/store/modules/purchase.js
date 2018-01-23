import { set } from 'lodash'

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
    }
  },

  actions: {
    addToCart: ({ commit }, album) => {
      commit('ADD_ALBUM_TO_CART', album)
    },
    calculateTotalPrice: ({ commit, getters }, albumPrice) => {
      const totalPrice = getters.cart.totalPrice + albumPrice
      commit('SET_TOTAL_PRICE', totalPrice)
    }
  }
}

export default purchase
