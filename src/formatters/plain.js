import _ from 'lodash';
import {
  diffStatus,
} from '../comparator.js';

const formatValue = (value, diff = null) => {
  if (diff === diffStatus.DIFFERENT) return [formatValue(value[0]), formatValue(value[1])];
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return `${value}`;
};

const getResultInPlainFormat = (comparedData, prefix = []) => {
  const formatByKey = (key) => {
    const { value, diff } = comparedData[key];
    const formatedValue = formatValue(value, diff);
    const propertyPath = [...prefix, key].join('.');

    switch (diff) {
      case diffStatus.NESTED:
        return getResultInPlainFormat(value, [...prefix, key]);
      case diffStatus.SAME:
        return null;
      case diffStatus.SECOND_EXISTS:
        return `Property '${propertyPath}' was added with value: ${formatedValue}`;
      case diffStatus.FIRST_EXISTS:
        return `Property '${propertyPath}' was removed`;
      case diffStatus.DIFFERENT:
        return `Property '${propertyPath}' was updated. From ${formatedValue[0]} to ${formatedValue[1]}`;
      default:
        throw Error(`${diff} is undefined!`);
    }
  };

  const keys = Object.keys(comparedData);
  const result = keys
    .map(formatByKey)
    .filter((value) => (value !== null))
    .join('\n');

  return result;
};

export default getResultInPlainFormat;
