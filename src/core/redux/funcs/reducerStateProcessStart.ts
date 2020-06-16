import { IReducerState } from '../interfaces';
import { ProcessIdType, TManualReducerState } from '../types';

/**
 * Creates started state
 * @param state - State to make started
 * @param processId - For what process id make the state started
 * @param manualState - Custom manual data
 * @TState Type of reducer's state
 */
export function reducerStateProcessStart<TState extends IReducerState<ProcessIdType> & TManualReducerState<TState>>(
    state: TState, processId: ProcessIdType, manualState?: Partial<TManualReducerState<TState>>): TState {
    return {
        ...state,
        process: {
            ...state.process,
            id: processId,
            startedAt: new Date(),
            isInProgress: true,
            finishedAt: undefined,
            error: undefined
        },
        ...(manualState ?? {})
    };
}
