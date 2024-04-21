import yaml from 'yaml';
import { formatFilepath, readFile, getFileExtension } from './fileUtils.js';

const parseData = (fileformat, filedata) => {
  switch (fileformat) {
    case '.json':
      return JSON.parse(filedata);
    case '.yml':
    case '.yaml':
      return yaml.parse(filedata);
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
