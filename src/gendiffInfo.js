import { program } from 'commander';

const getGendiffInfo = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .helpOption('-h, --help', 'output usage information');

  program.parse();
};

export default getGendiffInfo;
