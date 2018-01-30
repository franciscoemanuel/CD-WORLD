import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import auth from './modules/auth'
import album from './modules/album'
import sale from './modules/sale'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    auth,
    album,
    sale
  },
  getters
})

export default store
