/* eslint-disable no-use-before-define */
import _ from 'lodash';

const SAME = 'same values';
const FIRST_EXISTS = 'first exists, second undefined';
const SECOND_EXISTS = 'first undefined, second exists';
const DIFFERENT = 'different values';

const getDiffStatus = (value1, value2) => {
  if (value1 === value2) {
    return SAME;
  }
  if (value1 === undefined) {
    return SECOND_EXISTS;
  }
  if (value2 === undefined) {
    return FIRST_EXISTS;
  }
  if (value1 !== value2) {
    return DIFFERENT;
  }

  throw Error(`Unexpected result for values: ${value1} and ${value2}!`);
};

const getCompareReducer = (fileData1, fileData2) => {
  const reducer = (acc, key) => {
    const file1Value = fileData1[key];
    const file2Value = fileData2[key];

    if (typeof file1Value === 'object' && typeof file2Value === 'object') {
      return { ...acc, [key]: { nest: compareFileData(file1Value, file2Value) } };
    }

    const result = {
      file1: file1Value,
      file2: file2Value,
      diff: getDiffStatus(file1Value, file2Value),
    };

    return { ...acc, [key]: result };
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
  getDiffStatus,
  getCompareReducer,
  compareFileData,
  SAME,
  FIRST_EXISTS,
  SECOND_EXISTS,
  DIFFERENT,
};
