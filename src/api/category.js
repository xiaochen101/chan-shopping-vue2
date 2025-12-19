import request from '@/utils/request'
// 获取二级分类商品
export const getCategoryChild = (params) => {
  return request.get('/category/child/', { params })
}
