'use strict';

import { ImmerReducer, Effect } from 'umi';
import * as Service from '@/services/system';
export interface SystemModelState {
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
    testWebhookUrl: Effect;
    createTestTransaction: Effect;
    queryTestTransaction: Effect;
  };
  reducers: {
    setNotice: ImmerReducer<SystemModelState>;
    setTestTransaction: ImmerReducer<SystemModelState>;
  };
}

const SystemModel: SystemModelType = {
  namespace: 'system',
  state: {
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
    *testWebhookUrl({ payload }, { call }) {
      return yield call(Service.testWebhookUrl, payload);
    },
  },
  reducers: {
    setNotice(state, action) {
      state.notice = action.payload;
    },
    setTestTransaction(state, action) {
      state.test_transaction = action.payload;
    },
  },
};

export default SystemModel;
