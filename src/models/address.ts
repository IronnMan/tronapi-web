'use strict';

import { Effect, ImmerReducer } from 'umi';
import * as Service from '@/services/address';
import IAddress from '@/types/IAddress';

export interface AddressModelState {
  data_list: {
    count: number;
    rows: IAddress[];
  };
  data_list_params: {
    page_index: number;
    page_size: number;
  };
}

const AddressInitListParams = {
  page_index: 1,
  page_size: 10,
};

export interface AddressModelType {
  namespace: 'address';
  state: AddressModelState;
  effects: {
    add: Effect;
    update: Effect;
    getList: Effect;
  };
  reducers: {
    setList: ImmerReducer<AddressModelState>;
    resetList: ImmerReducer<AddressModelState>;
    setListParams: ImmerReducer<AddressModelState>;
    resetListParams: ImmerReducer<AddressModelState>;
  };
}

const AddressModel: AddressModelType = {
  namespace: 'address',
  state: {
    data_list: {
      count: 0,
      rows: [],
    },
    data_list_params: AddressInitListParams,
  },
  effects: {
    *add({ payload }, { call }) {
      return yield call(Service.add, payload);
    },
    *update({ payload }, { call }) {
      return yield call(Service.update, payload);
    },
    *getList({ payload }, { call, put, select }) {
      const { bill_list_params } = yield select((state: any) => state.account);
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
      state.data_list_params = AddressInitListParams;
    },
  },
};

export default AddressModel;
