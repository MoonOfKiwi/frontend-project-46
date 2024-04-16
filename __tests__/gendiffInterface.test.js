import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { makeGendiff } from '../src/gendiffInterface.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '__fixtures__', filename);

test('makeGendiff: type - json, format - stylish', () => {
  const filepath1 = getFixturePath('treefile1.json');
  const filepath2 = getFixturePath('treefile2.json');
  const answer = fs.readFileSync(getFixturePath('treefileExpected.txt'), 'utf-8');
  const result = makeGendiff(filepath1, filepath2);
  expect(result).toEqual(answer);
});

test('makeGendiff: type - yaml, format - stylish', () => {
  const filepath1 = getFixturePath('treefile1.yaml');
  const filepath2 = getFixturePath('treefile2.yaml');
  const answer = fs.readFileSync(getFixturePath('treefileExpected.txt'), 'utf-8');
  const result = makeGendiff(filepath1, filepath2);
  expect(result).toEqual(answer);
});

test('makeGendiff: type - json, format - plain', () => {
  const filepath1 = getFixturePath('treefile1.json');
  const filepath2 = getFixturePath('treefile2.json');
  const answer = fs.readFileSync(getFixturePath('treefilePlainExpected.txt'), 'utf-8');
  const result = makeGendiff(filepath1, filepath2, 'plain');
  expect(result).toEqual(answer);
});

test('makeGendiff: type - yaml, format - plain', () => {
  const filepath1 = getFixturePath('treefile1.yaml');
  const filepath2 = getFixturePath('treefile2.yaml');
  const answer = fs.readFileSync(getFixturePath('treefilePlainExpected.txt'), 'utf-8');
  const result = makeGendiff(filepath1, filepath2, 'plain');
  expect(result).toEqual(answer);
});

test('makeGendiff: type - json, format - json', () => {
  const filepath1 = getFixturePath('treefile1.json');
  const filepath2 = getFixturePath('treefile2.json');
  const answer = fs.readFileSync(getFixturePath('treefileJSONExpected.json'), 'utf-8');
  const result = makeGendiff(filepath1, filepath2, 'json');
  expect(result).toEqual(answer);
});

test('makeGendiff: type - json, format - notCorrectFormatter', () => {
  const filepath1 = getFixturePath('treefile1.json');
  const filepath2 = getFixturePath('treefile2.json');
  expect(() => makeGendiff(filepath1, filepath2, 'abrakadabra')).toThrow('Format abrakadabra is not supported!');
});
