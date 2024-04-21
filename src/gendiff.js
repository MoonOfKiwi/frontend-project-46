import parseFile from './parsers.js';
import { compareFileData } from './comparator.js';
import formatComparedData from './formatters/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = parseFile(filepath1);
  const fileData2 = parseFile(filepath2);
  const comparedData = compareFileData(fileData1, fileData2);
  return formatComparedData(comparedData, formatName);
};

export default gendiff;
