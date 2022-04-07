export enum TRANSACTION_STATUS {
  NEW = 'NEW',
  REFUND = 'REFUND',
  REFUND_DONE = 'REFUND_DONE',
  DONE = 'DONE',
  EXPIRED = 'EXPIRED',
}

export const TRANSACTION_STATUS_TEXT = {
  [TRANSACTION_STATUS.NEW]: '等待付款',
  [TRANSACTION_STATUS.REFUND]: '退款中',
  [TRANSACTION_STATUS.REFUND_DONE]: '已退款',
  [TRANSACTION_STATUS.DONE]: '已完成',
  [TRANSACTION_STATUS.EXPIRED]: '已过期',
};

export enum TRANSACTION_PARTIAL_HANDLER {
  NONE = 'NONE',
  DONE = 'DONE',
  REFUND = 'REFUND',
}

export enum TRANSACTION_PARTIAL_HANDLER_THRESHOLD_TYPE {
  VALUE = 'VALUE',
  PERCENT = 'PERCENT',
}
