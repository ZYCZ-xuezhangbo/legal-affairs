import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const login = (options) => {
  const body = getBody(options)
  if (body.username !== 'admin' || body.password !== '123456') {
    return builder({ isLogin: true }, '账户或密码错误', 'ACCOUNT_002', 200)
  }
  return builder({ token: '4291d7da9005377ec9aec4a71ea837f' }, '成功', 'M0000', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const unAuth = () => {
  return builder({}, '用户未登录', 'ACCOUNT_006', 200)
}

Mock.mock(/\/login\/userLogin/, 'post', login)
Mock.mock(/\/login\/unAuth/, 'get', unAuth)
