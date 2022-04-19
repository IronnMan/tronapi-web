import { request } from 'umi';

/**
 * 添加
 */
export async function create(data = {}) {
  return request('/invoke/recharge/create', {
    method: 'POST',
    data,
  });
}

/**
 * 查询
 */
export async function query(data = {}) {
  return request('/invoke/recharge/query', {
    method: 'GET',
    params: data,
  });
}

/**
 *　充值记录
 */
export async function getList(data = {}) {
  return request('/invoke/recharge/list', {
    method: 'POST',
    data,
  });
}
