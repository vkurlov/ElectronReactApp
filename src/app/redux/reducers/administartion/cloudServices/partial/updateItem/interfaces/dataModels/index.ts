import { ICloudServiceItemDataModel } from 'app/redux/reducers/administartion/cloudServices/interfaces/dataModels';

/**
 * Параметры для обновления записи в справочнике CloudService
 */
export interface ICloudServicesUpdateItemDataModel {
    /**
     * Значения с изменениями
     */
    item: ICloudServiceItemDataModel;
}