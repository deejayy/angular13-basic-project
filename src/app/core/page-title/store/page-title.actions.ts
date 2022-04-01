import { Payload } from '@core/model/payload';
import { createAction, props } from '@ngrx/store';

export class PageTitleActions {
  public static setTitle = createAction('[Page Title] Set title', props<Payload<string>>());
}
