import { TripleBooleanResult } from 'core/enums';
import { ProcessIdType } from 'core/redux/types';
import { IReducerStateProcessInfo } from '../interfaces';

export const isProcessInProgressState = <TProcessId extends ProcessIdType>(process: IReducerStateProcessInfo<TProcessId>, processIdToCheck: TProcessId): TripleBooleanResult => {
    if (!process ||
        !process.isInProgress ||
        !processIdToCheck) {
        return TripleBooleanResult.NONE;
    }

    return process.id === processIdToCheck
        ? TripleBooleanResult.YES
        : TripleBooleanResult.NO;
};
