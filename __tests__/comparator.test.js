import {
  diffStatus,
  getCompareReducer,
} from '../src/comparator.js';

test.each([
  {
    name: 'Simple same values',
    fileData1: { key: 42 },
    fileData2: { key: 42 },
    expected: { key: { value: 42, diff: diffStatus.SAME } },
  },
  {
    name: 'Simple different values',
    fileData1: { key: 42 },
    fileData2: { key: 24 },
    expected: { key: { value: [42, 24], diff: diffStatus.DIFFERENT } },
  },
  {
    name: 'First undefined, Second object',
    fileData1: {},
    fileData2: { key: { foo: 'bar' } },
    expected: { key: { value: { foo: 'bar' }, diff: diffStatus.SECOND_EXISTS } },
  },
  {
    name: 'Nested objects',
    fileData1: { key: { bar: 'foo' } },
    fileData2: { key: { foo: 'bar' } },
    expected: {

      key: {
        diff: diffStatus.NESTED,
        value: {
          bar: { value: 'foo', diff: diffStatus.FIRST_EXISTS },
          foo: { value: 'bar', diff: diffStatus.SECOND_EXISTS },
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
