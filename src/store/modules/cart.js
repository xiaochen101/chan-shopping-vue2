import { getCartTotal, setCartTotal } from '@/utils/storage'
import { getCartList, updateCart, deleteCart, updateCheckStatus } from '@/api/cart'
export default {
  namespaced: true,
  state () {
    return {
      cart_total: getCartTotal(),
      cartList: []
    }
  },
  mutations: {
    setCartTotalInfo (state, obj) {
      state.cart_total = obj
      setCartTotal(obj)
    },
    setCartList (state, newList) {
      state.cartList = newList
      state.cart_total = { badge: state.cartList.total }
      setCartTotal(state.cart_total)
    },
    changeCheck (state, cartId) {
      const cartLists = state.cartList.cart_list
      const goods = cartLists.find(item => item.cart_info.id === cartId)
      goods.cart_info.is_checked = !goods.cart_info.is_checked
    },
    changeAllcheck (state, flag) {
      const cartLists = state.cartList.cart_list
      cartLists.forEach(item => { item.cart_info.is_checked = flag })
    },
    changeCountBoxNum (state, params) {
      const cartLists = state.cartList.cart_list || []
      const goods = cartLists.find(item => item.cart_info.goodsId === params.goodsId)
      goods.cart_info.goodsNum = params.goodsNum
    }
  },
  actions: {
    async getCartActions (context) {
      const { data } = await getCartList()
      context.commit('setCartList', data)
    },
    async updateCartActions (context, params) {
      // 先本地修改，然后再传给后台
      context.commit('changeCountBoxNum', params)
      const res = await updateCart(params)

      context.commit('setCartTotalInfo', {
        badge: res.data.total_goods_num
      })
    },
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.cart_info.id)
      await deleteCart({ cartIds: cartIds })
      // 重新拉取最新的购物车数据 (重新渲染)
      context.dispatch('getCartActions')
    },
    async updateCheckStatusActions (context, params) {
      const cartIds = []
      cartIds.push(params)
      context.commit('changeCheck', params)
      await updateCheckStatus({
        cartIds: cartIds
      })
    },
    async updateAllCheckStatusActions (context, flag) {
      context.commit('changeAllcheck', flag)
      const cartLists = context.state.cartList.cart_list
      const cartIds = cartLists.map(item => item.cart_info.id)
      await updateCheckStatus({
        cartIds: cartIds
      })
    }

  },
  getters: {
    // 商品总数
    cartTotal (state) {
      const cartLists = state.cartList.cart_list || []
      return cartLists.reduce((sum, item) => sum + item.cart_info.goodsNum, 0)
    },
    // 选中的商品
    selCartList (state) {
      const cartLists = state.cartList.cart_list || []
      return cartLists.filter(item => item.cart_info.is_checked)
    },
    // 选中的商品总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.cart_info.goodsNum, 0)
    },
    // 选中的商品总价
    selPrice (state, getters) {
      const price = getters.selCartList.reduce((sum, item) => sum + item.cart_info.goodsNum * item.goods.now_price, 0)
      return price.toFixed(2)
    },
    // 全选
    isAllcheck (state) {
      const cartLists = state.cartList.cart_list || []
      return cartLists.every(item => item.cart_info.is_checked)
    }
  }
}
