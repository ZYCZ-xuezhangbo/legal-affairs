import request from '@/utils/request'
// 法律总顾问模块

const api = '/legalCounsel'

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
 * 获取相关字典
 */
export function getDict() {
  return request({
    url: `${api}/getCounselDictionary`,
    method: 'get'
  })
}

/**
 * 导出
 * @param {object} data
 */
export function export_(data) {
  return request({
    url: `${api}/exportCounselExcel`,
    responseType: 'blob',
    method: 'post',
    data
  })
}
