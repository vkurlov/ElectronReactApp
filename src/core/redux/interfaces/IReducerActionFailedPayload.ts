import { ErrorObject } from '..';

/**
 * Type to determine FAILED action for reducer
 */
export interface IReducerActionFailedPayload {
  /**
   * Contains error of the action
   */
  error: ErrorObject;
}
