import { request } from 'umi';

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
