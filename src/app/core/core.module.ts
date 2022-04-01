import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthModule } from '@core/auth/auth.module';
import { ApiErrorModalComponent } from '@core/component/error-modal/api-error-modal.component';
import { PageTitleModule } from '@core/page-title/page-title.module';
import { ApiConnector } from '@deejayy/api-caller';

import { ConfigModule } from './config/config.module';
import { configProvider } from './config/service/configuration-factory';
import { FeatureFlagModule } from './feature-flag/feature-flag.module';
import { LocalizerModule } from './localizer/localizer.module';
import { localizerProvider } from './localizer/service/localizer-factory';
import { ApiConnectorService } from './service/api-connector.service';

@NgModule({
  declarations: [ApiErrorModalComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule,
    FeatureFlagModule,
    LocalizerModule,
    AuthModule,
    PageTitleModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [configProvider, localizerProvider, { provide: ApiConnector, useClass: ApiConnectorService }],
  exports: [ApiErrorModalComponent],
})
export class CoreModule {}
