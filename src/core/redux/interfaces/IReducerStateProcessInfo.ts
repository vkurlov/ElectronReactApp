import { ErrorObject } from '..';
import { ProcessIdType } from '../types';

/**
 * Represents executing action for reducer's state
 */
export interface IReducerStateProcessInfo<TProcessId extends ProcessIdType> {
    /**
     * When equal NONE, it means process is in standby state, otherwise is in progress
     */
    id: TProcessId;
    /**
     * Time when current process has started
     */
    startedAt?: Date;
    /**
     * Time when current process has finished
     */
    finishedAt?: Date;
    /**
     * When equals true, it means process is in progress for the current reducer and only one process can be executing at time
     */
    isInProgress: boolean;
    /**
     * Contains error of the current operation, otherwise underfined
     */
    error?: ErrorObject;
}
