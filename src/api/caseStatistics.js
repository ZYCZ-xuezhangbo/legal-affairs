import request from '@/utils/request'
// 案件统计模块

const api = '/caseStatistics'

export function list(data) {
  return request({
    url: `${api}/list`,
    method: 'post',
    data
  })
}
