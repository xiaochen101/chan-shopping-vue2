import request from '@/utils/request'
// 获取首页数据
export const getIndexList = () => {
  return request.get('/shopping-api/index/')
}
