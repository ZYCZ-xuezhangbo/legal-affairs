import request from '@/utils/request'
// 填报人模块

const api = '/informant'

export function create({ company, deptName, lammyCompany, lammyDept, name, officePhone, phone, userName }) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data: { company, deptName, lammyCompany, lammyDept, name, officePhone, phone, userName }
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

export function page({ pageNum = 1, pageSize = 10, company }) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params: { pageNum, pageSize, company }
  })
}

export function update({ id, name, company, deptName, officePhone, phone, userName }) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data: { id, name, company, deptName, officePhone, phone, userName }
  })
}
