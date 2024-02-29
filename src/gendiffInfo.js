import { program } from 'commander';

const getGendiffInfo = () => {
  program
    .name('gendiff')
    .version('')
    .description('Compares two configuration files and shows a difference.')
    .helpOption('-h, --help', 'output usage information');

  program.parse();
};

export default getGendiffInfo;
