import { IReducerState } from 'core/redux/interfaces';
import { ProcessIdType } from 'core/redux/types';

export interface IReducerStateProps {
    subscribedReducerStates: {
        [state: string]: IReducerState<ProcessIdType>
    };
}