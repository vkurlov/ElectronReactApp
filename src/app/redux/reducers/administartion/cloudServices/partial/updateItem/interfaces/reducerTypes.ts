import { ICloudServicesReducerState } from 'app/redux/reducers/administartion/cloudServices/interfaces';
import { ICloudServiceItemDataModel } from 'app/redux/reducers/administartion/cloudServices/interfaces/dataModels';
import { IReducerActionFailedPayload, IReducerActionStartPayload, IReducerActionSuccessPayload } from 'core/redux/interfaces';
import { TPartialReducerObject } from 'core/redux/types';

/**
 * Action в редюсер при старте выполнения обновления выбранной записи справочника CloudService
 */
export interface IUpdateItemActionStartPayload extends IReducerActionStartPayload {
    item: ICloudServiceItemDataModel;
}

/**
 * Action в редюсер при не успешно выполнении обновления выбранной записи справочника CloudService
 */
export interface IUpdateItemActionFailedPayload extends IReducerActionFailedPayload {
}

/**
 * Action в редюсер при успешном выполнении обновления выбранной записи справочника CloudService
 */
export interface IUpdateItemActionSuccessPayload extends IReducerActionSuccessPayload {
    /**
     * Обновлённые данные записи CloudService
     */
    updatedItem: ICloudServiceItemDataModel;
}

/**
 * Все возможные Action при обновлении выбранной записи справочника CloudService
 */
export type TUpdateItemActionAnyPayload =
    | IUpdateItemActionStartPayload
    | IUpdateItemActionSuccessPayload
    | IUpdateItemActionFailedPayload;


/**
 * Тип редюсера для обновления выбранной записи из справочника CloudService
 */
export type TUpdateItemPartialReducerType = TPartialReducerObject<ICloudServicesReducerState, TUpdateItemActionAnyPayload>;
