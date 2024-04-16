/* eslint-disable no-use-before-define */
import _ from 'lodash';

const SAME = 'same values';
const FIRST_EXISTS = 'first exists, second undefined';
const SECOND_EXISTS = 'first undefined, second exists';
const DIFFERENT = 'different values';

const getCompareReducer = (fileData1, fileData2) => {
  const reducer = (acc, key) => {
    const file1Value = fileData1[key];
    const file2Value = fileData2[key];

    if (typeof file1Value === 'object' && typeof file2Value === 'object') {
      acc[key] = { nest: compareFileData(file1Value, file2Value) };
      return acc;
    }

    acc[key] = { file1: file1Value, file2: file2Value };

    if (file1Value === file2Value) {
      acc[key].diff = SAME;
    } else if (file1Value === undefined) {
      acc[key].diff = SECOND_EXISTS;
    } else if (file2Value === undefined) {
      acc[key].diff = FIRST_EXISTS;
    } else if (fileData1 !== fileData2) {
      acc[key].diff = DIFFERENT;
    }

    return acc;
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
  SAME,
  FIRST_EXISTS,
  SECOND_EXISTS,
  DIFFERENT,
};
