import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiConnector } from '@deejayy/api-caller';

import { ConfigModule } from './config/config.module';
import { configProvider } from './config/service/configuration-factory';
import { FeatureFlagModule } from './feature-flag/feature-flag.module';
import { LocalizerModule } from './localizer/localizer.module';
import { localizerProvider } from './localizer/service/localizer-factory';
import { ApiConnectorService } from './service/api-connector.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, ConfigModule, FeatureFlagModule, LocalizerModule],
  providers: [
    configProvider,
    localizerProvider,
    { provide: ApiConnector, useClass: ApiConnectorService }],
})
export class CoreModule {}
