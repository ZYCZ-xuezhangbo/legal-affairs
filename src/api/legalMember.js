import request from '@/utils/request'
// 本部法务人员模块

const api = '/legalMember'

export function create({
  birthDate,
  certificateNumber,
  company,
  dept,
  educationBackground,
  educationalSystem,
  employmentPeriod,
  enterpriseNumber,
  enterpriseProfession,
  fullTime,
  gender,
  joinWork,
  lammyCompany,
  lammyDept,
  legalMajor,
  legalProfession,
  majorName,
  name,
  officePhone,
  phone,
  postLevel,
  postName,
  professionGrade,
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
      dept,
      educationBackground,
      educationalSystem,
      employmentPeriod,
      enterpriseNumber,
      enterpriseProfession,
      fullTime,
      gender,
      joinWork,
      lammyCompany,
      lammyDept,
      legalMajor,
      legalProfession,
      majorName,
      name,
      officePhone,
      phone,
      postLevel,
      postName,
      professionGrade,
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

export function page({ pageNum = 1, pageSize = 10, company, enterpriseProfession, legalMajor, legalProfession }) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params: { pageNum, pageSize, company, enterpriseProfession, legalMajor, legalProfession }
  })
}

export function update({
  birthDate,
  certificateNumber,
  company,
  dept,
  educationBackground,
  educationalSystem,
  employmentPeriod,
  enterpriseNumber,
  enterpriseProfession,
  fullTime,
  gender,
  id,
  joinWork,
  legalMajor,
  legalProfession,
  majorName,
  name,
  officePhone,
  phone,
  postLevel,
  postName,
  professionGrade,
  resourceUrl,
  school,
  userName,
  work
 }) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data: { birthDate,
      certificateNumber,
      company,
      dept,
      educationBackground,
      educationalSystem,
      employmentPeriod,
      enterpriseNumber,
      enterpriseProfession,
      fullTime,
      gender,
      id,
      joinWork,
      legalMajor,
      legalProfession,
      majorName,
      name,
      officePhone,
      phone,
      postLevel,
      postName,
      professionGrade,
      resourceUrl,
      school,
      userName,
      work }
  })
}
