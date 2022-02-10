import moment from 'moment';

const isExpired = (date1: string) => {
  return moment(date1).isBefore(moment());
};

export default {
  isExpired,
};
