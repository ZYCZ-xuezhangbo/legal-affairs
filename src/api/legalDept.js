import request from '@/utils/request'
// 法律部门模块

const api = '/legalDept'

export function create({
  company,
  contactOfficePhone,
  contactPerson,
  contactPhone,
  deptName,
  deptObligation,
  deptPhone,
  deptType,
  id,
  lammyCompany,
  lammyDept,
  principal,
  resourceUrl
}) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data: {
      company,
      contactOfficePhone,
      contactPerson,
      contactPhone,
      deptName,
      deptObligation,
      deptPhone,
      deptType,
      id,
      lammyCompany,
      lammyDept,
      principal,
      resourceUrl
    }
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

export function page({ pageNum = 1, pageSize = 10, company, deptName }) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params: { pageNum, pageSize, company, deptName }
  })
}

export function update({
  company,
  contactOfficePhone,
  contactPerson,
  contactPhone,
  deptName,
  deptObligation,
  deptPhone,
  deptType,
  id,
  lammyCompany,
  lammyDept,
  principal,
  resourceUrl
}) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data: {
      company,
      contactOfficePhone,
      contactPerson,
      contactPhone,
      deptName,
      deptObligation,
      deptPhone,
      deptType,
      id,
      lammyCompany,
      lammyDept,
      principal,
      resourceUrl
    }
  })
}
