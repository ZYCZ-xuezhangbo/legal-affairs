import request from '@/utils/request'
// 本部法务人员模块

const api = '/legalMember'

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
