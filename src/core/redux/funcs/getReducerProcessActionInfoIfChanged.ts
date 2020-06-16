import { getReducerProcessActionInfo } from 'core/redux/funcs';
import { IReducerProcessActionInfo, IReducerStateProcessInfo } from 'core/redux/interfaces';
import { ProcessIdType } from 'core/redux/types';

/**
 * Возвращает информацию о действии процесе если изменения были иначе null
 * @param newReducerStateProcess Новые изменения в процесе
 * @param prevReducerStateProcess Предыдущие изменения в процесе
 * @param prevReducerStateProcessInfo Предыдущая информация о действии процеса
 * @param processIdToCheck Id процеса для проверки
 */
export function getReducerProcessActionInfoIfChanged<TProcessId extends ProcessIdType, TPrevReducerStateProcessInfo extends IReducerProcessActionInfo>(
    newReducerStateProcess: IReducerStateProcessInfo<TProcessId>,
    prevReducerStateProcess: IReducerStateProcessInfo<TProcessId>,
    prevReducerStateProcessInfo: TPrevReducerStateProcessInfo,
    processIdToCheck: TProcessId): IReducerProcessActionInfo | null {

    const { isInProgressState, isInErrorState, isInSuccessState } = getReducerProcessActionInfo(newReducerStateProcess, prevReducerStateProcess, processIdToCheck);

    const {
        isInProgressState: prevIsInProgressState,
        isInErrorState: prevIsInErrorState,
        isInSuccessState: prevIsInSuccessState
    } = prevReducerStateProcessInfo;

    const hasStateChanges = isInProgressState !== prevIsInProgressState ||
        isInErrorState !== prevIsInErrorState ||
        isInSuccessState !== prevIsInSuccessState;

    return hasStateChanges
        ? {
            isInErrorState,
            isInProgressState,
            isInSuccessState
        } :
        null;
}