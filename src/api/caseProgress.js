import request from '@/utils/request'
// 案件进展模块

const api = '/caseProgress'

export function create(data) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data
  })
}

export function getProgressDictionary(params) {
  return request({
    url: `${api}/getProgressDictionary`,
    method: 'get',
    params
  })
}
