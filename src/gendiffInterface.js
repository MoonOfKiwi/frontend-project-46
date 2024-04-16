import { program } from 'commander';
import parseFile from './parsers.js';
import { compareFileData } from './comparator.js';
import getResultInStylishFormat from './formatters/stylish.js';

const makeGendiff = (filepath1, filepath2, type = 'stylish') => {
  const fileData1 = parseFile(filepath1);
  const fileData2 = parseFile(filepath2);
  const comparedData = compareFileData(fileData1, fileData2);
  console.log(type);
  switch (type) {
    case 'stylish':
      return getResultInStylishFormat(comparedData);
    default:
      throw Error(`Format ${type} is not supported!`);
  }
};

const getGendiffInterface = () => {
  program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format', 'stylish')
    .helpOption('-h, --help', 'output usage information')
    .action((filepath1, filepath2, options) => {
      console.log(makeGendiff(filepath1, filepath2, options.debug));
    });

  program.parse();
};

export { getGendiffInterface, makeGendiff };