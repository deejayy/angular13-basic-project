import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { pageTitleReducer } from '@core/page-title/store/page-title.reducer';
import { PageTitleFacade } from '@core/page-title/store/page-title.facade';
import { PageTitleService } from '@core/page-title/service/page-title.service';
import { EffectsModule } from '@ngrx/effects';
import { PageTitleEffects } from '@core/page-title/store/page-title.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('page-title', pageTitleReducer),
    EffectsModule.forFeature([PageTitleEffects]),
  ],
  providers: [PageTitleFacade, PageTitleService],
})
export class PageTitleModule {}
