import request from '@/utils/request'

// 获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/')
}

// 获取短信验证码
export const getMobileSmsCode = (params) => {
  return request.post('/send-sms/', params)
}

// 登录
export const Login = (params) => {
  return request.post('/login/', params)
}
