import request from '@/utils/request'
// 资料下载模块

const api = '/material'
/**
 * 新增资料
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
 * 分页查询
 * @param {object} param0
 */
export function page({ name = '', pageNum = 1, pageSize = 10, releasePerson = '', type = '' }) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params: { name, pageNum, pageSize, releasePerson, type }
  })
}

/**
 * 修改
 * @param {object} param0
 */
export function update({ id, name = '', resourceUrl = [], type = '' }) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data: { id, name, resourceUrl, type }
  })
}

/**
 * 获取资料类型
 */
export function getTypeList() {
  return request({
    url: `${api}/getMaterialType`,
    method: 'get'
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
