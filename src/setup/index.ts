import inquirer from 'inquirer';
import scan from '../scan';
import { Config } from '../types/Config';

const setup = async (config: Config) => {
  const result = await scan(config)
  const choices = result.all.map((result) => ({
    ...result,
    checked: config.allowed.includes(result.name),
  }));
  
  if (result.all.length === 0) {
    console.log('No hooks found');
  }

  const { allowed } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'allowed',
    loop: false,
    message: 'Which would you like to allow?',
    choices,
  }])

  return {
    ...config,
    allowed,
    disallowed: result.all.map(r => r.name).filter(r => !allowed.includes(r)),
  };
}

export default setup;
