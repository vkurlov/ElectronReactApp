import { IReducerAction } from 'core/redux/interfaces';
import { ThunkDispatch } from 'redux-thunk';

export interface IThunkStartActionArguments<
    TStore,
    TReducerActionStartPayload,
    TReducerActionSuccessPayload,
    TReducerActionFailedPayload,
    TInputArgument> {
    thunkDispatch: ThunkDispatch<TStore, any, IReducerAction<TReducerActionStartPayload | TReducerActionSuccessPayload | TReducerActionFailedPayload>>;
    getStore: () => TStore;
    inputArgs?: TInputArgument;
}