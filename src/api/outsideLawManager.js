import request from '@/utils/request'
// 外部律师管理模块

const api = '/outsideLawManager'

export function create(data) {
  return request({
    url: `${api}/create`,
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

export function getById(id) {
  return request({
    url: `${api}/getById/${id}`,
    method: 'get'
  })
}

export function page(params) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params
  })
}

export function update(data) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data
  })
}

/**
 * 所有的律所列表
 */
export function getLawFirmName() {
  return request({
    url: `${api}/getLawFirmName`,
    method: 'get'
  })
}
export function getLayerByFirmId(id) {
  return request({
    url: `${api}/getLayerByFirmId/${id}`,
    method: 'get'
  })
}
