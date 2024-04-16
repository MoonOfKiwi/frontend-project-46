import {
  SAME,
  FIRST_EXISTS,
  SECOND_EXISTS,
  DIFFERENT,
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
  const formatByKey = (key) => {
    const longPadding = replacer.repeat(spacesCount * depth);
    const shortPadding = replacer.repeat(spacesCount * depth - 2);
    if ('nest' in comparedData[key]) {
      return `${longPadding}${key}: ${getResultInStylishFormat(comparedData[key].nest, replacer, spacesCount, depth + 1)}`;
    }

    const diffStatus = comparedData[key].diff;
    const file1Value = stringify(comparedData[key].file1, replacer, spacesCount, depth + 1);
    const file2Value = stringify(comparedData[key].file2, replacer, spacesCount, depth + 1);

    switch (diffStatus) {
      case SAME:
        return `${longPadding}${key}: ${file1Value}`;
      case SECOND_EXISTS:
        return `${shortPadding}+ ${key}: ${file2Value}`;
      case FIRST_EXISTS:
        return `${shortPadding}- ${key}: ${file1Value}`;
      case DIFFERENT:
        return `${shortPadding}- ${key}: ${file1Value}\n${shortPadding}+ ${key}: ${file2Value}`;
      default:
        throw Error(`${diffStatus} is undefined!`);
    }
  };

  const keys = Object.keys(comparedData);
  const paddingBeforeClosingBrace = replacer.repeat(spacesCount * (depth - 1));
  const result = `{\n${keys.map(formatByKey).join('\n')}\n${paddingBeforeClosingBrace}}`;

  return result;
};

export default getResultInStylishFormat;
