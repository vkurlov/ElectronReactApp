import { ICloudServicesReducerState } from 'app/redux/reducers/administartion/cloudServices/interfaces';
import { ICloudServiceItemDataModel } from 'app/redux/reducers/administartion/cloudServices/interfaces/dataModels';
import { IReducerActionFailedPayload, IReducerActionStartPayload, IReducerActionSuccessPayload } from 'core/redux/interfaces';
import { TPartialReducerObject } from 'core/redux/types';

/**
 * Action в редюсер при старте выполнения установки выбранной записи справочника CloudService
 */
export interface ISetSelectedActionStartPayload extends IReducerActionStartPayload {
}

/**
 * Action в редюсер при не успешном выполнении установки выбранной записи справочника CloudService
 */
export interface ISetSelectedActionFailedPayload extends IReducerActionFailedPayload {
}

/**
 * Action в редюсер при успешном выполнении установки выбранной записи справочника CloudService
 */
export interface ISetSelectedActionSuccessPayload extends IReducerActionSuccessPayload {
    selectedCloudService: ICloudServiceItemDataModel | null;
}

/**
 * Все возможные Action при установки выбранной записи справочника CloudService
 */
export type TSetSelectedActionAnyPayload =
    | ISetSelectedActionStartPayload
    | ISetSelectedActionSuccessPayload
    | ISetSelectedActionFailedPayload;


/**
 * Тип редюсера для установки выбранной записи из справочника CloudService
 */
export type TSetSelectedPartialReducerType = TPartialReducerObject<ICloudServicesReducerState, TSetSelectedActionAnyPayload>;
