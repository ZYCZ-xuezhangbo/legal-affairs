import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import grid from './modules/grid'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    grid
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
