const startAction = 'START_ACTION';
const successAction = 'SUCCESS_ACTION';
const failedAction = 'FAILED_ACTION';

/**
 * Creates three types of action:
 *
 *     START_ACTION: {reducerStateName}--{action}--START_ACTION
 *     SUCCESS_ACTION: {reducerStateName}--{action}--SUCCESS_ACTION
 *     FAILED_ACTION: {reducerStateName}--{action}--FAILED_ACTION
 * @param reducerStateName - reducer's name
 * @param action - action of a reducer
 */
export function createReducerActions(reducerStateName: string, action: string) {
    reducerStateName = reducerStateName?.toString()?.toUpperCase()?.replace(' ', '_') ?? (new Date().getTime()).toString();
    const actionStr = action?.toString()?.toUpperCase() ?? (new Date().getTime()).toString();
    return {
        START_ACTION: `${reducerStateName}--${actionStr}--${startAction}`,
        SUCCESS_ACTION: `${reducerStateName}--${actionStr}--${successAction}`,
        FAILED_ACTION: `${reducerStateName}--${actionStr}--${failedAction}`
    };
}

/**
 * Creates CRUD actions for reducer:
 *
 *     CreateEntry:
 *         START_ACTION: {reducerStateName}--CREATE_ENTRY--START_ACTION
 *         SUCCESS_ACTION: {reducerStateName}--CREATE_ENTRY--SUCCESS_ACTION
 *         FAILED_ACTION: {reducerStateName}--CREATE_ENTRY--FAILED_ACTION
 *     ReadEntries:
 *         START_ACTION: {reducerStateName}--READ_ENTRIES--START_ACTION
 *         SUCCESS_ACTION: {reducerStateName}--READ_ENTRIES--SUCCESS_ACTION
 *         FAILED_ACTION: {reducerStateName}--READ_ENTRIES--FAILED_ACTION
 *     UpdateEntry:
 *         START_ACTION: {reducerStateName}--UPDATE_ENTRY--START_ACTION
 *         SUCCESS_ACTION: {reducerStateName}--UPDATE_ENTRY--SUCCESS_ACTION
 *         FAILED_ACTION: {reducerStateName}--UPDATE_ENTRY--FAILED_ACTION
 *     DeleteEntry:
 *         START_ACTION: {reducerStateName}--DELETE_ENTRY--START_ACTION
 *         SUCCESS_ACTION: {reducerStateName}--DELETE_ENTRY--SUCCESS_ACTION
 *         FAILED_ACTION: {reducerStateName}--DELETE_ENTRY--FAILED_ACTION
 * @param reducerStateName - reducer's name
 */
export function createCRUDEntryReducerActions(reducerStateName: string) {
    reducerStateName = reducerStateName?.toString()?.toUpperCase()?.replace(' ', '_') ?? (new Date().getTime()).toString();
    return {
        CreateEntry: createReducerActions(reducerStateName, 'CREATE_ENTRY'),
        ReadEntries: createReducerActions(reducerStateName, 'READ_ENTRIES'),
        UpdateEntry: createReducerActions(reducerStateName, 'UPDATE_ENTRY'),
        DeleteEntry: createReducerActions(reducerStateName, 'DELETE_ENTRY')
    };
}
