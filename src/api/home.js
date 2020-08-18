import request from '@/utils/request'
// 首页模块

const api = '/index'

export function info() {
  return request({
    url: `${api}/info`,
    method: 'get'
  })
}
