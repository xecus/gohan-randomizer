import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import store from '@/store'
import router from '@/router'
import FirebaseHelper from '@/helper/firebaseHelper'

import {
  SET_LOGIN_USER,
  SET_LOADING_STATUS
} from '@/store/mutation-types'


Vue.config.productionTip = false

store.commit(SET_LOADING_STATUS, false)
FirebaseHelper.firebaseApp.auth().onAuthStateChanged((user) => {
  console.log("[onAuthStateChanged]")
  console.log(user)
  store.commit(SET_LOGIN_USER, user)
  store.commit(SET_LOADING_STATUS, true)
})

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
