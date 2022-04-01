import { produceOn } from '@core/helper/produce-on';
import { PageTitleActions } from '@core/page-title/store/page-title.actions';
import { pageTitleInitialState, PageTitleState } from '@core/page-title/store/page-title.state';
import { Action, createReducer } from '@ngrx/store';

const reducer = createReducer(
  pageTitleInitialState,
  produceOn(PageTitleActions.setTitle, (draft, action) => {
    if (action.payload) {
      draft.title = action.payload;
    }
  }),
);

export const pageTitleReducer = (state: PageTitleState, action: Action): PageTitleState => {
  return reducer(state, action);
};
