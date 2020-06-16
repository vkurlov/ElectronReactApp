import { IReducerState } from '../interfaces';
import { ProcessIdType, TManualReducerState } from '../types';

/**
 * Creates success state
 * @param state - State to make succeed
 * @param processId - For what process id make the state succeed
 * @param manualState - Custom manual data
 * @TState Type of reducer's state
 */
export function reducerStateProcessSuccess<TState extends IReducerState<ProcessIdType> & TManualReducerState<TState>>(
    state: TState, processId: ProcessIdType, manualState?: Partial<TManualReducerState<TState>>): TState {
    return {
        ...state,
        process: {
            ...state.process,
            id: processId,
            isInProgress: false,
            finishedAt: new Date(),
            error: undefined
        },
        ...(manualState ?? {})
    };
}
