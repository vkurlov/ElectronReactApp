import { TReducerObject } from '.';

/**
 * Represents container of async reducers
 */
export type TAsyncReducersContainer<TReducerStateNames extends string> = {
  /**
   * Gets or sets promise to get reducer asynchronously
   * @param reducerState reducer name
   */
  [key in TReducerStateNames]: Promise<TReducerObject<any, any>>;
};
