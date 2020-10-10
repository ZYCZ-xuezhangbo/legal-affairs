import request from '@/utils/request'
// 用户管理模块

const api = '/system-user'

/**
 * 分页查询
 * @param {object} params
 */
export function page(params) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params
  })
}
