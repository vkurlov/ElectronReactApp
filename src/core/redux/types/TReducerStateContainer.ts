import { ProcessIdType } from '.';
import { IReducerState } from '../interfaces';

/**
 * Container that contains reducer states
 */
export type TReducerStateContainer<TReducerStateNames extends string> = {
  /**
   * Gets or sets reducer's state
   * @param reducerStateName reducer's state name
   */
  [key in TReducerStateNames]: IReducerState<ProcessIdType>;
};
