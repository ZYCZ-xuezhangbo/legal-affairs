import request from '@/utils/request'
// 案件模块

const api = '/case'

/**
 * 案由列表，根据关键字查询所有上级案由
 * @param {string} keyword
 */
export function getBrief(keyword) {
  return request({
    url: `${api}/getBrief`,
    method: 'get',
    params: { label: keyword }
  })
}

/**
 * 根据id向下查询案由
 * @param {string} id
 */
export function getBriefById(id) {
  return request({
    url: `${api}/getBriefById/${id}`,
    method: 'get'
  })
}

/**
 * 根据id查询案由名称
 * @param {string} id
 */
export function getBriefLabelById(id) {
  return request({
    url: `${api}/getBriefLabelById/${id}`,
    method: 'get'
  })
}

/**
 * 获取案件相关字典
 */
export function getCaseDictionaries() {
  return request({
    url: `${api}/getCaseDictionaries`,
    method: 'get'
  })
}

/**
 * 新建案件
 * @param {object} params
 */
export function create(data) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data
  })
}

/**
 * 获取案件关联的列表
 * @param {object} params
 */
export function relevancyPage(params) {
  return request({
    url: `${api}/relevancyPage`,
    method: 'get',
    params
  })
}

/**
 * 分页查询
 * @param {object} params
 */
export function page(params) {
  return request({
    url: `${api}/casePage`,
    method: 'get',
    params
  })
}

/**
 * 获取案件详情
 * @param {string} id
 */
export function getById(id = '') {
  return request({
    url: `${api}/getById/${id}`,
    method: 'get'
  })
}

/**
 * 获取案件夹详情
 * @param {string} id
 */
export function getCaseFolderById(id = '') {
  return request({
    url: `${api}/getCaseFolderById/${id}`,
    method: 'get'
  })
}

/**
 * 修改收藏状态
 * @param {object} params
 */
export function changeFavoriteState(data) {
  return request({
    url: `${api}/changeFavoriteState`,
    method: 'post',
    data
  })
}

/**
 * 案件修改
 * @param {object} data
 */
export function update(data) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data
  })
}

/**
 * 获取案件修改记录
 */
export function getCaseLogList(params) {
  return request({
    url: `${api}/getCaseLogList`,
    method: 'get',
    params
  })
}

/**
 * 获取案件基本详情
 * @param {string} caseId
 */
export function getBasicInfoById(caseId) {
  return request({
    url: `${api}/getBasicInfoById/${caseId}`,
    method: 'get'
  })
}

/**
 * 导出
 * @param {object} data
 */
export function export_(data) {
  return request({
    url: `${api}/exportCaseExcel`,
    method: 'post',
    data,
    responseType: 'blob'
  })
}
