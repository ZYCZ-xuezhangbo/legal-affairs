import request from '@/utils/request'
// 国资政策模块

const api = '/policy'
/**
 * 新增
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
export function page(params) {
  return request({
    url: `${api}/page`,
    method: 'get',
    params
  })
}

/**
 * 修改
 * @param {object} param0
 */
export function update(data) {
  return request({
    url: `${api}/update`,
    method: 'post',
    data
  })
}

/**
 * 导出
 * @param {object} data
 */
export function export_(data) {
  return request({
    url: `${api}/exportPolicyExcel`,
    responseType: 'blob',
    method: 'post',
    data
  })
}
