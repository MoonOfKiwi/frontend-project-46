import _ from 'lodash';
import {
  SAME,
  FIRST_EXISTS,
  SECOND_EXISTS,
  DIFFERENT,
} from '../comparator.js';

const formatValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return `${value}`;
};

const getResultInPlainFormat = (comparedData, prefix = []) => {
  const formatByKey = (key) => {
    if ('nest' in comparedData[key]) {
      return getResultInPlainFormat(comparedData[key].nest, [...prefix, key]);
    }

    const diffStatus = comparedData[key].diff;
    const file1Value = formatValue(comparedData[key].file1);
    const file2Value = formatValue(comparedData[key].file2);
    const propertyPath = [...prefix, key].join('.');

    switch (diffStatus) {
      case SAME:
        return null;
      case SECOND_EXISTS:
        return `Property '${propertyPath}' was added with value: ${file2Value}`;
      case FIRST_EXISTS:
        return `Property '${propertyPath}' was removed`;
      case DIFFERENT:
        return `Property '${propertyPath}' was updated. From ${file1Value} to ${file2Value}`;
      default:
        throw Error(`${diffStatus} is undefined!`);
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
