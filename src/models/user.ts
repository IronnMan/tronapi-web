'use strict';
import { Effect, ImmerReducer } from 'umi';
import * as Service from '@/services/user';

export interface UserModelState {
  balance: string;
  authenticator: string;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    getAuthenticator: Effect;
    updateConfig: Effect;
    updatePassword: Effect;
  };
  reducers: {
    setAuthenticator: ImmerReducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    balance: '',
    authenticator: '',
  },
  effects: {
    *getAuthenticator({ payload }, { call, put }) {
      const response: any = yield call(Service.getAuthenticator, payload);
      if (response) {
        yield put({ type: 'setAuthenticator', payload: response.data });
      }
      return response;
    },

    *updateConfig({ payload }, { call }) {
      return yield call(Service.updateConfig, payload);
    },

    *updatePassword({ payload }, { call }) {
      return yield call(Service.updatePassword, payload);
    },
  },
  reducers: {
    setAuthenticator(state, action) {
      state.authenticator = action.payload;
    },
  },
};

export default UserModel;
