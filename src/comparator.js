/* eslint-disable no-use-before-define */
import _ from 'lodash';

const diffStatus = {
  SAME: 'same values',
  FIRST_EXISTS: 'first exists, second undefined',
  SECOND_EXISTS: 'first undefined, second exists',
  DIFFERENT: 'different values',
  NESTED: 'nested data',
};

const getCompareReducer = (fileData1, fileData2) => {
  const reducer = (acc, key) => {
    const file1Value = fileData1[key];
    const file2Value = fileData2[key];

    if (typeof file1Value === 'object' && typeof file2Value === 'object') {
      return {
        ...acc,
        [key]: {
          diff: diffStatus.NESTED,
          value: compareFileData(file1Value, file2Value),
        },
      };
    }
    if (file1Value === file2Value) {
      return { ...acc, [key]: { diff: diffStatus.SAME, value: file1Value } };
    }
    if (file1Value === undefined) {
      return { ...acc, [key]: { diff: diffStatus.SECOND_EXISTS, value: file2Value } };
    }
    if (file2Value === undefined) {
      return { ...acc, [key]: { diff: diffStatus.FIRST_EXISTS, value: file1Value } };
    }
    if (file1Value !== file2Value) {
      return { ...acc, [key]: { diff: diffStatus.DIFFERENT, value: [file1Value, file2Value] } };
    }

    throw Error(`Unexpected result for key: ${key}! Values ${file1Value} and ${file2Value}!`);
  };

  return reducer;
};

const compareFileData = (fileData1, fileData2) => {
  const allKeys = _.union(Object.keys(fileData1), Object.keys(fileData2));
  const sortedAllKeys = _.sortBy(allKeys);
  const compareReducer = getCompareReducer(fileData1, fileData2);
  const result = sortedAllKeys.reduce(compareReducer, {});

  return result;
};

export {
  getCompareReducer,
  compareFileData,
  diffStatus,
};
