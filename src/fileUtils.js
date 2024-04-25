import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';

const formatFilepath = (filepath) => {
  if (filepath.startsWith('/')) {
    return filepath;
  }

  const cwd = process.cwd();
  const fullPath = path.resolve(cwd, filepath);
  return fullPath;
};

const readFile = (filepath) => {
  const formattedFilepath = formatFilepath(filepath);
  const data = fs.readFileSync(formattedFilepath, 'utf-8');
  return data;
};

const getFileExtension = (filepath) => path.extname(filepath);

const parseFile = (filepath) => {
  const fullFilepath = formatFilepath(filepath);
  const fileExtension = getFileExtension(fullFilepath);
  const rawData = readFile(fullFilepath);
  const result = parseData(fileExtension, rawData);
  return result;
};

export {
  parseFile,
  formatFilepath,
  readFile,
  getFileExtension,
};
