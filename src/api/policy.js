import request from '@/utils/request'
// 国资政策模块

const api = '/policy'
/**
 * 新增
 * @param {object} param0
 */
export function create({ resourceUrl = [], others = '', title = '' }) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data: { resourceUrl, others, title }
  })
}

/**
 * 删除
 * @param {string} id
 */
export function delete_(id = '') {
  return request({
    url: `${api}/delete/${id}`,
    method: 'post'
  })
}

/**
 * 根据id查详情
 * @param {string} id
 */
export function getById(id = '') {
  return request({
    url: `${api}/getById/${id}`,
    method: 'get'
  })
}

/**
 * 分页查询
 * @param {object} param0
 */
export function page({ pageNum = 1, pageSize = 10, title = '', releaseCompany = '', releasePerson = '' }) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params: { pageNum, pageSize, title, releaseCompany, releasePerson }
  })
}

/**
 * 修改
 * @param {object} param0
 */
export function update({ id, resourceUrl = [], others = '', title = '' }) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data: { id, resourceUrl, others, title }
  })
}