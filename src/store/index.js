import Vue from 'vue'
import Vuex from 'vuex'
import { SET_LOGIN_USER, SET_LOADING_STATUS } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoaded: false,
    loginUser: null
  },
  mutations: {
    [SET_LOADING_STATUS] (state, val) {
      // eslint-disable-next-line
      state.isLoaded = val
    },
    [SET_LOGIN_USER] (state, user) {
      // eslint-disable-next-line
      state.loginUser = user
    }
  },
  actions: {
  },
  modules: {
  }
})
