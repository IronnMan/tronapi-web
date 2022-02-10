'use strict';

import { Effect, ImmerReducer } from 'umi';
import * as Service from '@/services/withdrawal';
import { formatDateTime } from '@/utils/formater';
import IWithdrawal from '@/types/IWithdrawal';

export interface WithdrawalModelState {
  data_list: {
    count: number;
    rows: IWithdrawal[];
  };
  data_list_params: {
    dateRange: Array<any>;
    page_index: number;
    page_size: number;
  };
  data_detail: object;
  data_stat_overview: object;
}

export interface WithdrawalModelType {
  namespace: 'withdrawal';
  state: WithdrawalModelState;
  effects: {
    getList: Effect;
    getDetail: Effect;
    getStatOverview: Effect;
    create: Effect;
    sendWebhook: Effect;
  };
  reducers: {
    setList: ImmerReducer<WithdrawalModelState>;
    resetList: ImmerReducer<WithdrawalModelState>;
    setListParams: ImmerReducer<WithdrawalModelState>;
    setDetail: ImmerReducer<WithdrawalModelState>;
    resetDetail: ImmerReducer<WithdrawalModelState>;
    resetListParams: ImmerReducer<WithdrawalModelState>;
    setStatOverview: ImmerReducer<WithdrawalModelState>;
  };
}

const WithdrawalInitListParams = {
  dateRange: [],
  page_index: 1,
  page_size: 10,
};

const WithdrawalModel: WithdrawalModelType = {
  namespace: 'withdrawal',
  state: {
    data_list: {
      count: 0,
      rows: [],
    },
    data_list_params: WithdrawalInitListParams,
    data_detail: {},
    data_stat_overview: {},
  },
  effects: {
    *getList({ payload }, { call, put, select }) {
      const { data_list_params } = yield select(
        (state: any) => state.withdrawal,
      );
      let list_search_params = {
        ...data_list_params,
        ...payload,
      };
      const { dateRange } = data_list_params;
      if (dateRange && dateRange.length) {
        const [startDate, endDate] = dateRange;
        list_search_params = {
          ...list_search_params,
          start_date: formatDateTime(startDate),
          end_date: formatDateTime(endDate),
        };
      }
      const response: any = yield call(Service.getList, list_search_params);
      if (response) {
        yield put({ type: 'setList', payload: response.data });
      }
      return response;
    },
    *getDetail({ payload }, { call, put }) {
      const response: any = yield call(Service.getDetail, payload);
      if (response) {
        yield put({ type: 'setDetail', payload: response.data });
      }

      return response;
    },
    *getStatOverview({ payload }, { call, put }) {
      const response: any = yield call(Service.getStatOverview, payload);
      if (response) {
        yield put({ type: 'setStatOverview', payload: response.data });
      }
      return response;
    },
    *create({ payload }, { call, put }) {
      return yield call(Service.create, payload);
    },
    *sendWebhook({ payload }, { call, put }) {
      return yield call(Service.sendWebhook, payload);
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
      state.data_list_params = WithdrawalInitListParams;
    },
    setDetail(state, action) {
      state.data_detail = action.payload;
    },
    resetDetail(state) {
      state.data_detail = {};
    },
    setStatOverview(state, action) {
      state.data_stat_overview = action.payload;
    },
  },
};

export default WithdrawalModel;
