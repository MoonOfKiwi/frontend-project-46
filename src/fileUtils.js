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
  const data = fs.readFileSync(formattedFilepath, 'utf-8');
  return data;
};

const getFileExtension = (filepath) => path.extname(filepath);

export { formatFilepath, readFile, getFileExtension };
