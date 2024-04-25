import yaml from 'yaml';

const parseData = (fileformat, filedata) => {
  switch (fileformat) {
    case 'json':
      return JSON.parse(filedata);
    case 'yml':
    case 'yaml':
      return yaml.parse(filedata);
    default:
      throw Error(`Format ${fileformat} is not supported!`);
  }
};

export default parseData;
