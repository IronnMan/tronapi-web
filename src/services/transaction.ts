import { request } from 'umi';

/**
 * 列表
 */
export async function getList(data = {}) {
  return request('/invoke/transaction/list', {
    method: 'POST',
    data,
  });
}

/**
 * 详情
 */
export async function getDetail(data = {}) {
  return request(`/invoke/transaction/info`, {
    method: 'GET',
    params: data,
  });
}

/**
 * 统计 - 汇总
 */
export async function getStatOverview(data = {}) {
  return request(`/invoke/transaction/stat/overview`, {
    method: 'GET',
    params: data,
  });
}

/**
 * 统计 - 图形
 */
export async function getStatChart(data = {}) {
  return request(`/invoke/transaction/stat/chart`, {
    method: 'GET',
    params: data,
  });
}

/**
 * 标记为完成
 */
export async function markDone(data = {}) {
  return request(`/invoke/transaction/mark_done`, {
    method: 'POST',
    data,
  });
}

/**
 * 发送 webhook
 */
export async function sendWebhook(data = {}) {
  return request(`/invoke/transaction/webhook_send`, {
    method: 'POST',
    data,
  });
}

/**
 * 查询 - 地址 or hash
 */
export async function search(data = {}) {
  return request(`/invoke/transaction/search`, {
    method: 'POST',
    data,
  });
}
