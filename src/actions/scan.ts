import scan from '../scan';
import createConfig from '../config';

const scanAction = async () => {
  const config = await createConfig();
  const result = await scan(config)
  console.log(result);
}

export default scanAction;
