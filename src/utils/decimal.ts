import Decimal from 'decimal.js';

enum NUMBER_FORMATER {
  NUMBER = 'NUMBER',
  STRING = 'STRING',
}

type DecimalNumber = string | number;

const equal = (num1: DecimalNumber, num2: DecimalNumber) => {
  return new Decimal(num1).equals(new Decimal(num2));
};

const toFixed = (num: DecimalNumber, fixedNum = 2) => {
  return new Decimal(num).toFixed(fixedNum);
};

const floor = (num: DecimalNumber) => {
  return new Decimal(num).floor().toString();
};

const greaterThan = (num1: DecimalNumber, num2: DecimalNumber) => {
  return new Decimal(num1).greaterThan(new Decimal(num2));
};

const greaterThanOrEqualTo = (num1: DecimalNumber, num2: DecimalNumber) => {
  return new Decimal(num1).greaterThanOrEqualTo(new Decimal(num2));
};

const lessThan = (num1: DecimalNumber, num2: DecimalNumber) => {
  return new Decimal(num1).lessThan(new Decimal(num2));
};

const lessThanOrEqualTo = (num1: DecimalNumber, num2: DecimalNumber) => {
  return new Decimal(num1).lessThanOrEqualTo(new Decimal(num2));
};

const format = (res: any, formater: NUMBER_FORMATER) => {
  return formater === NUMBER_FORMATER.STRING ? res.toString() : res.toNumber();
};

const add = (
  num1: DecimalNumber,
  num2: DecimalNumber,
  formater = NUMBER_FORMATER.STRING,
) => {
  return format(new Decimal(num1).plus(new Decimal(num2)), formater);
};

const minus = (
  num1: DecimalNumber,
  num2: DecimalNumber,
  formater = NUMBER_FORMATER.STRING,
) => {
  return format(new Decimal(num1).minus(new Decimal(num2)), formater);
};

const mul = (
  num1: DecimalNumber,
  num2: DecimalNumber,
  formater = NUMBER_FORMATER.STRING,
) => {
  return format(new Decimal(num1).mul(new Decimal(num2)), formater);
};

const div = (
  num1: DecimalNumber,
  num2: DecimalNumber,
  formater = NUMBER_FORMATER.STRING,
) => {
  return format(new Decimal(num1).div(new Decimal(num2)), formater);
};

export default {
  NUMBER_FORMATER,
  add,
  minus,
  mul,
  div,
  equal,
  floor,
  toFixed,
  lessThan,
  lessThanOrEqualTo,
  greaterThan,
  greaterThanOrEqualTo,
};
