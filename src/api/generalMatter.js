import request from '@/utils/request'
// 一般事项会签模块

const api = '/generalMatter'

export function create({ lammyCompany, lammyDept, name, opinion, recipient, recipientDepartment, resourceUrl, writer }) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data: { lammyCompany, lammyDept, name, opinion, recipient, recipientDepartment, resourceUrl, writer }
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

export function page({ pageNum = 1, pageSize = 10, name, startDate, endDate }) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params: { pageNum, pageSize, name, startDate, endDate }
  })
}

export function update({ id, name, opinion, recipient, recipientDepartment, resourceUrl, writer }) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data: { id, name, opinion, recipient, recipientDepartment, resourceUrl, writer }
  })
}
