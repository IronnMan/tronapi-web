import { request } from 'umi';

/**
 * 添加
 */
export async function add(data = {}) {
  return request('/invoke/address/add', {
    method: 'POST',
    data,
  });
}

/**
 * 更新
 */
export async function update(data = {}) {
  return request('/invoke/address/update', {
    method: 'POST',
    data,
  });
}

/**
 *　地址列表
 */
export async function getList(data = {}) {
  return request('/invoke/address/list', {
    method: 'POST',
    data,
  });
}
