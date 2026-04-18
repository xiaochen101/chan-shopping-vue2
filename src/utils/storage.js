const INFO_KEY = 'chan_shopping_info'
const HISTORY_KEY = 'search_history'
const CART_TOTAL_KEY = 'cart_total'
// 获取个人信息
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  return result
    ? JSON.parse(result)
    : {
        token: ''
      }
}

// 设置个人信息
export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 设置搜索历史

export const setHistory = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}

// 获取搜索历史
export const getHistory = () => localStorage.getItem(HISTORY_KEY) ? JSON.parse(localStorage.getItem(HISTORY_KEY)) : []

// 获取购物车总数
export const getCartTotal = () => {
  const result = localStorage.getItem(CART_TOTAL_KEY)
  return result
    ? JSON.parse(result)
    : {
        badge: ''
      }
}

// 设置购物车总数信息
export const setCartTotal = (total) => {
  localStorage.setItem(CART_TOTAL_KEY, JSON.stringify(total))
}
