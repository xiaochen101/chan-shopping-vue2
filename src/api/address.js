import request from '@/utils/request'

export const addAddress = (params) => {
  return request.post('/address/add/', params)
}

export const getAddressList = () => {
  return request.get('/address/list/')
}

export const updateAddress = (params) => {
  return request.post('/address/update/', params)
}

export const deleteAddress = (params) => {
  return request.post('/address/delete/', params)
}

export const setDefaultAddress = (params) => {
  return request.post('/address/setDefault/', params)
}

export const getDefaultAddress = () => {
  return request.get('/address/getDefault/')
}
