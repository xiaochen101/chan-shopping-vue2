import request from '@/utils/request'

export const getCheckoutPreview = (params) => {
  return request.post('/order/checkout/preview/', params)
}

export const checkoutSubmit = (params) => {
  return request.post('/order/checkout/', params)
}

export const getOrderList = (params) => {
  return request.get('/order/list/', {
    params: params
  })
}

export const orderCancel = (params) => {
  return request.post('/order/cancel/', params)
}
