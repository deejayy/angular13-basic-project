import packageJson from '../../package.json';

export const environment = {
  production: true,
  version: packageJson.version,
  configuration: 'config.json',
};
