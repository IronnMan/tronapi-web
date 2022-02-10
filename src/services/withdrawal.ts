import { request } from 'umi';

/**
 * 列表
 */
export async function getList(data = {}) {
  return request('/invoke/withdrawal/list', {
    method: 'POST',
    data,
  });
}

/**
 * 详情
 */
export async function getDetail(data = {}) {
  return request(`/invoke/withdrawal/info`, {
    method: 'GET',
    params: data,
  });
}

/**
 * 新增
 */
export async function create(data = {}) {
  return request(`/invoke/withdrawal/create`, {
    method: 'POST',
    data,
  });
}

/**
 * 统计 - 汇总
 */
export async function getStatOverview(data = {}) {
  return request(`/invoke/withdrawal/stat/overview`, {
    method: 'GET',
    params: data,
  });
}

/**
 * 发送回调
 */
export async function sendWebhook(data = {}) {
  return request(`/invoke/withdrawal/webhook_send`, {
    method: 'POST',
    data,
  });
}
