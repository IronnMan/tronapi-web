'use strict';
import { Effect, ImmerReducer } from 'umi';
import * as Service from '@/services/user';
import { formatDateTime } from '@/utils/formater';
import IBill from '@/types/IBill';
export interface UserModelState {
  balance: string;
  authenticator: string;
  bill_list: {
    count: number;
    rows: IBill[];
  };
  bill_list_params: {
    dateRange: Array<any>;
    page_index: number;
    page_size: number;
  };
}

const BillInitListParams = {
  dateRange: [],
  page_index: 1,
  page_size: 10,
};

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    getAuthenticator: Effect;
    updateConfig: Effect;
    updatePassword: Effect;
    getBillList: Effect;
  };
  reducers: {
    setAuthenticator: ImmerReducer<UserModelState>;
    setBillList: ImmerReducer<UserModelState>;
    resetBillList: ImmerReducer<UserModelState>;
    setBillListParams: ImmerReducer<UserModelState>;
    resetBillListParams: ImmerReducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    balance: '',
    authenticator: '',
    bill_list: {
      count: 0,
      rows: [],
    },
    bill_list_params: BillInitListParams,
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

    *getBillList({ payload }, { call, put, select }) {
      const { bill_list_params } = yield select((state: any) => state.user);
      let list_search_params = {
        ...bill_list_params,
        ...payload,
      };
      const { dateRange } = bill_list_params;
      if (dateRange && dateRange.length) {
        const [startDate, endDate] = dateRange;
        list_search_params = {
          ...list_search_params,
          start_date: formatDateTime(startDate),
          end_date: formatDateTime(endDate),
        };
      }
      const response: any = yield call(Service.getBillList, list_search_params);
      if (response) {
        yield put({ type: 'setBillList', payload: response.data });
      }
      return response;
    },
  },
  reducers: {
    setAuthenticator(state, action) {
      state.authenticator = action.payload;
    },
    setBillList(state, action) {
      state.bill_list = action.payload;
    },
    resetBillList(state) {
      state.bill_list = {
        count: 0,
        rows: [],
      };
    },
    setBillListParams(state, action) {
      state.bill_list_params = {
        ...state.bill_list_params,
        ...action.payload,
      };
    },
    resetBillListParams(state) {
      state.bill_list_params = BillInitListParams;
    },
  },
};

export default UserModel;
