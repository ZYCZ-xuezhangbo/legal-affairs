import request from '@/utils/request'
// 案件终结模块

const api = '/caseFinality'

export function getByCaseFolderId(id) {
  return request({
    url: `${api}/getByCaseFolderId/${id}`,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data
  })
}
