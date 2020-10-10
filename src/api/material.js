import request from '@/utils/request'
// 资料下载模块

const api = '/material'
/**
 * 新增资料
 * @param {object} param0
 */
export function create(data) {
  return request({
    url: `${api}/create`,
    method: 'post',
    data
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
 * @param {object} params
 */
export function page(params) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params
  })
}

/**
 * 修改
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

/**
 * 导出
 * @param {object} data
 */
export function export_(data) {
  return request({
    url: `${api}/exportMaterialExcel`,
    responseType: 'blob',
    method: 'post',
    data
  })
}
