'use strict';
import { Effect, ImmerReducer } from 'umi';
import { COIN_TYPE, COIN_TEXT } from '@/configs/enum';
import * as Service from '@/services/user';

export interface UserModelState {
  wallet: {
    coin_code: COIN_TYPE;
    coin_amount: string | number;
    coin_text: string;
  };
  authenticator: string;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    getWallet: Effect;
    getAuthenticator: Effect;
    updateConfig: Effect;
    updatePassword: Effect;
  };
  reducers: {
    setWallet: ImmerReducer<UserModelState>;
    setAuthenticator: ImmerReducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    wallet: {
      coin_code: COIN_TYPE.USDT,
      coin_amount: 0,
      coin_text: COIN_TEXT.USDT,
    },
    authenticator: '',
  },
  effects: {
    *getWallet({ payload }, { call, put, select }) {
      const response: any = yield call(Service.getWallet, payload);
      if (response) {
        yield put({ type: 'setWallet', payload: response.data });
      }
      return response;
    },

    *getAuthenticator({ payload }, { call, put, select }) {
      const response: any = yield call(Service.getAuthenticator, payload);
      if (response) {
        yield put({ type: 'setAuthenticator', payload: response.data });
      }
      return response;
    },

    *updateConfig({ payload }, { call, put, select }) {
      return yield call(Service.updateConfig, payload);
    },

    *updatePassword({ payload }, { call, put, select }) {
      return yield call(Service.updatePassword, payload);
    },
  },
  reducers: {
    setWallet(state, action) {
      state.wallet = action.payload;
    },
    setAuthenticator(state, action) {
      state.authenticator = action.payload;
    },
  },
};

export default UserModel;
