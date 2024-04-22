import {
  getDiffStatus,
  SAME,
  FIRST_EXISTS,
  SECOND_EXISTS,
  DIFFERENT,
  getCompareReducer,
} from '../src/comparator.js';

test.each([
  {
    value1: 'foo', value2: 'foo', expected: SAME,
  },
  {
    value2: 'baz', expected: SECOND_EXISTS,
  },
  {
    value1: 'foo', expected: FIRST_EXISTS,
  },
  {
    value1: 'foo', value2: 'baz', expected: DIFFERENT,
  },
])('getDiffStatus: $value1, $value2, status - $expected', ({
  value1, value2, expected,
}) => expect(getDiffStatus(value1, value2)).toEqual(expected));

test.each([
  {
    name: 'Simple same values',
    fileData1: { key: 42 },
    fileData2: { key: 42 },
    expected: { key: { file1: 42, file2: 42, diff: SAME } },
  },
  {
    name: 'Simple different values',
    fileData1: { key: 42 },
    fileData2: { key: 24 },
    expected: { key: { file1: 42, file2: 24, diff: DIFFERENT } },
  },
  {
    name: 'First undefined, Second object',
    fileData1: {},
    fileData2: { key: { foo: 'bar' } },
    expected: { key: { file1: undefined, file2: { foo: 'bar' }, diff: SECOND_EXISTS } },
  },
  {
    name: 'Nested objects',
    fileData1: { key: { bar: 'foo' } },
    fileData2: { key: { foo: 'bar' } },
    expected: {

      key: {
        nest: {
          bar: { file1: 'foo', file2: undefined, diff: FIRST_EXISTS },
          foo: { file1: undefined, file2: 'bar', diff: SECOND_EXISTS },
        },
      },

    },
  },
])('CompareReducer: $name', ({
  fileData1, fileData2, expected,
}) => {
  const reducer = getCompareReducer(fileData1, fileData2);
  const result = reducer({}, 'key');
  expect(result).toEqual(expected);
});
