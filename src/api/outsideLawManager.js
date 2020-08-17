import request from '@/utils/request'
// 外部律师管理模块

const api = '/outsideLawManager'

export function create(parmas) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data: parmas
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

export function page({ pageNum = 1, pageSize = 10, lawFirmName, lawName }) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params: { pageNum, pageSize, lawFirmName, lawName }
  })
}

export function update(parmas) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data: parmas
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
