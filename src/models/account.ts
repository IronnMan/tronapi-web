'use strict';

import { Effect } from 'umi';
import * as Service from '@/services/account';

export interface AccountModelState {}

export interface AccountModelType {
  namespace: 'account';
  state: AccountModelState;
  effects: {
    signin: Effect;
    signup: Effect;
    twofactor: Effect;
  };
}

const AccountModel: AccountModelType = {
  namespace: 'account',
  state: {},
  effects: {
    *signin({ payload }, { call }) {
      return yield call(Service.signin, payload);
    },
    *signup({ payload }, { call }) {
      return yield call(Service.signup, payload);
    },
    *twofactor({ payload }, { call }) {
      return yield call(Service.twofactor, payload);
    },
  },
};

export default AccountModel;
