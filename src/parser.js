import fs from 'fs';
import path from 'path';

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
  const data = fs.readFileSync(formattedFilepath);
  return data;
};

const getFileExtension = (filepath) => filepath.split('.').at(-1);

const parseData = (fileformat, filedata) => {
  switch (fileformat) {
    case 'json':
      return JSON.parse(filedata);
    default:
      throw Error(`Format ${fileformat} is not supported!`);
  }
};

const parseFile = (filepath) => {
  const fullFilepath = formatFilepath(filepath);
  const fileExtension = getFileExtension(fullFilepath);
  const rawData = readFile(fullFilepath);
  const result = parseData(fileExtension, rawData);
  return result;
};

export default parseFile;
