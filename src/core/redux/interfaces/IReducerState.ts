import { IReducerStateProcessInfo } from '.';
import { ProcessIdType } from '../types';

/**
 * Represents reducer's state
 * @template TProcessId enum that contains process IDs
 */
export interface IReducerState<TProcessId extends ProcessIdType> {
  /**
   * Reducer's name
   */
  stateName: string;
  /**
   * Current process information
   */
  process: IReducerStateProcessInfo<TProcessId>;
}
