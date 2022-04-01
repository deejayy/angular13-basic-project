import { Injectable } from '@angular/core';
import { PageTitleActions } from '@core/page-title/store/page-title.actions';
import { PageTitleSelectors } from '@core/page-title/store/page-title.selectors';
import { PageTitleState } from '@core/page-title/store/page-title.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class PageTitleFacade {
  public title$: Observable<string> = this.store.select(PageTitleSelectors.getTitle);

  constructor(private store: Store<PageTitleState>) {}

  public setTitle(title: string) {
    this.store.dispatch(PageTitleActions.setTitle({ payload: title }));
  }
}
