
import { AppReduxStoreState } from 'app/redux/interfaces';
import { CloudServicesActions } from 'app/redux/reducers/administartion/cloudServices/actions';
import { ICloudServicesSetSelectedDataModel } from 'app/redux/reducers/administartion/cloudServices/partial/setSelected/interfaces/dataModels';
import { ISetSelectedActionFailedPayload, ISetSelectedActionStartPayload, ISetSelectedActionSuccessPayload } from 'app/redux/reducers/administartion/cloudServices/partial/setSelected/interfaces/reducerTypes';
import { BaseReduxThunkObject } from 'core/redux/BaseReduxThunkObject';
import { IThunkStartActionArguments, IThunkStartActionArgumentsResult, IThunkStartExecutionArguments } from 'core/redux/BaseReduxThunkObject/interfaces';

//#region custom user types

type TActionStartPayload = ISetSelectedActionStartPayload;
type TActionSuccessPayload = ISetSelectedActionSuccessPayload;
type TActionFailedPayload = ISetSelectedActionFailedPayload;
type TInputDataModel = ICloudServicesSetSelectedDataModel;

const { setSelectedCloudService: { START_ACTION, SUCCESS_ACTION, FAILED_ACTION } } = CloudServicesActions;

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
 * Thunk для установки выбранного элемента CloudService
 */
export class CloudServicesSetSelectedThunk extends BaseReduxThunkObject<
    AppReduxStoreState,
    TActionStartPayload,
    TActionSuccessPayload,
    TActionFailedPayload,
    TInputDataModel> {

    public static invoke(args: TInputDataModel) {
        return new CloudServicesSetSelectedThunk().execute(args);
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
    protected startExecution(args: TThunkStartExecutionArguments): void {
        args.success({ selectedCloudService: args.inputArgs!.selectedCloudService });
    }

}