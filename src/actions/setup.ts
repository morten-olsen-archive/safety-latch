import fs from 'fs/promises';
import setup from '../setup';
import createConfig from '../config';

const setupAction = async () => {
  const config = await createConfig();
  
  const updatedConfig = await setup(config);

  await fs.writeFile(
    config.configLocation,
    JSON.stringify(updatedConfig, null, '  '),
  );
}

export default setupAction;
