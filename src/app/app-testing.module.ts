import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { PageTitleModule } from '@core/page-title/page-title.module';
import { ApiCallerService } from '@deejayy/api-caller';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './core/auth/auth.module';
import { UserDataService } from './core/auth/service/user-data.service';
import { ConfigurationService } from './core/config/service/config.service';
import { MockConfigService } from './core/config/service/mock-config.service';
import { LocalizerModule } from './core/localizer/localizer.module';
import { LocalizerService } from './core/localizer/service/localizer.service';
import { MockApiCallerService } from './core/service/mock-api-caller.service';

const MODULES = [
  RouterTestingModule,
  HttpClientTestingModule,
  NoopAnimationsModule,
  ReactiveFormsModule,
  LocalizerModule,
  AuthModule,
  PageTitleModule,
];

@NgModule({
  declarations: [],
  imports: [...MODULES, StoreModule.forRoot({}), EffectsModule.forRoot()],
  exports: [...MODULES, StoreModule, EffectsModule],
  providers: [
    LocalizerService,
    ConfigurationService,
    UserDataService,
    { provide: ApiCallerService, useClass: MockApiCallerService },
    { provide: ConfigurationService, useClass: MockConfigService },
  ],
})
export class AppTestingModule {}
