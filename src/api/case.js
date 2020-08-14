import request from '@/utils/request'
// 案件模块

const api = '/case'

export function getCause(keyword) {
  return request({
    url: `${api}/getCause`,
    method: 'get',
    params: { label: keyword }
  })
}
