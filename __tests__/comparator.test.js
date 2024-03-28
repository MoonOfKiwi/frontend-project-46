import _ from 'lodash';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {
  getCompareReducer,
  SAME, FIRST_EXISTS, SECOND_EXISTS, DIFFERENT,
  compareFileData,
} from '../src/comparator.js';
import parseFile from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '__fixtures__', filename);

const file1 = parseFile(getFixturePath('file1.json'));
const file2 = parseFile(getFixturePath('file2.json'));

test('getCompareReducer returns reducer function', () => {
  expect(typeof getCompareReducer(file1, file2)).toBe('function');
});

test('Reducer testing', () => {
  const reducer = getCompareReducer(file1, file2);
  expect(reducer({}, 'host').host).toEqual(
    { file1: file1.host, file2: file2.host, diff: SAME },
  );
  expect(reducer({}, 'verbose').verbose).toEqual(
    { file1: file1.verbose, file2: file2.verbose, diff: SECOND_EXISTS },
  );
  expect(reducer({}, 'proxy').proxy).toEqual(
    { file1: file1.proxy, file2: file2.proxy, diff: FIRST_EXISTS },
  );
  expect(reducer({}, 'timeout').timeout).toEqual(
    { file1: file1.timeout, file2: file2.timeout, diff: DIFFERENT },
  );
});

test('compareFileData tests', () => {
  const result = compareFileData(file1, file2);
  expect(Object.keys(result)).toEqual(_.sortBy(Object.keys(result)));
});
