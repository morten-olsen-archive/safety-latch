interface Config {
  configLocation: string;
  pattern: string;
  hookScripts: string[];
  testPostInstall: boolean;
  allowed: string[];
  disallowed: string[];
}

export type { Config };
