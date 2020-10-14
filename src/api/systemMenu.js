import request from '@/utils/request'
// 权限管理模块

const api = '/systemMenu'

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

/**
 * 权限所有列表，相当于字典
 */
export function list() {
  return request({
    url: `${api}/list`,
    method: 'get'
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
    url: `${api}/updateMenuInfo`,
    method: 'post',
    data
  })
}
