import request from '@/utils/request'
// 案件回款模块

const api = '/caseReturned'

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

export function update(data) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data
  })
}
