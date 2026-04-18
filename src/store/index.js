import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import cart from '@/store/modules/cart'
import address from '@/store/modules/address'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    token (state) {
      return state.user.userToken.token
    },
    cartTotal (state) {
      return state.cart.cart_total
    }
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    user,
    cart,
    address
  }
})
