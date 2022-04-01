import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppConfig } from '../model/config.model';

const CONFIG_PATH = '/assets/config.json';

@Injectable()
export class ConfigurationService {
  private appConfig: AppConfig = { apiEndpoint: '' };

  constructor(private http: HttpClient) {}

  public async loadAppConfig(configPath: string = CONFIG_PATH): Promise<void> {
    return this.http
      .get(configPath)
      .toPromise()
      .then((data) => {
        this.appConfig = data as AppConfig;
      })
      .catch((reason) => {
        console.error(reason);
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get(key: keyof AppConfig): any {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig[key];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public set(key: keyof AppConfig, value: any): void {
    this.appConfig[key] = value;
  }
}
