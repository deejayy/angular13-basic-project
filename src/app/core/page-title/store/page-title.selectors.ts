import { PageTitleState } from '@core/page-title/store/page-title.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getPageTitleState = createFeatureSelector<PageTitleState>('page-title');

export class PageTitleSelectors {
  public static getTitle = createSelector(getPageTitleState, (state: PageTitleState) => state.title);
}
