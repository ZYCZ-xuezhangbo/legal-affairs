import request from '@/utils/request'
// 角色管理模块

const api = '/systemRole'

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

export function create(data) {
  return request({
    url: `${api}/saveUserRole`,
    method: 'post',
    data
  })
}

export function delete_(id) {
  return request({
    url: `${api}/delete/${id}`,
    method: 'post'
  })
}
