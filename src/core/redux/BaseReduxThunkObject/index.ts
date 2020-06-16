import { ThunkDispatch } from 'redux-thunk';
import { CommonError } from '../';
import { ReduxErrorTypeEnum } from '../enums';
import { IReducerAction, IReducerActionFailedPayload, IReducerActionStartPayload, IReducerActionSuccessPayload, IReducerState, IReduxThunkAction } from '../interfaces';
import { ProcessIdType, TReducerStateContainer } from '../types';
import { IThunkStartActionArguments, IThunkStartActionArgumentsResult, IThunkStartExecutionArguments } from './interfaces';

/**
 * Базовый класс создания Thunk объекта для обработки некоторого запроса по правилам действия:
 *
 *    XXX--YYY--START_ACTION,
 *    XXX--YYY--SUCCESS_ACTION,
 *    XXX--YYY--FAILED_ACTION.
 */
export abstract class BaseReduxThunkObject<
    TStore extends TReducerStateContainer<string>,
    TReducerActionStartPayload extends IReducerActionStartPayload,
    TReducerActionSuccessPayload extends IReducerActionSuccessPayload,
    TReducerActionFailedPayload extends IReducerActionFailedPayload,
    TInputArgument> {
    protected constructor() {
        this.execute = this.execute.bind(this);
        this.getStartActionArguments = this.getStartActionArguments.bind(this);
        this.startExecution = this.startExecution.bind(this);
        this.tryStartAction = this.tryStartAction.bind(this);
        this.createActionInternal = this.createActionInternal.bind(this);
        this.createAction = this.createAction.bind(this);
    }

    /**
     * Метод, в котором происходит действие запроса по правилам действия:
     *
     *    XXX--YYY--START_ACTION,
     *    XXX--YYY--SUCCESS_ACTION,
     *    XXX--YYY--FAILED_ACTION.
     *
     * Возвращает Thunk функцию
     * @param inputArgs объект, который передаётся в метод для получение неких данных, нужных для обработки
     */
    public execute(inputArgs?: TInputArgument): IReduxThunkAction<TReducerActionStartPayload | TReducerActionSuccessPayload | TReducerActionFailedPayload, TStore> {
        return async (dispatch, getStore) => {


            const startActionArguments = this.getStartActionArguments({
                getStore,
                thunkDispatch: dispatch,
                inputArgs
            });
            if (
                !(await this.tryStartAction({
                    condition: startActionArguments.condition,
                    thunkDispatch: dispatch,
                    getReducerStateFunc: startActionArguments.getReducerStateFunc,
                    startActionPayload: startActionArguments.startActionPayload,
                    failedActionPayload: startActionArguments.failedActionPayload
                }))
            ) {
                return;
            }

            this.startExecution({
                thunkDispatch: dispatch,
                getStore,
                success: (successPayload: TReducerActionSuccessPayload) => {
                    dispatch(this.createActionInternal({
                        name: this.successActionValue,
                        payload: successPayload
                    }));
                },
                failed: (failedPayload: TReducerActionFailedPayload) => {
                    dispatch(this.createActionInternal({
                        name: this.failedActionValue,
                        payload: failedPayload
                    }));
                },
                inputArgs
            });

        };
    }

    protected abstract get startActionValue(): string;
    protected abstract get successActionValue(): string;
    protected abstract get failedActionValue(): string;

    protected abstract getStartActionArguments(
        args: IThunkStartActionArguments<TStore, TReducerActionStartPayload, TReducerActionSuccessPayload, TReducerActionFailedPayload, TInputArgument>):
        IThunkStartActionArgumentsResult<TReducerActionStartPayload, TReducerActionFailedPayload>;

    protected abstract startExecution(
        args: IThunkStartExecutionArguments<TStore, TReducerActionStartPayload, TReducerActionSuccessPayload, TReducerActionFailedPayload, TInputArgument>
    ): void;

    private async tryStartAction(args: {
        condition: boolean,
        thunkDispatch: ThunkDispatch<any, any, any>,
        getReducerStateFunc: () => IReducerState<ProcessIdType>,
        startActionPayload?: TReducerActionStartPayload,
        failedActionPayload?: TReducerActionFailedPayload
    }): Promise<boolean> {

        if (!args.condition) {
            return false;
        }

        let reducerState = args.getReducerStateFunc();

        if (reducerState.process.isInProgress) {
            for (let index = 1; index <= 3; ++index) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (!(reducerState = args.getReducerStateFunc()).process.isInProgress) {
                    args.thunkDispatch(this.createActionInternal({
                        name: this.startActionValue,
                        payload: args.startActionPayload
                    }));
                    return true;
                }
            }

            const failedPayload = args.failedActionPayload ?? {} as TReducerActionFailedPayload;
            args.thunkDispatch(this.createActionInternal({
                name: this.failedActionValue,
                payload: {
                    ...failedPayload,
                    error: new CommonError(
                        ReduxErrorTypeEnum.REDUCER_BUSY,
                        `The Reducer's state(${reducerState.stateName}) is in busy state for a long time.`,
                        {
                            reducerName: reducerState.stateName
                        }
                    )
                }
            }));
            return false;
        }
        args.thunkDispatch(this.createActionInternal({
            name: this.startActionValue,
            payload: args.startActionPayload
        }));

        return true;
    }

    private createActionInternal(action: {
        name: string;
        payload?: TReducerActionStartPayload | TReducerActionSuccessPayload | TReducerActionFailedPayload
    }) {
        return action.payload === undefined
            ? this.createAction(action.name)
            : this.createAction(action.name, action.payload);
    }

    /**
     * Создаёт действие в котором передаются данные для обновления состояния в редюсере
     * @param type название действия
     * @param payload новые данные для обновления состояния в редюсере
     */
    protected createAction(type: string): IReducerAction<any>;
    protected createAction(type: string, payload: TReducerActionStartPayload | TReducerActionSuccessPayload | TReducerActionFailedPayload)
        : IReducerAction<TReducerActionStartPayload | TReducerActionSuccessPayload | TReducerActionFailedPayload>;
    protected createAction(type: string, payload?: TReducerActionStartPayload | TReducerActionSuccessPayload | TReducerActionFailedPayload | null) {
        return !payload
            ? {
                type
            }
            : {
                type,
                payload
            };
    }
}
