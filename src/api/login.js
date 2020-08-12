import request from '@/utils/request'
// 登录模块

const api = '/login'
/**
 * 登录
 * @param {object} param0
 */
export function login({ username, password }) {
  return request({
    url: `${api}/userLogin`,
    method: 'post',
    data: { username, password }
  })
}

/**
 * 用户未登录
 */
export function unAuth() {
  return request({
    url: `${api}/unAuth`,
    method: 'get'
  })
}
