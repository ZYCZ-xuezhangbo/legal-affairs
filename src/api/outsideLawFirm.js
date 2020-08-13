import request from '@/utils/request'
// 外部律所管理模块

const api = '/outsideLawFirm'

export function create({ address, lammyCompany, lammyDept, lawFirmDesc, lawFirmName, linkman, phone, photographs, resourceUrl, videos }) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data: { address, lammyCompany, lammyDept, lawFirmDesc, lawFirmName, linkman, phone, photographs, resourceUrl, videos }
  })
}

export function delete_(id) {
  return request({
    url: `${api}/delete/${id}`,
    method: 'post'
  })
}

export function getById(id) {
  return request({
    url: `${api}/getById/${id}`,
    method: 'get'
  })
}

export function page({ pageNum = 1, pageSize = 10, address, lawFirmName, linkman }) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params: { pageNum, pageSize, address, lawFirmName, linkman }
  })
}

export function update({ address, id, lawFirmDesc, lawFirmName, linkman, phone, photographs, resourceUrl, videos }) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data: { address, id, lawFirmDesc, lawFirmName, linkman, phone, photographs, resourceUrl, videos }
  })
}
