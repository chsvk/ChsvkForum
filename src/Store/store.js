import Vue from 'vue'
import Vuex from 'vuex'

// All getters, mutatuions and actions have been moved to individual files.

import actions from './Actions'
import getters from './Getters'
import mutations from './Mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: {},
    forums: {},
    threads: {},
    posts: {},
    users: {},
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters,
  mutations,
  actions
})
