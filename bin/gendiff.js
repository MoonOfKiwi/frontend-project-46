#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../src/gendiff.js';

const gendiffCLI = () => {
  program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format', 'stylish')
    .helpOption('-h, --help', 'output usage information')
    .action((filepath1, filepath2, options) => {
      console.log(gendiff(filepath1, filepath2, options.format));
    })
    .parse();
};

gendiffCLI();
