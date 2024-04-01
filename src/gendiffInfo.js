import { program } from 'commander';
import parseFile from './parsers.js';
import { compareFileData } from './comparator.js';
import getResultInPlusFormat from './formaters.js';

const getGendiffInfo = () => {
  program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help', 'output usage information')
    .action((filepath1, filepath2) => {
      const fileData1 = parseFile(filepath1);
      const fileData2 = parseFile(filepath2);
      const comparedData = compareFileData(fileData1, fileData2);
      console.log(getResultInPlusFormat(comparedData));
    });

  program.parse();
};

export default getGendiffInfo;
