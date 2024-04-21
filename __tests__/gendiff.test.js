import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import makeGendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '../__fixtures__', filename);

test('makeGendiff: Throws "Format is not supported!"', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(() => makeGendiff(filepath1, filepath2, 'abrakadabra')).toThrow('Format abrakadabra is not supported!');
});

test.each([
  {
    type: 'json', file1: 'file1.json', file2: 'file2.json', format: 'stylish', expected: 'expectedStylish.txt',
  },
  {
    type: 'yaml', file1: 'file1.yaml', file2: 'file2.yaml', expected: 'expectedStylish.txt',
  },
  {
    type: 'json', file1: 'file1.json', file2: 'file2.json', format: 'plain', expected: 'expectedPlain.txt',
  },
  {
    type: 'yaml', file1: 'file1.yaml', file2: 'file2.yaml', format: 'plain', expected: 'expectedPlain.txt',
  },
  {
    type: 'json', file1: 'file1.json', file2: 'file2.json', format: 'json', expected: 'expectedJSON.json',
  },
])('makeGendiff: $type, format $format', ({
  file1, file2, format, expected,
}) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const answer = fs.readFileSync(getFixturePath(expected), 'utf-8');
  const result = makeGendiff(filepath1, filepath2, format);
  expect(result).toEqual(answer);
});
