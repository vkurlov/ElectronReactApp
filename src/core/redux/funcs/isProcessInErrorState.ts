import { TripleBooleanResult } from 'core/enums';
import { ProcessIdType } from 'core/redux/types';
import { IReducerStateProcessInfo } from '../interfaces';

export const isProcessInErrorState = <TProcessId extends ProcessIdType>(process: IReducerStateProcessInfo<TProcessId>, processIdToCheck: TProcessId, prevProcessWasInProgress: boolean): TripleBooleanResult => {
    if (!process ||
        !processIdToCheck ||
        process.id !== processIdToCheck ||
        process.isInProgress ||
        (!process.isInProgress && !prevProcessWasInProgress)) {
        return TripleBooleanResult.NONE;
    }

    return process.error
        ? TripleBooleanResult.YES
        : TripleBooleanResult.NO;
};
