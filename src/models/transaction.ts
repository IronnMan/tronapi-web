'use strict';

import { Effect, ImmerReducer } from 'umi';
import * as Service from '@/services/transaction';
import { formatDateTime } from '@/utils/formater';
import ITransaction from '@/types/ITransaction';

export interface TransactionModelState {
  data_list: {
    count: number;
    rows: ITransaction[];
  };
  data_list_params: {
    keyword: string;
    status: boolean | null;
    dateRange: Array<any>;
    page_index: number;
    page_size: number;
  };
  data_stat_overview: object;
  data_stat_chart: {
    count: Array<any>;
    amount: Array<any>;
  };
  data_detail: object;
}
export interface TransactionModelType {
  namespace: 'transaction';
  state: TransactionModelState;
  effects: {
    getList: Effect;
    getDetail: Effect;
    getStatOverview: Effect;
    getStatChart: Effect;
    markDone: Effect;
    sendWebhook: Effect;
    search: Effect;
  };
  reducers: {
    setList: ImmerReducer<TransactionModelState>;
    resetList: ImmerReducer<TransactionModelState>;
    setListParams: ImmerReducer<TransactionModelState>;
    setDetail: ImmerReducer<TransactionModelState>;
    resetDetail: ImmerReducer<TransactionModelState>;
    setStatOverview: ImmerReducer<TransactionModelState>;
    setStatChart: ImmerReducer<TransactionModelState>;
    resetListParams: ImmerReducer<TransactionModelState>;
  };
}

const TransactionInitListParams = {
  keyword: '',
  status: null,
  dateRange: [],
  page_index: 1,
  page_size: 10,
};

const TransactionModel: TransactionModelType = {
  namespace: 'transaction',
  state: {
    data_list: {
      count: 0,
      rows: [],
    },
    data_list_params: TransactionInitListParams,
    data_stat_overview: {},
    data_stat_chart: {
      count: [],
      amount: [],
    },
    data_detail: {},
  },
  effects: {
    *getList({ payload }, { call, put, select }) {
      const { data_list_params } = yield select(
        (state: any) => state.transaction,
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
    *getStatOverview({ payload }, { call, put }) {
      const response: any = yield call(Service.getStatOverview, payload);
      if (response) {
        yield put({ type: 'setStatOverview', payload: response.data });
      }
      return response;
    },
    *getStatChart({ payload }, { call, put }) {
      const response: any = yield call(Service.getStatChart, payload);
      if (response) {
        yield put({ type: 'setStatChart', payload: response.data });
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
    *search({ payload }, { call }) {
      return yield call(Service.search, payload);
    },
    *markDone({ payload }, { call }) {
      return yield call(Service.markDone, payload);
    },
    *sendWebhook({ payload }, { call }) {
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
      state.data_list_params = TransactionInitListParams;
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
    setStatChart(state, action) {
      state.data_stat_chart = action.payload;
    },
  },
};

export default TransactionModel;
