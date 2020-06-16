import { IReducerState } from '../interfaces';
import { ProcessIdType, TManualReducerState } from '../types';

/**
 * Initializes reducer's state
 * @param stateName Unique name of state
 * @param state Manual properties of state
 */
export function initReducerState<TState extends IReducerState<ProcessIdType> & TManualReducerState<TState>>(
  stateName: string, state: Required<TManualReducerState<TState>>): TState {
  const result: TState = {
    stateName: `${stateName}_State`,
    process: {
      id: 'NONE',
      isInProgress: false,
      startedAt: undefined,
      finishedAt: undefined,
      error: undefined
    },
    ...state
  } as TState;
  return result;
}
