import { APP_INITIALIZER } from '@angular/core';
import { environment } from '@env/environment';
import { ConfigurationService } from './config.service';

export const configurationFactory = (configurationService: ConfigurationService) => {
  return async () => {
    const configFile = environment.configuration;
    try {
      return configurationService.loadAppConfig(`/assets/${configFile}`);
    } catch (err) {
      console.error('Configuration load failed, error:', err);
    }
  };
};

export const configProvider = {
  provide: APP_INITIALIZER,
  multi: true,
  deps: [ConfigurationService],
  useFactory: configurationFactory,
};
