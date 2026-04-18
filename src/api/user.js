import request from '@/utils/request'

export const getUserInfo = () => {
  return request.get('/user/info/')
}

export const getuserAsset = () => {
  return request.get('/user/asset/')
}
