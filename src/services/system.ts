import { request } from 'umi';

/**
 * 系统信息
 */
export async function getInfo(data = {}) {
  return request('/invoke/system/info', {
    method: 'GET',
    params: data,
  });
}

/**
 * 系统公告
 */
export async function getNotice(data = {}) {
  return request('/invoke/system/notice', {
    method: 'GET',
    params: data,
  });
}

/**
 * 回调地址测试
 */
export async function testWebhookUrl(data = {}) {
  return request('/invoke/system/url/connectable', {
    method: 'POST',
    data,
  });
}

/**
 * 发送 fau
 */
export async function sendFau(data = {}) {
  return request('/invoke/system/faucet/fau', {
    method: 'POST',
    data,
  });
}

/**
 * 发送 trx
 */
export async function sendTrx(data = {}) {
  return request('/invoke/system/faucet/trx', {
    method: 'POST',
    data,
  });
}

/**
 * 测试订单 - 创建
 */
export async function createTestTransaction(data = {}) {
  return request('/invoke/system/transaction', {
    method: 'POST',
    data,
  });
}

/**
 * 测试订单 - 查询状态
 */
export async function queryTestTransaction(data = {}) {
  return request('/invoke/system/transaction/query', {
    method: 'GET',
    params: data,
  });
}
