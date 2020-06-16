import { ThunkAction } from 'redux-thunk';
import { IReducerAction } from '.';
import { TReducerActionAllPayload, TReducerStateContainer } from '../types';

/**
 *  Base type to define Thunk action with extra parameters
 */
export interface IReduxThunkActionWithExtra<TPayload extends TReducerActionAllPayload,
  TExtra extends any,
  TStore extends TReducerStateContainer<string>> extends ThunkAction<void, TStore, TExtra, IReducerAction<TPayload>> {

}
