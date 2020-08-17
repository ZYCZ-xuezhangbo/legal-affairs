import request from '@/utils/request'
// 案件模块

const api = '/case'

/**
 * 案由列表
 * @param {string} keyword
 */
export function getBrief(keyword) {
  return request({
    url: `${api}/getBrief`,
    method: 'get',
    params: { label: keyword }
  })
}
export function getCaseDictionaries() {
  return request({
    url: `${api}/getCaseDictionaries`,
    method: 'get'
  })
}
export function create(params) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data: params
  })
}
/**
 * 获取案件关联的列表
 * @param {object} params
 */
export function relevancyPage(params) {
  return request({
    url: `${api}/relevancyPage`,
    method: 'get',
    params
  })
}
