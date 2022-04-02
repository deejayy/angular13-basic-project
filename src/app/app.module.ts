import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { PageTitleModule } from '@core/page-title/page-title.module';
import { ApiCallerModule } from '@deejayy/api-caller';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: false,
        },
      },
    ),
    EffectsModule.forRoot(),
    ApiCallerModule,
    PageTitleModule,
    StoreDevtoolsModule.instrument({
      name: 'Angular 13 Bootstrap',
      maxAge: 200,
      logOnly: environment.production,
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'hu' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
