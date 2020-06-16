import { ICloudServicesReducerState } from 'app/redux/reducers/administartion/cloudServices/interfaces';
import { ICloudServiceItemDataModel } from 'app/redux/reducers/administartion/cloudServices/interfaces/dataModels';
import { IReducerActionFailedPayload, IReducerActionStartPayload, IReducerActionSuccessPayload } from 'core/redux/interfaces';
import { TPartialReducerObject } from 'core/redux/types';

/**
 * Action в редюсер при старте выполнения получения списка записей справочника CloudService
 */
export interface IReceiveAllActionStartPayload extends IReducerActionStartPayload {
}

/**
 * Action в редюсер при не успешном выполнении получения списка записей справочника CloudService
 */
export interface IReceiveAllActionFailedPayload extends IReducerActionFailedPayload {
}

/**
 * Action в редюсер при успешном выполнении получения списка записей справочника CloudService
 */
export interface IReceiveAllActionSuccessPayload extends IReducerActionSuccessPayload {
    cloudServices: ICloudServiceItemDataModel[];
}

/**
 * Все возможные Action при получении списка записей справочника CloudService
 */
export type TReceiveAllActionAnyPayload =
    | IReceiveAllActionStartPayload
    | IReceiveAllActionSuccessPayload
    | IReceiveAllActionFailedPayload;

/**
 * Тип редюсера для получения записей из справочника CloudService
 */
export type TReceiveAllPartialReducerType = TPartialReducerObject<ICloudServicesReducerState, TReceiveAllActionAnyPayload>;
