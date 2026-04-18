import request from '@/utils/request'

export const getProductDetail = (goodsId) => {
  return request.get(`/productDetail/${goodsId}`)
}
