import request from '@/utils/request'
// 外部律所管理模块

const api = '/outsideLawFirm'

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
 * 导出
 * @param {object} data
 */
export function export_(data) {
  return request({
    url: `${api}/exportOutsideLawFirmExcel`,
    responseType: 'blob',
    method: 'post',
    data
  })
}
