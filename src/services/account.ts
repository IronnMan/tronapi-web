import { request } from 'umi';

/**
 * 登录
 */
export async function signin(data = {}) {
  return request('/invoke/user/signin', {
    method: 'POST',
    data,
  });
}

/**
 * 注册
 */
export async function signup(data = {}) {
  return request('/invoke/user/signup', {
    method: 'POST',
    data,
  });
}

/**
 * 账户
 */
export async function getProfile(data = {}) {
  return request('/invoke/user/profile', {
    method: 'GET',
    params: data,
  });
}

/**
 * twofactor
 */
export async function twofactor(data = {}) {
  return request('/invoke/user/signin/twofactor', {
    method: 'POST',
    data,
  });
}
