const validator = (reg: RegExp) => {
  return (data: string) => {
    return reg.test(data);
  };
};

/**
 * url 格式校验
 */
const urlValidator = validator(
  /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i,
);

/**
 * 金额格式校验
 * : 最多两位小数
 */
const amountValidator = validator(/^(?:0|[1-9]\d{0,8})(?:\.\d{0,1}[1-9])?$/);

/**
 * 百分比格式校验
 * : 最低 0.01，最高 99.99
 */
const percentageValidator = (data: string | number | undefined) => {
  if (!data) return false;
  const dataVal = Number(data);
  if (Number.isNaN(dataVal)) return false;
  if (dataVal < 0.01 || dataVal > 99.99) return false;
  return true;
};

export default { urlValidator, amountValidator, percentageValidator };
