import request from '@/utils/request'
// 律所工作模块

const api = '/lawFirmWork'

export function create({
  chargeDesc,
  fillTime,
  fillUnit,
  informant,
  lammyCompany,
  lammyDept,
  lawFirmName,
  lawName,
  lawSource,
  resourceUrl,
  serviceCharge,
  serviceMatter,
  serviceTimeEnd,
  serviceTimeStart,
  serviceType
}) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data: {
      chargeDesc,
      fillTime,
      fillUnit,
      informant,
      lammyCompany,
      lammyDept,
      lawFirmName,
      lawName,
      lawSource,
      resourceUrl,
      serviceCharge,
      serviceMatter,
      serviceTimeEnd,
      serviceTimeStart,
      serviceType
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

export function page({ pageNum = 1, pageSize = 10, company, startTime, endTime, lawFirmName, lawName, serviceType }) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params: { pageNum, pageSize, company, startTime, endTime, lawFirmName, lawName, serviceType }
  })
}

export function update({
  chargeDesc,
  fillTime,
  fillUnit,
  id,
  informant,
  lawFirmName,
  lawName,
  lawSource,
  resourceUrl,
  serviceCharge,
  serviceMatter,
  serviceTimeEnd,
  serviceTimeStart,
  serviceType
}) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data: {
      chargeDesc,
      fillTime,
      fillUnit,
      id,
      informant,
      lawFirmName,
      lawName,
      lawSource,
      resourceUrl,
      serviceCharge,
      serviceMatter,
      serviceTimeEnd,
      serviceTimeStart,
      serviceType
    }
  })
}
