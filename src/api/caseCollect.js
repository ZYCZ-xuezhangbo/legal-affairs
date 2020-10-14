import request from '@/utils/request'
// 案件汇总表模块

const api = '/caseCollect'

/**
 * 分页查询
 */
export function list(params) {
  return request({
    url: `${api}/list`,
    method: 'get',
    params
  })
}
export function getCollectType() {
  return request({
    url: `${api}/getCollectType`,
    method: 'get'
  })
}
/**
 * 点击导出按钮，并不会返回文件流
 * @param {object} data
 */
export function export_(data) {
  return request({
    url: `${api}/export`,
    method: 'post',
    data
  })
}
