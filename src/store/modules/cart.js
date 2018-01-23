import { set } from 'lodash'

const cart = {
  state: {
    cart: null
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
    }
  },

  actions: {

  }
}

export default cart
