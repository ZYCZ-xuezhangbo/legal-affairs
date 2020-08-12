import request from '@/utils/request'
// 案件模块

const api = '/case'

export function get(keyword) {
  return request({
    url: `${api}/get`,
    method: 'get',
    params: { label: keyword }
  })
}
