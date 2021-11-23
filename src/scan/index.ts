import globC from 'glob';
import path from 'path';
import fs from 'fs/promises';
import { promisify } from 'util';
import { IPackageJson } from 'package-json-type';
import { PackageScanResult, ScanResult } from '../types/ScanResult';
import { Config } from '../types/Config';
import ownPkg from '../../package.json';

const glob = promisify(globC);

const scan = async (config: Config): Promise<ScanResult> => {
  const files = await glob(path.join(config.pattern, 'package.json'));
  const packages = await Promise.all(files.map(async (file) => {
    const pkg = JSON.parse(await fs.readFile(file, 'utf-8')) as IPackageJson;
    const pkgPath = path.dirname(file);
    const scripts = ownPkg.name !== pkg.name
      ? Object.keys(pkg.scripts || {})
      : [];
    const result: PackageScanResult = {
      pkgPath,
      name: pkg.name!,
      scripts,
    };
    return result;
  }));

  const withScripts = packages.filter(
    p => p.scripts.find(s => config.hookScripts.includes(s)),
  );

  return {
    all: withScripts,
    allowed: withScripts.filter(p => config.allowed.includes(p.name)),
    disallowed: withScripts.filter(p => config.disallowed.includes(p.name)),
    unknown: withScripts.filter(
      p => !config.allowed.includes(p.name) && !config.disallowed.includes(p.name)
    ),
  };
};

export default scan;
