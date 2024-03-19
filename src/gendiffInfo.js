import { program } from 'commander';

const getGendiffInfo = () => {
  program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help', 'output usage information');

  program.parse();
};

export default getGendiffInfo;


