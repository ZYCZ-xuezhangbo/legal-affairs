import request from '@/utils/request'
// 公告模块

const api = '/announcement'
/**
 * 新增
 * @param {object} param0
 */
export function create({ content = '', resourceUrl = [], title = '' }) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data: { content, resourceUrl, title }
  })
}

/**
 * 删除
 * @param {string} id
 */
export function delete_(id) {
  return request({
    url: `${api}/delete/${id}`,
    method: 'post'
  })
}

/**
 * 根据id查详情
 * @param {string} id
 */
export function getById(id) {
  return request({
    url: `${api}/getById/${id}`,
    method: 'get'
  })
}

/**
 * 分页查询
 * @param {object} param0
 */
export function page({ pageNum = 1, pageSize = 10, startDate = '', endDate = '', releasePerson = '', title = '' }) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params: { pageNum, pageSize, startDate, endDate, releasePerson, title }
  })
}

/**
 * 修改
 * @param {object} param0
 */
export function update({ id = '', content = '', resourceUrl = [], title = '' }) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data: { id, resourceUrl, content, title }
  })
}
