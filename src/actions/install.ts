import execa from 'execa';
import scan from '../scan';
import createConfig from '../config';

const scanAction = async () => {
  const config = await createConfig();
  const result = await scan(config)
  if (result.unknown.length > 0) {
    console.error('Unknown hook status for the following packages:');
    console.error(result.unknown.map(r => r.name).join('\n'));
    process.exit(1);
  }
  const task = execa('npm', [
    'rebuild',
    ...result.allowed.map(r => r.name),
  ], {
      stdout: 'pipe',
      stderr: 'pipe',
    });
  task.stdout!.pipe(process.stdout);
  task.stderr!.pipe(process.stderr);
  await task;
}

export default scanAction;
