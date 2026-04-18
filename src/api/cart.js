import request from '@/utils/request'

export const addCart = (params) => {
  return request.post('/cart/add/', params)
}

export const getCartList = () => {
  return request.get('/cart/list/')
}

export const updateCart = (params) => {
  return request.post('/cart/update/', params)
}

export const deleteCart = (params) => {
  return request.post('/cart/delete/', params)
}

export const updateCheckStatus = (params) => {
  return request.post('/cart/update/checkStatus/', params)
}
