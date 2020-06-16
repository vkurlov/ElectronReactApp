import { IReducerActionFailedPayload, IReducerActionStartPayload, IReducerActionSuccessPayload } from '../interfaces';
/**
 * Represents all reducer's action types
 */
export type TReducerActionAllPayload =
  | IReducerActionStartPayload
  | IReducerActionSuccessPayload
  | IReducerActionFailedPayload;
