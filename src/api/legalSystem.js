import request from '@/utils/request'
// 法律制度模块

const api = '/legalSystem'
/**
 * 新增
 * @param {object} param0
 */
export function create({ name, resourceUrl = [], type }) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data: { name, resourceUrl, type }
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
 * 获取法律制度类型
 */
export function getLegalSystemType() {
  return request({
    url: `${api}/getLegalSystemType`,
    method: 'get'
  })
}

/**
 * 分页查询
 * @param {object} param0
 */
export function page({ pageNum = 1, pageSize = 10, name = '', releasePerson = '', type = '' }) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params: { pageNum, pageSize, name, releasePerson, type }
  })
}

/**
 * 修改
 * @param {object} param0
 */
export function update({ id = '', name = '', resourceUrl = [], type = '' }) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data: { id, name, resourceUrl, type }
  })
}
