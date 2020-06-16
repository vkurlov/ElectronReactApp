import { TReducerObject } from '.';

/**
 * Represents container of reducers
 */
export type TReducersContainer<TReducerStateNames extends string> = {
  /**
   * Gets or sets reducer
   * @param reducerState reducer's name
   */
  [key in TReducerStateNames]: TReducerObject<any, any>;
};
