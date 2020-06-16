import { ProcessIdType, TReducerActionAllPayload } from '.';
import { IReducerAction, IReducerState } from '../interfaces';

/**
 * Represents reducer object
 * @template TReducerState type of state
 * @template TActionPayload type of actions
 */
export type TReducerObject<TReducerState extends IReducerState<ProcessIdType>, TActionPayload extends TReducerActionAllPayload> = (
  /** Reducer's state */
  state: TReducerState,
  /** Action of reducer */
  action: IReducerAction<TActionPayload>
) => TReducerState;


/**
 * Represents reducer object
 * @template TReducerState type of state
 * @template TActionPayload type of actions
 */
export type TPartialReducerObject<TReducerState extends IReducerState<ProcessIdType>, TActionPayload extends TReducerActionAllPayload> = (
  /** Reducer's state */
  state: TReducerState,
  /** Action of reducer */
  action: IReducerAction<TActionPayload>
) => TReducerState | null;