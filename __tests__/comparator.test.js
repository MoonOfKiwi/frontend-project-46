import _ from 'lodash';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import {
  getCompareReducer,
  SAME, FIRST_EXISTS, SECOND_EXISTS, DIFFERENT,
  compareFileData,
} from '../src/comparator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '__fixtures__', filename);

const file1 = JSON.parse(fs.readFileSync(getFixturePath('file1.json')));
const file2 = JSON.parse(fs.readFileSync(getFixturePath('file2.json')));

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
  expect(result).toEqual({
    follow: { file1: false, file2: undefined, diff: FIRST_EXISTS },
    host: { file1: 'hexlet.io', file2: 'hexlet.io', diff: SAME },
    proxy: { file1: '123.234.53.22', file2: undefined, diff: FIRST_EXISTS },
    timeout: { file1: 50, file2: 20, diff: DIFFERENT }, 
    verbose: { file1: undefined, file2: true, diff: SECOND_EXISTS}
  })
});
