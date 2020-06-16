import { Action } from 'redux';
import { TReducerActionAllPayload } from '../types';

/**
 * Determines action for reducer
 */
export interface IReducerAction<TPayload extends TReducerActionAllPayload> extends Action<string> {
  /**
   * Gets or sets payload passed to reducer
   */
  payload: TPayload;
}
