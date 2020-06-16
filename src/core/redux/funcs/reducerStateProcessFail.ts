import { ErrorObject } from '..';
import { IReducerState } from '../interfaces';
import { ProcessIdType, TManualReducerState } from '../types';

/**
 * Creates failed state
 * @param state - State to make failed
 * @param processId - For what process id make the state failed
 * @param error - Error of failed state
 * @param manualState - Custom manual data
 * @TState Type of reducer's state
 */
export function reducerStateProcessFail<TState extends IReducerState<ProcessIdType> & TManualReducerState<TState>>(
    state: TState, processId: ProcessIdType, error: ErrorObject, manualState?: Partial<TManualReducerState<TState>>): TState {
    return {
        ...state,
        process: {
            ...state.process,
            id: processId,
            isInProgress: false,
            finishedAt: new Date(),
            error
        },
        ...(manualState ?? {})
    };
}
