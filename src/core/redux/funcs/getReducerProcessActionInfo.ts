import { TripleBooleanResult } from 'core/enums';
import { isProcessInErrorState, isProcessInProgressState, isProcessInSuccessState } from 'core/redux/funcs';
import { IReducerProcessActionInfo, IReducerStateProcessInfo } from 'core/redux/interfaces';
import { ProcessIdType } from 'core/redux/types';

/**
 * Возвращает информацию о действии процеса
 * @param newReducerStateProcess Новые изменения в процесе
 * @param prevReducerStateProcess Предыдущие изменения в процесе
 * @param processIdToCheck Id процеса для проверки
 */
export function getReducerProcessActionInfo<TProcessId extends ProcessIdType>(
    newReducerStateProcess: IReducerStateProcessInfo<TProcessId>,
    prevReducerStateProcess: IReducerStateProcessInfo<TProcessId>,
    processIdToCheck: TProcessId): IReducerProcessActionInfo {

    const isInProgressState = isProcessInProgressState(newReducerStateProcess, processIdToCheck) === TripleBooleanResult.YES;
    const isInSuccessState = isProcessInSuccessState(newReducerStateProcess, processIdToCheck, prevReducerStateProcess?.isInProgress) === TripleBooleanResult.YES;
    const isInErrorState = isProcessInErrorState(newReducerStateProcess, processIdToCheck, prevReducerStateProcess?.isInProgress) === TripleBooleanResult.YES;

    return {
        isInProgressState,
        isInSuccessState,
        isInErrorState
    };
}