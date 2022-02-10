export enum TRANSACTION_STATUS {
  NEW = 'NEW',
  PARTIAL = 'PARTIAL',
  REFUND = 'REFUND',
  NORMAL_DONE = 'NORMAL_DONE',
  MANUAL_DONE = 'MANUAL_DONE',
  PARTIAL_DONE = 'PARTIAL_DONE',
  OVER_DONE = 'OVER_DONE',
  REFUND_DONE = 'REFUND_DONE',
  PARTIAL_OVER_DONE = 'PARTIAL_OVER_DONE',
}

export const TRANSACTION_STATUS_TEXT = {
  [TRANSACTION_STATUS.NEW]: '等待支付',
  [TRANSACTION_STATUS.REFUND]: '退款中',
  [TRANSACTION_STATUS.REFUND_DONE]: '已退款',
  [TRANSACTION_STATUS.PARTIAL]: '已部分支付',
  [TRANSACTION_STATUS.NORMAL_DONE]: '已完成',
  [TRANSACTION_STATUS.MANUAL_DONE]: '已完成（手动标记）',
  [TRANSACTION_STATUS.PARTIAL_DONE]: '已完成（多次支付）',
  [TRANSACTION_STATUS.OVER_DONE]: '已完成（单次超额）',
  [TRANSACTION_STATUS.PARTIAL_OVER_DONE]: '已完成（多次支付且超额）',
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
