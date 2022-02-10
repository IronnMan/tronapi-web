import { request } from 'umi';

/**
 * 钱包信息
 */
export async function getWallet(data = {}) {
  return request('/invoke/user/wallet', {
    method: 'GET',
    params: data,
  });
}

/**
 * Authenticator
 */
export async function getAuthenticator(data = {}) {
  return request('/invoke/user/authenticator', {
    method: 'GET',
    params: data,
  });
}

/**
 * 更新配置
 */
export async function updateConfig(data = {}) {
  return request('/invoke/user/update/config', {
    method: 'POST',
    data,
  });
}

/**
 * 更新密码
 */
export async function updatePassword(data = {}) {
  return request('/invoke/user/update/password', {
    method: 'POST',
    data,
  });
}
