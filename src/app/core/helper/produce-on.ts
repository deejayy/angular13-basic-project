import { Draft, produce, enableMapSet } from 'immer';
import { ActionCreator, ActionType, on, Creator, ReducerTypes } from '@ngrx/store';

enableMapSet();

type ProduceDraft<T> = T extends infer Draft ? Draft : never;

export const produceOn = <C1 extends ActionCreator, S>(
  actionType: C1,
  callback: (draft: Draft<ProduceDraft<S>>, action: ActionType<C1>) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ReducerTypes<S, ActionCreator<string, Creator<any[]>>[]> => {
  return on(
    actionType,
    (state: ProduceDraft<S>, action: ActionType<C1>): ProduceDraft<S> =>
      produce(state, (draft: Draft<ProduceDraft<S>>) => callback(draft, action)),
  );
};
