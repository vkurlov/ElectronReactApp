import { IReducerAction } from 'core/redux/interfaces';
import { ThunkDispatch } from 'redux-thunk';

export interface IThunkStartExecutionArguments<
    TStore,
    TReducerActionStartPayload,
    TReducerActionSuccessPayload,
    TReducerActionFailedPayload,
    TInputArgument> {
    thunkDispatch: ThunkDispatch<TStore, any, IReducerAction<TReducerActionStartPayload | TReducerActionSuccessPayload | TReducerActionFailedPayload>>;
    getStore: () => TStore;
    success: (successPayload: TReducerActionSuccessPayload) => void;
    failed: (failedPayload: TReducerActionFailedPayload) => void;
    inputArgs?: TInputArgument;
}