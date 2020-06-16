import { combineReducers } from 'redux';
import { TReducerObject } from '../types';

/**
 * Combines reducers to one state
 * @param reducers - Reducers to combine to one state
 */
export function combineAllReducersToOne(reducers: {
  /**
   * @param reducerState reducer's name
   */
  [reducerState: string]: TReducerObject<any, any>
}[]) {

  if (!(reducers instanceof Array) || reducers.length === 0) {
    return combineReducers({});
  }

  const allReducers = reducers.reduce((total, current) => {
    return current
      ? Object.assign(total, { ...current })
      : total;
  });

  return combineReducers(allReducers);
}
