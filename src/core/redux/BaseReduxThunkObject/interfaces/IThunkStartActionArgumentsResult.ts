import { IReducerState } from '../../interfaces';
import { ProcessIdType } from '../../types';

export interface IThunkStartActionArgumentsResult<
    TReducerActionStartPayload,
    TReducerActionFailedPayload> {
    condition: boolean;
    getReducerStateFunc: () => IReducerState<ProcessIdType>;
    startActionPayload?: TReducerActionStartPayload;
    failedActionPayload?: TReducerActionFailedPayload;
}