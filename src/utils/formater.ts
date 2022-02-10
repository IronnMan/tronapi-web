import moment from 'moment';
import NumberFormat from 'number-format.js';

export const formatDateTime = (date: string | undefined): string => {
  return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '';
};

export const formatJson = (data: string | undefined): string => {
  let result = '';
  if (data) {
    try {
      result = JSON.stringify(JSON.parse(data), null, 2);
    } catch (e) {
      result = data;
    }
  }
  return result || '-';
};

export const formatAmount = (data: string | number, unit: string = '') => {
  if (!data) return unit ? `0.00 ${unit}` : '0.00';
  const formatTmpl = unit ? `#,##0.00 ${unit}` : '#,##0.00';
  const formatValue = Number(data);
  return NumberFormat(formatTmpl, formatValue);
};

export const formatThousand = (data: string | number) => {
  if (!data) return 0;
  const dataVal = parseInt(`${data}`);
  if (isNaN(dataVal)) return 0;
  return dataVal.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
};
