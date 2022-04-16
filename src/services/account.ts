import { request } from 'umi';

/**
 * 登录
 */
export async function signin(data = {}) {
  return request('/invoke/account/signin', {
    method: 'POST',
    data,
  });
}

/**
 * 注册
 */
export async function signup(data = {}) {
  return request('/invoke/account/signup', {
    method: 'POST',
    data,
  });
}

/**
 * 账户
 */
export async function getProfile(data = {}) {
  return request('/invoke/account/profile', {
    method: 'GET',
    params: data,
  });
}

/**
 * twofactor
 */
export async function twofactor(data = {}) {
  return request('/invoke/account/signin/twofactor', {
    method: 'POST',
    data,
  });
}
