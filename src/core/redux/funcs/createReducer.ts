import { IReducerAction, IReducerState } from '../interfaces';
import { ProcessIdType, TPartialReducerObject } from '../types';

/**
 * Creates new reducer
 * @param initialState Initial state of reducer
 * @param partialReducers partial reducers of whole reducer
 */
export const createReducer = <TReducerState extends IReducerState<ProcessIdType>, TActionPayload extends {}>(
  initialState: TReducerState,
  partialReducers: TPartialReducerObject<TReducerState, TActionPayload>[]) => {

  return (state: TReducerState = initialState, action: IReducerAction<TActionPayload>): TReducerState => {

    if (!partialReducers || !partialReducers.length) {
      return state;
    }

    for (const reducer of partialReducers) {
      const newState = reducer(state, action);
      if (newState) {
        return newState;
      }
    }

    return state;
  };
};
