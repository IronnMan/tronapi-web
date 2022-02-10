'use strict';

import { ImmerReducer, Effect } from 'umi';
import { COIN_TYPE } from '@/configs/enum';
import * as Service from '@/services/system';
import Storage from '@/utils/storage';
import { STORAGE_KEY } from '@/configs';

const storageCoinCode = Storage.getItem(STORAGE_KEY.COINCODE) || COIN_TYPE.USDT;

export interface SystemModelState {
  coin_code: COIN_TYPE;
  notice: {
    title: string;
    content: string;
  };
  test_transaction: any;
}
export interface SystemModelType {
  namespace: 'system';
  state: SystemModelState;
  effects: {
    getNotice: Effect;
    sendFau: Effect;
    sendTrx: Effect;
    testWebhookUrl: Effect;
    createTestTransaction: Effect;
    queryTestTransaction: Effect;
  };
  reducers: {
    setCoinCode: ImmerReducer<SystemModelState>;
    setNotice: ImmerReducer<SystemModelState>;
    setTestTransaction: ImmerReducer<SystemModelState>;
  };
}

const SystemModel: SystemModelType = {
  namespace: 'system',
  state: {
    coin_code: storageCoinCode as COIN_TYPE,
    notice: {
      title: '',
      content: '',
    },
    test_transaction: {},
  },
  effects: {
    *getNotice(_, { call, put }) {
      const response: any = yield call(Service.getNotice);
      if (response) {
        yield put({ type: 'setNotice', payload: response.data });
      }
      return response;
    },
    *sendFau({ payload }, { call, put }) {
      return yield call(Service.sendFau, payload);
    },
    *sendTrx({ payload }, { call, put }) {
      return yield call(Service.sendTrx, payload);
    },
    *createTestTransaction({ payload }, { call, put }) {
      const response: any = yield call(Service.createTestTransaction, payload);
      if (response) {
        yield put({ type: 'setTestTransaction', payload: response.data });
      }
      return response;
    },
    *queryTestTransaction({ payload }, { call, put }) {
      const response: any = yield call(Service.queryTestTransaction, payload);
      if (response) {
        yield put({ type: 'setTestTransaction', payload: response.data });
      }
      return response;
    },
    *testWebhookUrl({ payload }, { call, put }) {
      return yield call(Service.testWebhookUrl, payload);
    },
  },
  reducers: {
    setCoinCode(state, action) {
      state.coin_code = action.payload;
    },
    setNotice(state, action) {
      state.notice = action.payload;
    },
    setTestTransaction(state, action) {
      state.test_transaction = action.payload;
    },
  },
};

export default SystemModel;
