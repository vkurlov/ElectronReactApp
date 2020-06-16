
import { AppIocContainer } from 'app/AppIocContainer';
import { AppReduxStoreState } from 'app/redux/interfaces';
import { CloudServicesActions } from 'app/redux/reducers/administartion/cloudServices/actions';
import { ICloudServicesUpdateItemDataModel } from 'app/redux/reducers/administartion/cloudServices/partial/updateItem/interfaces/dataModels';
import { IUpdateItemActionFailedPayload, IUpdateItemActionStartPayload, IUpdateItemActionSuccessPayload } from 'app/redux/reducers/administartion/cloudServices/partial/updateItem/interfaces/reducerTypes';
import { BaseReduxThunkObject } from 'core/redux/BaseReduxThunkObject';
import { IThunkStartActionArguments, IThunkStartActionArgumentsResult, IThunkStartExecutionArguments } from 'core/redux/BaseReduxThunkObject/interfaces';
import { RequestKindEnum } from 'core/requestSender/enums';

//#region custom user types

type TActionStartPayload = IUpdateItemActionStartPayload;
type TActionSuccessPayload = IUpdateItemActionSuccessPayload;
type TActionFailedPayload = IUpdateItemActionFailedPayload;
type TInputDataModel = ICloudServicesUpdateItemDataModel;

const { updateCloudService: { START_ACTION, SUCCESS_ACTION, FAILED_ACTION } } = CloudServicesActions;

//#endregion


//#region Fixed types

type TThunkStartActionArguments = IThunkStartActionArguments<
    AppReduxStoreState,
    TActionStartPayload,
    TActionSuccessPayload,
    TActionFailedPayload,
    TInputDataModel>;
type TThunkStartActionArgumentsResult = IThunkStartActionArgumentsResult<
    TActionStartPayload,
    TActionFailedPayload>;

type TThunkStartExecutionArguments = IThunkStartExecutionArguments<
    AppReduxStoreState,
    TActionStartPayload,
    TActionSuccessPayload,
    TActionFailedPayload,
    TInputDataModel>;

//#endregion

/**
 * Thunk для обновления записи в таблице CloudService
 */
export class CloudServicesUpdateItemThunk extends BaseReduxThunkObject<
    AppReduxStoreState,
    TActionStartPayload,
    TActionSuccessPayload,
    TActionFailedPayload,
    TInputDataModel> {

    public static invoke(args: TInputDataModel) {
        return new CloudServicesUpdateItemThunk().execute(args);
    }

    protected get startActionValue(): string { return START_ACTION; }
    protected get successActionValue(): string { return SUCCESS_ACTION; }
    protected get failedActionValue(): string { return FAILED_ACTION; }
    protected getStartActionArguments(args: TThunkStartActionArguments): TThunkStartActionArgumentsResult {
        return {
            condition: !!args.inputArgs,
            getReducerStateFunc: () => args.getStore().cloudServicesState,
        };
    }
    protected async startExecution(args: TThunkStartExecutionArguments): Promise<void> {
        const httpProxy = AppIocContainer.getHttpProxy();

        try {
            const t = await httpProxy.getCloudServicesProxy().update(RequestKindEnum.SEND_BY_USER, {
                cloudServiceId: args.inputArgs!.item.cloudServiceId,
                jsonWebToken: args.inputArgs!.item.jsonWebToken
            });

            if (t) {
                args.success({ updatedItem: args.inputArgs!.item });
            } else {
                args.failed({
                    error: new Error('Не получилось сохранить данные для CloudService')
                });
            }
        }
        catch (er) {
            args.failed({
                error: er
            });
        }
    }

}