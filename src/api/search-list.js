import request from '@/utils/request'
// 获取搜索商品
export const getGoodsList = (params) => {
  return request.get('/goods-list/search/', { params })
}
