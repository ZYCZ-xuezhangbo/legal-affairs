import request from '@/utils/request'

const api = '/file'

export function upload(data) {
  return request({
    url: `${api}/upload`,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
