import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import './permission'
import './styles/font-awesome.scss' // font-awesome icons
import * as firebase from 'firebase'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCmbCHXzwHqWbloK-Rd0l5hykreEPvM02I',
      authDomain: 'cd-world.firebaseapp.com',
      databaseURL: 'https://cd-world.firebaseio.com',
      projectId: 'cd-world',
      storageBucket: 'cd-world.appspot.com'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        // this.$store.dispatch('fetchUserData')
      }
    })
  }
})
