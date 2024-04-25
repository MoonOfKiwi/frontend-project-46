import {
  diffStatus,
} from '../comparator.js';

const stringify = (value, replacer = ' ', spacesCount = 4, depth = 1) => {
  if (value === null || typeof value !== 'object') {
    return `${value}`;
  }

  const keys = Object.keys(value);
  const padding = replacer.repeat(spacesCount * depth);
  const result = keys.map((key) => `${padding}${key}: ${stringify(value[key], replacer, spacesCount, depth + 1)}`);
  const paddingBeforeClosingBrace = replacer.repeat(spacesCount * (depth - 1));
  return `{\n${result.join('\n')}\n${paddingBeforeClosingBrace}}`;
};

const getResultInStylishFormat = (comparedData, replacer = ' ', spacesCount = 4, depth = 1) => {
  const formatValue = (value, diff) => {
    if (diff === diffStatus.DIFFERENT) {
      const file1Value = stringify(value[0], replacer, spacesCount, depth + 1);
      const file2Value = stringify(value[1], replacer, spacesCount, depth + 1);
      return [file1Value, file2Value];
    }

    return stringify(value, replacer, spacesCount, depth + 1);
  };

  const formatByKey = (key) => {
    const longPadding = replacer.repeat(spacesCount * depth);
    const shortPadding = replacer.repeat(spacesCount * depth - 2);

    const { value, diff } = comparedData[key];
    const formatedValue = formatValue(value, diff);

    switch (diff) {
      case diffStatus.NESTED:
        return `${longPadding}${key}: ${getResultInStylishFormat(value, replacer, spacesCount, depth + 1)}`;
      case diffStatus.SAME:
        return `${longPadding}${key}: ${formatedValue}`;
      case diffStatus.SECOND_EXISTS:
        return `${shortPadding}+ ${key}: ${formatedValue}`;
      case diffStatus.FIRST_EXISTS:
        return `${shortPadding}- ${key}: ${formatedValue}`;
      case diffStatus.DIFFERENT:
        return `${shortPadding}- ${key}: ${formatedValue[0]}\n${shortPadding}+ ${key}: ${formatedValue[1]}`;
      default:
        throw Error(`${diff} is undefined!`);
    }
  };

  const keys = Object.keys(comparedData);
  const paddingBeforeClosingBrace = replacer.repeat(spacesCount * (depth - 1));
  const result = `{\n${keys.map(formatByKey).join('\n')}\n${paddingBeforeClosingBrace}}`;

  return result;
};

export default getResultInStylishFormat;
