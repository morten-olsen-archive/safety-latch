import { program } from 'commander';
import scanAction from './actions/scan';
import setupAction from './actions/setup';
import validateAction from './actions/validate';
import installAction from './actions/install';

const scan = program.command('scan');
scan.action(scanAction);

const setup = program.command('setup');
setup.action(setupAction);

const validate = program.command('validate');
validate.action(validateAction);

const install = program.command('install');
install.action(installAction);

program.parse(process.argv);

