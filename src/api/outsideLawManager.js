import request from '@/utils/request'
// 外部律师管理模块

const api = '/outsideLawManager'

export function create({ age, educationBackground, gender, lammyCompany, lammyDept, lawName, legalProfession, major, phone, professionalLife, resourceUrl, serviceContent }) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data: { age, educationBackground, gender, lammyCompany, lammyDept, lawName, legalProfession, major, phone, professionalLife, resourceUrl, serviceContent }
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

export function page({ pageNum = 1, pageSize = 10, lawFirmName, lawName }) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params: { pageNum, pageSize, lawFirmName, lawName }
  })
}

export function update({ age, educationBackground, gender, id, lammyCompany, lammyDept, lawName, legalProfession, major, phone, professionalLife, resourceUrl, serviceContent }) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data: { age, educationBackground, gender, id, lammyCompany, lammyDept, lawName, legalProfession, major, phone, professionalLife, resourceUrl, serviceContent }
  })
}
