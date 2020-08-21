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

/**
 * 获取案件进展相关字典
 * @param {object} params
 */
export function getProgressDictionary(params) {
  return request({
    url: `${api}/getProgressDictionary`,
    method: 'get',
    params
  })
}
