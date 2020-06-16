import { createReducer } from '.';
import { IReducerState } from '../interfaces';
import { ProcessIdType, TPartialReducerObject, TReducerObject } from '../types';

/**
 * Creates new reducer asynchronously
 * @param initialState Initial state of reducer
 * @param partialReducers partial reducers of whole reducer
 */
export const createReducerAsync = <TReducerState extends IReducerState<ProcessIdType>, TActionPayload extends {}>(
  initialState: TReducerState,
  partialReducers: TPartialReducerObject<TReducerState, TActionPayload>[]
) => {
  return async (initState?: ((state: Promise<TReducerState>) => Promise<TReducerState>) | null, options?: { emulateTimeout?: number }): Promise<TReducerObject<TReducerState, TActionPayload>> => {

    const passedInitialState = (initState && (await initState(Promise.resolve(initialState)))) || initialState;

    const reducer = createReducer({ ...passedInitialState }, partialReducers);

    return options && options.emulateTimeout
      ? new Promise(resolve => setTimeout(resolve, options.emulateTimeout, reducer))
      : reducer;
  };
};
