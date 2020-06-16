/**
 * Информация о процессе редюсера
 */
export interface IReducerProcessActionInfo {
    /**
     * Если в процессе выполнения, то содержит true
     */
    isInProgressState: boolean;

    /**
     * Если выполнился успешно, то содержит true
     */
    isInSuccessState: boolean;
    /**
     * Если выполнился не успешно, то содержит true
     */
    isInErrorState: boolean;
}
