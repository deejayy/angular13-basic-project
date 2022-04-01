import { Injectable } from '@angular/core';
import { ConfigurationService } from '@core/config/service/config.service';

@Injectable()
export class FeatureFlagService {
  constructor(private configService: ConfigurationService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getFeatureSetting(feature: string): any {
    const features = this.configService.get('features');
    if (features && features[feature]) {
      return features[feature];
    }
    return undefined;
  }
}
