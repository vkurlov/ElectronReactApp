import { ProcessIdType } from '.';
import { IReducerState } from '../interfaces';

/**
 * Construct a type to see only user defined properties
 */
export type TManualReducerState<TState> = Omit<TState, keyof IReducerState<ProcessIdType>> & {
};
