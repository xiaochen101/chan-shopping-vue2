import { getInfo, setInfo, removeInfo } from '@/utils/storage'
import { getUserInfo, getuserAsset } from '@/api/user'
export default {
  namespaced: true,
  state () {
    return {
      userToken: getInfo(),
      userInfo: {},
      userAsset: {}
    }
  },
  mutations: {
    setUserToken (state, obj) {
      state.userToken = obj
      setInfo(obj)
    },
    setUserInfo (state, obj) {
      state.userInfo = obj
    },
    setUserAsset (state, obj) {
      state.userAsset = obj
    }
  },
  actions: {
    async getUserInfoActions (context) {
      const { data } = await getUserInfo()
      context.commit('setUserInfo', data)
    },
    async getuserAssetActions (context) {
      const { data } = await getuserAsset()
      context.commit('setUserAsset', data)
    },
    logout (context) {
      context.commit('setUserToken', {})
      context.commit('setUserInfo', {})
      context.commit('setUserAsset', {})
      context.commit('cart/setCartTotalInfo', { }, { root: true })
      context.commit('cart/setCartList', [], { root: true })
      context.commit('address/setaddressList', [], { root: true })
      removeInfo()
    }
  }

}
