import { CURRENCY_TYPE, CURRENCY_TEXT } from './enum';
import { SEARCH_STATUS } from './index';

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
