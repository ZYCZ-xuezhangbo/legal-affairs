import request from '@/utils/request'
// 法律总顾问模块

const api = '/legalCounsel'

export function create({
  birthDate,
  certificateNumber,
  company,
  counselorType,
  dept,
  duty,
  fullTime,
  gender,
  lammyCompany,
  lammyDept,
  legalCertificateNumber,
  legalMajor,
  legalProfession,
  majorName,
  name,
  officePhone,
  portraitList,
  professionGrade,
  professionStatus,
  resourceUrl,
  school,
  userName,
  work
}) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data: {
      birthDate,
      certificateNumber,
      company,
      counselorType,
      dept,
      duty,
      fullTime,
      gender,
      lammyCompany,
      lammyDept,
      legalCertificateNumber,
      legalMajor,
      legalProfession,
      majorName,
      name,
      officePhone,
      portraitList,
      professionGrade,
      professionStatus,
      resourceUrl,
      school,
      userName,
      work
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

export function page({ pageNum = 1, pageSize = 10, legalMajor, legalProfession, professionStatus }) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params: { pageNum, pageSize, legalMajor, legalProfession, professionStatus }
  })
}

export function update({
  birthDate,
  certificateNumber,
  company,
  counselorType,
  dept,
  duty,
  fullTime,
  gender,
  id,
  legalCertificateNumber,
  legalMajor,
  legalProfession,
  majorName,
  name,
  officePhone,
  portraitList,
  professionGrade,
  professionStatus,
  resourceUrl,
  school,
  userName,
  work
}) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data: {
      birthDate,
      certificateNumber,
      company,
      counselorType,
      dept,
      duty,
      fullTime,
      gender,
      id,
      legalCertificateNumber,
      legalMajor,
      legalProfession,
      majorName,
      name,
      officePhone,
      portraitList,
      professionGrade,
      professionStatus,
      resourceUrl,
      school,
      userName,
      work
    }
  })
}
