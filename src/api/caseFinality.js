import request from '@/utils/request'
// 案件终结模块

const api = '/caseFinality'

export function create(params) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data: params
  })
}

export function getByCaseFolderId(id) {
  return request({
    url: `${api}/getByCaseFolderId/${id}`,
    method: 'get'
  })
}
