'use strict';

import { Effect, ImmerReducer } from 'umi';
import * as Service from '@/services/recharge';
import IRecharge from '@/types/IRecharge';

export interface RechargeModelState {
  data_list: {
    count: number;
    rows: IRecharge[];
  };
  data_list_params: {
    page_index: number;
    page_size: number;
  };
}

const RechargeInitListParams = {
  page_index: 1,
  page_size: 10,
};

export interface RechargeModelType {
  namespace: 'recharge';
  state: RechargeModelState;
  effects: {
    create: Effect;
    query: Effect;
    getList: Effect;
  };
  reducers: {
    setList: ImmerReducer<RechargeModelState>;
    resetList: ImmerReducer<RechargeModelState>;
    setListParams: ImmerReducer<RechargeModelState>;
    resetListParams: ImmerReducer<RechargeModelState>;
  };
}

const RechargeModel: RechargeModelType = {
  namespace: 'recharge',
  state: {
    data_list: {
      count: 0,
      rows: [],
    },
    data_list_params: RechargeInitListParams,
  },
  effects: {
    *create({ payload }, { call }) {
      return yield call(Service.create, payload);
    },
    *query({ payload }, { call }) {
      return yield call(Service.query, payload);
    },
    *getList({ payload }, { call, put, select }) {
      const { bill_list_params } = yield select((state: any) => state.recharge);
      let list_search_params = {
        ...bill_list_params,
        ...payload,
      };
      const response: any = yield call(Service.getList, list_search_params);
      if (response) {
        yield put({ type: 'setList', payload: response.data });
      }
      return response;
    },
  },
  reducers: {
    setList(state, action) {
      state.data_list = action.payload;
    },
    resetList(state) {
      state.data_list = {
        count: 0,
        rows: [],
      };
    },
    setListParams(state, action) {
      state.data_list_params = {
        ...state.data_list_params,
        ...action.payload,
      };
    },
    resetListParams(state) {
      state.data_list_params = RechargeInitListParams;
    },
  },
};

export default RechargeModel;
