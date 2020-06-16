import { ICloudServiceItemDataModel } from 'app/redux/reducers/administartion/cloudServices/interfaces/dataModels';

/**
 * Параметры для установки выбранной записи
 */
export interface ICloudServicesSetSelectedDataModel {
    /**
     * Выбранная запись
     */
    selectedCloudService: ICloudServiceItemDataModel | null;
}