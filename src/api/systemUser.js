import request from '@/utils/request'
// 用户管理模块

const api = '/systemUser'

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

export function getById(id) {
  return request({
    url: `${api}/info/${id}`,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: `${api}/updateUserRole`,
    method: 'post',
    data
  })
}
