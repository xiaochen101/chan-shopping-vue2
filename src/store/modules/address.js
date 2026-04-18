import { getAddressList } from '@/api/address'
export default {
  namespaced: true,
  state () {
    return {
      addressList: []
    }
  },
  mutations: {
    setaddressList (state, newList) {
      state.addressList = newList
    }
  },
  actions: {
    async getaddressActions (context) {
      const { data } = await getAddressList()
      context.commit('setaddressList', data)
    }
  },
  getters: {}
}
