import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageTitleActions } from './page-title.actions';

@Injectable()
export class PageTitleEffects {
  constructor(private actions$: Actions, private title: Title) {}

  public setTitle$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PageTitleActions.setTitle),
        map((action) => this.title.setTitle(action.payload)),
      ),
    { dispatch: false },
  );
}
