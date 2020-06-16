
import { AppIocContainer } from 'app/AppIocContainer';
import { AppReduxStoreState } from 'app/redux/interfaces';
import { CloudServicesActions } from 'app/redux/reducers/administartion/cloudServices/actions';
import { ICloudServicesReceiveAllDataModel } from 'app/redux/reducers/administartion/cloudServices/partial/receiveAll/interfaces/dataModels';
import { IReceiveAllActionFailedPayload, IReceiveAllActionStartPayload, IReceiveAllActionSuccessPayload } from 'app/redux/reducers/administartion/cloudServices/partial/receiveAll/interfaces/reducerTypes';
import { BaseReduxThunkObject } from 'core/redux/BaseReduxThunkObject';
import { IThunkStartActionArguments, IThunkStartActionArgumentsResult, IThunkStartExecutionArguments } from 'core/redux/BaseReduxThunkObject/interfaces';
import { RequestKindEnum } from 'core/requestSender/enums';

//#region custom user types

type TActionStartPayload = IReceiveAllActionStartPayload;
type TActionSuccessPayload = IReceiveAllActionSuccessPayload;
type TActionFailedPayload = IReceiveAllActionFailedPayload;
type TInputDataModel = ICloudServicesReceiveAllDataModel;

const { receiveAll: { START_ACTION, SUCCESS_ACTION, FAILED_ACTION } } = CloudServicesActions;

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
 * Thunk для запроса списка записей из таблицы CloudService
 */
export class CloudServicesReceiveAllThunk extends BaseReduxThunkObject<
    AppReduxStoreState,
    TActionStartPayload,
    TActionSuccessPayload,
    TActionFailedPayload,
    TInputDataModel> {

    public static invoke(args: TInputDataModel) {
        return new CloudServicesReceiveAllThunk().execute(args);
    }

    protected get startActionValue(): string { return START_ACTION; }
    protected get successActionValue(): string { return SUCCESS_ACTION; }
    protected get failedActionValue(): string { return FAILED_ACTION; }
    protected getStartActionArguments(args: TThunkStartActionArguments): TThunkStartActionArgumentsResult {
        const cloudServicesState = args.getStore().cloudServicesState;
        return {
            condition: !cloudServicesState.hasSuccessFor.cloudServicesReceived || args.inputArgs?.force === true,
            getReducerStateFunc: () => args.getStore().cloudServicesState,
        };
    }
    protected async startExecution(args: TThunkStartExecutionArguments): Promise<void> {
        const httpProxy = AppIocContainer.getHttpProxy();

        try {
            const cloudServicesResponse = await httpProxy.getCloudServicesProxy().getAll(RequestKindEnum.SEND_BY_USER);

            args.success({
                cloudServices: cloudServicesResponse.map(item => ({
                    id: item.Id,
                    cloudServiceId: item.CloudServiceId,
                    serviceCaption: item.ServiceCaption,
                    jsonWebToken: item.JsonWebToken
                }))
            });
        }
        catch (er) {
            args.failed({
                error: er
            });
        }


    }

}