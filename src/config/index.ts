import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { Config } from '../types/Config';

const defaultLocation = path.join(process.cwd(), 'safety-latch.json');

const config = async (location: string = defaultLocation): Promise<Config> => {
  const defaultConfig: Config = {
    configLocation: location,
    pattern: 'node_modules/**',
    hookScripts: ['postinstall', 'preinstall', 'install'], 
    testPostInstall: false,
    allowed: [],
    disallowed: [],
  }
  if (existsSync(location)) {
    const data = JSON.parse(await fs.readFile(location, 'utf-8')) as Config;
    return {
      ...defaultConfig,
      ...data,
    };
  }
  return defaultConfig;
}

export default config;
