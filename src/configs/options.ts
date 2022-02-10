import { COIN_TYPE, COIN_TEXT, CURRENCY_TYPE, CURRENCY_TEXT } from './enum';
import { SEARCH_STATUS } from './index';
import {
  TRANSACTION_PARTIAL_HANDLER,
  TRANSACTION_PARTIAL_HANDLER_THRESHOLD_TYPE,
} from './transaction';

export const COIN_OPTIONS = [
  {
    value: COIN_TYPE.USDT,
    label: `${COIN_TYPE.USDT} - ${COIN_TEXT.USDT}`,
  },
  {
    value: COIN_TYPE.FAU,
    label: `${COIN_TYPE.FAU} - ${COIN_TEXT.FAU}`,
  },
];

export const CURRENCY_OPTIONS = [
  {
    value: CURRENCY_TYPE.CNY,
    label: `${CURRENCY_TYPE.CNY} - ${CURRENCY_TEXT.CNY}`,
  },
  {
    value: CURRENCY_TYPE.USD,
    label: `${CURRENCY_TYPE.USD} - ${CURRENCY_TEXT.USD}`,
  },
];

export const SEARCH_STATUS_OPTIONS = [
  {
    value: SEARCH_STATUS.RESOLVED,
    label: '已完成',
  },
  {
    value: SEARCH_STATUS.REJECTED,
    label: '未完成',
  },
];

export const TRANSACTION_PARTIAL_HANDLER_OPTIONS = [
  {
    value: TRANSACTION_PARTIAL_HANDLER.DONE,
    label: '完成',
  },
  {
    value: TRANSACTION_PARTIAL_HANDLER.REFUND,
    label: '退款',
  },
];

export const TRANSACTION_PARTIAL_HANDLER_THRESHOLD_TYPE_OPTIONS = [
  {
    value: TRANSACTION_PARTIAL_HANDLER_THRESHOLD_TYPE.VALUE,
    label: '金额数值',
  },
  {
    value: TRANSACTION_PARTIAL_HANDLER_THRESHOLD_TYPE.PERCENT,
    label: '金额百分比',
  },
];
