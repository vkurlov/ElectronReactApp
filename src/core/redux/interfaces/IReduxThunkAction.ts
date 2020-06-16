import { IReduxThunkActionWithExtra } from '.';
import { TReducerActionAllPayload, TReducerStateContainer } from '../types';

/**
 * Base type to define Thunk action
 */
export interface IReduxThunkAction<TPayload extends TReducerActionAllPayload,
  TStore extends TReducerStateContainer<string>> extends IReduxThunkActionWithExtra<TPayload, any, TStore> {

}
