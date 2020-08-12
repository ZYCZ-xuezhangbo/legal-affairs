import request from '@/utils/request'
// 用户信息模块

const api = '/user'
/**
 * 登出
 */
export function logout() {
  return request({
    url: `${api}/getLogout`,
    method: 'get'
  })
}

/**
 * 获取用户信息
 */
export function getInfo() {
  return request({
    url: `${api}/getMyUserInfo`,
    method: 'get'
  })
}
