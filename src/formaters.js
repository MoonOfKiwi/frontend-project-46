import {
  SAME,
  FIRST_EXISTS,
  SECOND_EXISTS,
  DIFFERENT,
} from './comparator.js';

const getResultInPlusFormat = (comparedData) => {
  const formatByKey = (key) => {
    const diffStatus = comparedData[key].diff;
    const file1Value = comparedData[key].file1;
    const file2Value = comparedData[key].file2;

    switch (diffStatus) {
      case SAME:
        return `    ${key}: ${file1Value}`;
      case SECOND_EXISTS:
        return `  + ${key}: ${file2Value}`;
      case FIRST_EXISTS:
        return `  - ${key}: ${file1Value}`;
      case DIFFERENT:
        return `  - ${key}: ${file1Value}\n  + ${key}: ${file2Value}`;
      default:
        return undefined;
    }
  };

  const keys = Object.keys(comparedData);
  const result = `{\n${keys.map(formatByKey).join('\n')}\n}`;

  return result;
};

export default getResultInPlusFormat;
