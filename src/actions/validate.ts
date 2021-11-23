import scan from '../scan';
import createConfig from '../config';

const validateAction = async () => {
  const config = await createConfig();
  const result = await scan(config)
  if (result.unknown.length > 0) {
    console.error('Unknown hook status for the following packages:');
    console.error(result.unknown.map(r => r.name).join('\n'));
    process.exit(1);
  }
}

export default validateAction;
